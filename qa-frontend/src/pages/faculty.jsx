import React, { useState } from "react";
import * as yup from "yup";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import DeleteModal from "../components/faculty/deleteModal";
import UpdateFaculty from "../components/faculty/update";
import AddFacultyForm from "../components/faculty/addForm";
import Modal from "../components/modal";
import FacultyTable from "../components/faculty/table";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Faculty = () => {
  const {
    loading: laodingdata,
    data: faculties,
    error,
    refetch,
  } = useFetch("faculty");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteF = async (data) => {
    setSelectedFaculty(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    console.log("update f", data);
    setSelectedFaculty(data);
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
      <FacultyTable
        setIsOpenModal={setIsOpenModal}
        faculties={faculties}
        deleteF={deleteF}
        updateF={updateF}
      />

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <AddFacultyForm
          schema={schema}
          setLoading={setLoading}
          addNew={isOpenModal}
          setAddNew={setIsOpenModal}
          refetch={refetch}
        />
      </Modal>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        title={"حذف فاکولته"}
        refetch={refetch}
        confirmText={"تایید"}
        denyText={"لغو"}
        faculty={selectedFaculty}
      />
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateFaculty
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          schema={schema}
          setLoading={setLoading}
          title={"ویرایش فاکولته"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          faculty={selectedFaculty}
        />
      </Modal>
    </section>
  );
};

export default Faculty;
