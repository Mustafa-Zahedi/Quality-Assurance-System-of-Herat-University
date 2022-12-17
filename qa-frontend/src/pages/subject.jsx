import React, { useContext, useState } from "react";
import * as yup from "yup";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import DeleteModal from "../components/subject/deleteModal";
import Modal from "../components/modal";
import AddSubjectForm from "../components/subject/addForm";
import UpdateSubject from "../components/subject/update";
import SubjectTable from "../components/subject/table";
import { FacultyContext } from "../context/facultyContext";

const schema = yup.object({
  name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  departmentId: yup
    .number()
    .nullable()
    .required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Subject = () => {
  const faculty = useContext(FacultyContext);

  let {
    loading: laodingdata,
    data: subjects,
    error,
    refetch,
  } = useFetch("subject");

  let { data: faculties } = useFetch("faculty");
  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;
  subjects = faculty
    ? subjects?.filter((subj) => subj.department.faculty.id === faculty.id)
    : subjects;
  console.log(subjects, "subject");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteF = async (data) => {
    setSelectedSubject(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    console.log("update f", data);
    setSelectedSubject(data);
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  //   console.log(subjects);

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <SubjectTable
        setIsOpenModal={setIsOpenModal}
        subjects={subjects}
        updateF={updateF}
        deleteF={deleteF}
      />

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <AddSubjectForm
          schema={schema}
          setLoading={setLoading}
          addNew={isOpenModal}
          setAddNew={setIsOpenModal}
          refetch={refetch}
          faculties={faculties}
        />
      </Modal>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        title={"حذف مضمون"}
        refetch={refetch}
        confirmText={"تایید"}
        denyText={"لغو"}
        subject={selectedSubject}
      />
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateSubject
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          setLoading={setLoading}
          title={"ویرایش مضمون"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          subject={selectedSubject}
        />
      </Modal>
    </section>
  );
};

export default Subject;
