import React, { useContext, useMemo, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import FormBorder from "../../form/formBorder";
import InputYear from "../../form/inputYear";
import Select from "../../form/Select";
import { semester_type } from "../../../services/list";
import SubjectReport from "./subjectReport";
import SelectDep from "../../evalution-from/Select";
import { FacultyContext } from "../../../context/facultyContext";
import useFetch from "../../../hooks/useFetch";

const schema = yup.object({
  facultyId: yup
    .string()
    .required("لطفا فاکولته مورد نظرتان را انتخاب نمایید "),
  departmentId: yup
    .string()
    .required("لطفا دیپارتمنت مورد نظرتان را انتخاب نمایید "),
  teacherId: yup.string().required("لطفا استاد مورد نظرتان را انتخاب نمایید "),
  subjectId: yup.string().required("لطفا استاد مورد نظرتان را انتخاب نمایید "),
  semester_type: yup
    .string()
    .required("لطفا نوعیت سمستر مورد نظرتان را انتخاب نمایید "),
  year: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const SubjectReportSelection = () => {
  const [selected, setSelected] = useState(null);
  const faculty = useContext(FacultyContext);
  const [selectedFacultyName, setSelectedFacultyName] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [teachers, setTeachers] = useState(null);

  let { data: faculties } = useFetch("faculty");
  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;

  let { data: subjects } = useFetch("subject");
  subjects = selectedDepartment
    ? subjects?.filter((subj) => subj.department.id === selectedDepartment?.[1])
    : subjects;

  const {
    handleSubmit,
    resetField,
    reset,
    control,
    formState: { errors },
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
    setSelected(data);
  };

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      {!selected ? (
        <div>
          <FormBorder label={"درخواست گزارش مضمون"} className="lg:mx-40">
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
              <SelectDep
                name="subjectId"
                Type="string"
                label="مضمون"
                errors={errors}
                Controller={Controller}
                control={control}
                options={subjects?.map((subject) => [subject.name, subject.id])}
                placeholder="مضمون"
                className={!departments && "disabled"}
              />
              <InputYear
                errors={errors}
                label="سال"
                name="year"
                Controller={Controller}
                control={control}
                defaultValue={Date.now()}
              />
              <Select
                name="semester"
                Type={"number"}
                label="سمستر"
                errors={errors}
                Controller={Controller}
                control={control}
                options={semesterNumbers(14)}
                placeholder="سمستر"
                className={!selectedFacultyName && "disabled"}
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
        <SubjectReport
          setSelected={setSelected}
          semester={selected.semester}
          subjectId={selected.subjectId}
          teacherId={selected.teacherId}
          year={selected.year}
          semester_type={selected.semester_type}
        />
      )}
    </section>
  );
};

export default SubjectReportSelection;

function semesterNumbers(number) {
  const arr = [];
  for (let i = 1; i <= number; i++) {
    arr.push(i);
  }
  return arr;
}
