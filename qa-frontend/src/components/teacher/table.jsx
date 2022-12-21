import React, { useState, useEffect, useMemo } from "react";
import moment from "jalali-moment";

import Paginate from "./paginate";
import Teacher from "./teacher";
import FilterTeacher from "./filterTeacher";

const TeachersTable = ({
  setAddNewTeacher,
  teachers,
  faculties,
  departments,
  selectedTeacher,
  setSelectedTeacher,
  setIsOpenTeacherModal,
  isOpenTeacherModal,
  setIsOpenDeleteModal,
  setIsOpenUpdateModal,
}) => {
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedDep, setSelectedDep] = useState(null);
  const [selectedFac, setSelectedFac] = useState(null);
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  useEffect(() => {
    setFilteredTeachers(
      selectedFac
        ? teachers?.filter((teacher) =>
            selectedDep
              ? teacher.departmentId === selectedDep &&
                teacher.department.facultyId === selectedFac
              : teacher.department.facultyId === selectedFac
          )
        : teachers
    );
    setItemOffset(0);
  }, [selectedDep, selectedFac, teachers]);

  useMemo(() => {
    setSelectedDep(null);
  }, [selectedFac]);

  return (
    <>
      {isOpenTeacherModal && (
        <Teacher
          isOpenTeacherModal={isOpenTeacherModal}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
          teacher={selectedTeacher}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          setIsOpenUpdateModal={setIsOpenUpdateModal}
        />
      )}
      <div className={isOpenTeacherModal ? `hidden` : ""}>
        <article className="flex flex-wrap w-full justify-between gap-5">
          <div className="mb-5 flex flex-wrap w-full justify-between gap-5">
            <div>
              <FilterTeacher
                faculties={faculties}
                selectedFac={selectedFac}
                setSelectedDep={setSelectedDep}
                setSelectedFac={setSelectedFac}
              />
            </div>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setAddNewTeacher(true)}
            >
              استاد جدید
            </button>
          </div>
        </article>
        <div className="p-5 rounded-xl bg-blue-100">
          <h4 className="font-vazirBlack text-3xl">لیست اساتید</h4>
          <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-50 text">
            {" "}
            <table
              className="min-w-full divide-y divide-gray-700 font-vazir"
              dir="rtl"
            >
              <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
                <tr className="divide-x divide-x-reverse text-blue-900 divide-gray-700">
                  <th
                    scope="col"
                    className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                  >
                    آیدی
                  </th>
                  <th
                    scope="col"
                    className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                  >
                    نام و تخلص
                  </th>
                  <th
                    scope="col"
                    className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                  >
                    فاکولته
                  </th>
                  <th
                    scope="col"
                    className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                  >
                    دیپارتمنت
                  </th>
                  <th
                    scope="col"
                    className="px-2 lg:px-4 py-3.5 text-right font-semibold hidden lg:grid"
                  >
                    تاریخ ثبت
                  </th>
                </tr>
              </thead>
              <tbody
                dir="rtl"
                className="divide-y divide-gray-700 bg-blue-50 text-gray-900"
              >
                {items.map((item, ndx) => (
                  <tr
                    key={ndx}
                    className="divide-x divide-x-reverse divide-gray-700"
                  >
                    <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                      {item.fa_name}
                      {" - "}
                      {item.en_name}
                    </td>
                    <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                      {item.department.faculty.fa_name}
                    </td>
                    <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                      {item.department.fa_name}
                    </td>
                    <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700 hidden lg:grid">
                      {moment(item.date, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </td>
                    <td
                      className="whitespace-nowrap p-2 text-gray-700"
                      onClick={() => {
                        setSelectedTeacher(item);
                        setIsOpenTeacherModal(true);
                      }}
                    >
                      <button className="px-2 text-center justify-center rounded border border-transparent bg-blue-100 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
                        جزئیات
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <Paginate
              itemsPerPage={5}
              items={filteredTeachers}
              setItems={setItems}
              itemOffset={itemOffset}
              setItemOffset={setItemOffset}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeachersTable;
