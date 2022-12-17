import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SelectDep from "../../evalution-from/Select";
import InputYear from "../../form/inputYear";
import Select from "../../form/Select";
import * as yup from "yup";
import useFetch from "../../../hooks/useFetch";
import { FacultyContext } from "../../../context/facultyContext";
import FormBorder from "../../form/formBorder";
import { semester_type } from "../../../services/list";
import TeacherReport from "./teacher";

const schema = yup.object({
  facultyId: yup
    .string()
    .required("لطفا فاکولته مورد نظرتان را انتخاب نمایید "),
  departmentId: yup
    .string()
    .required("لطفا دیپارتمنت مورد نظرتان را انتخاب نمایید "),
  teacherId: yup.string().required("لطفا استاد مورد نظرتان را انتخاب نمایید "),
  semester_type: yup
    .string()
    .required("لطفا نوعیت سمستر مورد نظرتان را انتخاب نمایید "),
  year: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const TeacherReportSelection = () => {
  const faculty = useContext(FacultyContext);
  const [selected, setSelected] = useState(null);
  const [selectedFacultyName, setSelectedFacultyName] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [teachers, setTeachers] = useState(null);

  let { data: faculties } = useFetch("faculty");
  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useMemo(() => {
    const deps = faculties?.filter(
      (fc) => fc.id === selectedFacultyName?.[1]
    )[0]?.departments;
    setDepartments(deps);
    setSelectedDepartment(null);
    resetField("departmentId");
  }, [selectedFacultyName, resetField]);

  useMemo(() => {
    // console.log("selected dep ", selectedDepartment, departments);
    const teachers = departments?.filter(
      (dep) => dep.id === selectedDepartment?.[1]
    )[0]?.teachers;
    // console.log("🤶🤶", teachers);
    setTeachers(teachers);
    resetField("teacher");
    resetField("subject");
  }, [departments, resetField, selectedDepartment]);

  const onSubmit = async (data) => {
    console.log("ddddd", data, data.year);
    setSelected(data);
  };

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      {!selected ? (
        <div>
          <FormBorder label={"تهیه گزارش استاد"} className="lg:mx-40">
            <h6 className="mb-10 text-sm">
              برای تهیه گزارش لطفا موارد ذیل را با دقت انتخاب نمایید
            </h6>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid w-full gap-3"
            >
              <SelectDep
                name="facultyId"
                Type={"string"}
                label={"فاکولته"}
                Controller={Controller}
                control={control}
                errors={errors}
                options={faculties?.map((fc) => [fc.fa_name, fc.id])}
                placeholder="فاکولته"
                setSelectedOptions={setSelectedFacultyName}
                reset={reset}
              />
              {departments && (
                <SelectDep
                  name="departmentId"
                  Type={"string"}
                  label={"دیپارتمنت"}
                  errors={errors}
                  Controller={Controller}
                  control={control}
                  options={departments?.map((dep) => [dep.fa_name, dep.id])}
                  placeholder="دیپارتمنت"
                  className={!selectedFacultyName && "disabled"}
                  setSelectedOptions={setSelectedDepartment}
                />
              )}
              {teachers && (
                <SelectDep
                  name="teacherId"
                  Type={"string"}
                  label={"استاد"}
                  errors={errors}
                  Controller={Controller}
                  control={control}
                  options={teachers?.map((teacher) => [
                    teacher.fa_name,
                    teacher.id,
                  ])}
                  placeholder="استاد"
                  className={!departments && "disabled"}
                />
              )}
              <InputYear
                register={register}
                errors={errors}
                label="سال"
                name="year"
                type="Date"
                useForm={useForm}
                Controller={Controller}
                control={control}
                defaultValue={Date.now()}
              />
              <Select
                name="semester_type"
                Type={"string"}
                label={"نوعیت سمستر"}
                errors={errors}
                Controller={Controller}
                control={control}
                options={semester_type}
                placeholder="نوعیت سمستر"
              />
              <div className="flex justify-end px-20">
                <button
                  type={"submit"}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  تایید
                </button>
              </div>
            </form>
          </FormBorder>
        </div>
      ) : (
        <TeacherReport
          departmentId={+selected.departmentId}
          semester_type={selected.semester_type}
          teacherId={+selected?.teacherId}
          year={selected.year}
          setSelected={setSelected}
        />
      )}
    </section>
  );
};

export default TeacherReportSelection;
