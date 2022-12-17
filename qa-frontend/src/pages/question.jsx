import React, { useState } from "react";
import * as yup from "yup";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import Modal from "../components/modal";
import QuestionTable from "../components/question/table";
import AddQuestionForm from "../components/question/addForm";
import DeleteModal from "../components/question/deleteModal";
import UpdateQuestion from "../components/question/update";

const schema = yup.object({
  text: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  status: yup.boolean().required("لطفا این قسمت را تکمیل نمایید"),
});

const Question = () => {
  const {
    loading: laodingdata,
    data: questions,
    error,
    refetch,
  } = useFetch("question");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedQuestoin, setSelectedQuestion] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteF = async (data) => {
    setSelectedQuestion(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    console.log("update f", data);
    setSelectedQuestion(data);
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
      <QuestionTable
        setIsOpenModal={setIsOpenModal}
        questions={questions}
        updateF={updateF}
        deleteF={deleteF}
      />

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <AddQuestionForm
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
        title={"حذف سوال"}
        refetch={refetch}
        text={
          <span className="font-vazirBold">
            آیا مطمین هستید که میخواهید سوال{" "}
            <span className="text-red-400 font-vazirBlack text-lg">
              {selectedQuestoin.text}
            </span>{" "}
            را حذف کنید
          </span>
        }
        confirmText={"تایید"}
        denyText={"لغو"}
        question={selectedQuestoin}
      />
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateQuestion
          isOpen={isOpenUpdateModal}
          schema={schema}
          setIsOpen={setIsOpenUpdateModal}
          setLoading={setLoading}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          question={selectedQuestoin}
        />
      </Modal>
    </section>
  );
};

export default Question;
