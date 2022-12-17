import React, { useState } from "react";
import * as yup from "yup";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import DeleteModal from "../components/faculty/deleteModal";
import UpdateFaculty from "../components/faculty/update";
import AddFacultyForm from "../components/faculty/addForm";
import Modal from "../components/modal";
import FacultyTable from "../components/faculty/table";
import { httpGetReport } from "../services/report";
import { useEffect } from "react";
import RequestReport from "../components/reports/request";
import DepartmentReport from "../components/reports/department";
import TeacherReport from "../components/reports/teacher";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Report = () => {
  const [teacherReport, setTeacherReport] = useState([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    loading: laodingdata,
    data: faculties,
    error,
    refetch,
  } = useFetch("faculty");

  console.log("report", faculties);

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
        {console.log(error)}
      </div>
    );

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div>گزارشات</div>
      <RequestReport faculties={faculties} />
      <DepartmentReport />
      {/* <TeacherReport /> */}
    </section>
  );
};

export default Report;
