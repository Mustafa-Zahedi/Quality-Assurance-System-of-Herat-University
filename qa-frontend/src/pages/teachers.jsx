import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { httpPostTeacher } from "../services/teacher";
import useFetch from "../hooks/useFetch";

import Loading from "../components/loading";
import UpdateModal from "../components/teacher/updateModal";
import DeleteModal from "../components/teacher/deleteModal";
import Modal from "../components/modal";
import AddTeacherForm from "../components/teacher/addform";
import TeachersTable from "../components/teacher/table";
import { FacultyContext } from "../context/facultyContext";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  state: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  type: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  gender: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  departmentId: yup
    .number()
    .nullable()
    .required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
  des: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
});

const Teachers = () => {
  const faculty = useContext(FacultyContext);
  // console.log("form-faculty", faculty);

  const [addNewTeacher, setAddNewTeacher] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenTeacherModal, setIsOpenTeacherModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  let {
    loading: laodingdata,
    data: teachers,
    error,
    refetch,
  } = useFetch("teacher");

  let { data: faculties } = useFetch("faculty");
  let { data: departments } = useFetch("department");

  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;

  departments = faculty
    ? departments?.filter((dep) => dep.faculty.id === faculty.id)
    : departments;

  teachers = faculty
    ? teachers?.filter(
        (teacher) => teacher.department.faculty.id === faculty.id
      )
    : teachers;

  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { facultyId: null, departmentId: null },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("teacher data", data);
    const res = await httpPostTeacher({
      ...data,
      date: data.date.toJSON().slice(0, 10),
    });
    // console.log(res);
    if (res) {
      refetch();
      setAddNewTeacher(false);
      setLoading(false);
    }
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  // console.log("departments, ", departments);

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        setIsOpenTeacherModal={setIsOpenTeacherModal}
        title={"حذف استاد"}
        refetch={refetch}
        confirmText={"تایید"}
        denyText={"لغو"}
        teacher={selectedTeacher}
      />
      <Modal setLoading={setLoading} isOpen={isOpenUpdateModal}>
        <UpdateModal
          schema={schema}
          setLoading={setLoading}
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
          title={"ویرایش"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          teacher={selectedTeacher}
          departments={departments}
          faculties={faculties}
        />
      </Modal>
      {addNewTeacher ? (
        <AddTeacherForm
          Controller={Controller}
          control={control}
          errors={errors}
          faculties={faculties}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          useForm={useForm}
          reset={reset}
          resetField={resetField}
          refetch={refetch}
          addNewTeacher={addNewTeacher}
          setAddNewTeacher={setAddNewTeacher}
        />
      ) : (
        <TeachersTable
          setAddNewTeacher={setAddNewTeacher}
          teachers={teachers}
          faculties={faculties}
          departments={departments}
          isOpenTeacherModal={isOpenTeacherModal}
          selectedTeacher={selectedTeacher}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          setIsOpenUpdateModal={setIsOpenUpdateModal}
          setSelectedTeacher={setSelectedTeacher}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
        />
      )}
    </section>
  );
};

export default Teachers;
