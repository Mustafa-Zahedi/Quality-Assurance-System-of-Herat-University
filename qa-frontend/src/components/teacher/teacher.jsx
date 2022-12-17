import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Loading from "../loading";
import moment from "jalali-moment";

const Teacher = ({
  setIsOpenTeacherModal,
  teacher,
  setIsOpenDeleteModal,
  setIsOpenUpdateModal,
}) => {
  // console.log("teacher", teacher);
  if (!teacher) return <Loading />;
  return (
    <article className="w-full transform overflow-hidden rounded-xl bg-white text-right align-middle shadow-xl transition-all">
      <div className="w-full px-6 py-2 flex justify-between items-center border-b-2">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group"
          onClick={() => setIsOpenTeacherModal(false)}
        >
          {/* <XMarkIcon className="text-gray-500 group-hover:text-black h-4 w-4" /> */}
          <span>بازگشت</span>
        </button>
        <h3 className="text-2xl">مشخصات کامل {teacher.fa_name}</h3>
      </div>
      <div className="p-6 grid grid-cols-8 w-full gap-3">
        <ul className="space-y-2 col-span-3 lg:col-span-2 xl:col-span-1">
          <li>آیدی</li>
          <li>نام و تخلص</li>
          <li>جندر</li>
          <li>حالت</li>
          <li>نوعیت</li>
          <li>فاکولته</li>
          <li>دیپارتمنت</li>
          <li>تاریخ ثبت</li>
          <li>شرح حال</li>
        </ul>
        <ul className="space-y-2 col-span-5 lg:col-span-6 xl:col-span-72">
          <li>{teacher.id}</li>
          <li>{teacher.fa_name}</li>
          <li>{teacher.gender === "male" ? "آقا" : "خانم"}</li>
          <li>{teacher.state || "-"}</li>
          <li>{teacher.type || "-"}</li>
          <li>{teacher?.department.faculty.fa_name || "-"}</li>
          <li>{teacher?.department.fa_name || "-"}</li>
          <li>
            {moment(teacher.date).locale("fa").format("YYYY/MM/DD") || "-"}
          </li>
          <li>{teacher.des || "-"}</li>
        </ul>
      </div>
      <div className="w-full border-t-2 px-6 py-2 flex justify-around items-center">
        <button
          onClick={() => setIsOpenUpdateModal(true)}
          className="h-full flex items-center"
        >
          <PencilSquareIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setIsOpenDeleteModal(true)}
          className="h-full flex items-center"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </article>
  );
};

export default Teacher;
