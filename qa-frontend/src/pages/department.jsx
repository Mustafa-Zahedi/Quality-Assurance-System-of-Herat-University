import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import UpdateDepartment from "../components/department/updateDepartment";
import DeleteModal from "../components/department/deleteModal";
import Modal from "../components/modal";
import AddDepartmentForm from "../components/department/addForm";
import { httpPostDepartment } from "../services/department";
import DepartmentTable from "../components/department/table";
import { FacultyContext } from "../context/facultyContext";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Department = () => {
  const faculty = useContext(FacultyContext);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [addNewDep, setAddNewDep] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(false);
  const [loading, setLoading] = useState(false);

  let {
    loading: laodingdata,
    data: departments,
    error,
    refetch,
  } = useFetch("department");

  let { data: faculties } = useFetch("faculty");
  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;

  departments = faculty
    ? departments?.filter((dep) => dep.faculty.id === faculty.id)
    : departments;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await httpPostDepartment({
      ...data,
      date: data.date.toJSON().slice(0, 10),
    });
    if (res) {
      refetch();
      setAddNewDep(false);
      setLoading(false);
    }
  };

  const deleteF = async (data) => {
    setSelectedDepartment(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    setSelectedDepartment(data);
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        title={"حذف دیپارتمنت"}
        refetch={refetch}
        confirmText={"تایید"}
        denyText={"لغو"}
        department={selectedDepartment}
      />
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateDepartment
          schema={schema}
          setLoading={setLoading}
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          title={"ویرایش دیپارتمنت"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          department={selectedDepartment}
          faculties={faculties}
        />
      </Modal>

      {addNewDep ? (
        <AddDepartmentForm
          Controller={Controller}
          control={control}
          errors={errors}
          faculties={faculties}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          useForm={useForm}
          reset={reset}
          refetch={refetch}
          addNewDep={addNewDep}
          setAddNewDep={setAddNewDep}
        />
      ) : (
        <DepartmentTable
          departments={departments}
          updateF={updateF}
          deleteF={deleteF}
          setAddNewDep={setAddNewDep}
          faculties={faculties}
        />
      )}
    </section>
  );
};

export default Department;
