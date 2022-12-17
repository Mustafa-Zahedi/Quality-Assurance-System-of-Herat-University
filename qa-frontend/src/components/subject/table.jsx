import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import React, { useState } from "react";
import Paginate from "../teacher/paginate";

const SubjectTable = ({ setIsOpenModal, subjects, updateF, deleteF }) => {
  const [items, setItems] = useState(subjects);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  return (
    <div>
      {" "}
      <div className="fixed left-0 bottom-0 mb-10 p-5 z-10 delay-200 duration-300 transition-all">
        <button
          className="h-16 w-16 grid place-content-center shadow-black shadow-lg justify-center rounded-full border border-transparent bg-blue-200 p-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setIsOpenModal(true)}
        >
          مضمون جدید
        </button>
      </div>
      <div className="p-5 rounded-xl bg-gray-100">
        <h4 className="font-vazirBlack text-3xl">لیست مضامین</h4>
        <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-5 text">
          <table className="min-w-full divide-y divide-gray-300" dir="rtl">
            <thead dir="rtl" className="font-vazirBold text-base">
              <tr className="divide-x divide-x-reverse divide-gray-200">
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900 sm:pr-6"
                >
                  شماره
                </th>
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900"
                >
                  آیدی
                </th>
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900"
                >
                  نام
                </th>
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900"
                >
                  فاکولته
                </th>
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900"
                >
                  دیپارتمنت
                </th>

                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900 hidden lg:block"
                >
                  تاریخ ثبت
                </th>
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900 sm:pl-6"
                >
                  ویرایش/حذف
                </th>
              </tr>
            </thead>
            <tbody
              dir="rtl"
              className="divide-y divide-gray-200 bg-white font-vazir"
            >
              {items?.map((item, ndx) => (
                <tr
                  key={item.id}
                  className="divide-x divide-x-reverse divide-gray-200"
                >
                  <td className="whitespace-nowrap p-2 lg:p-4  font-medium text-gray-900">
                    {ndx + 1}
                  </td>
                  <td className="p-2 lg:p-4  text-gray-700">{item.id}</td>
                  <td className="p-2 lg:p-4  text-gray-700">{item.name}</td>
                  <td className="p-2 lg:p-4  text-gray-700">
                    {item.department.faculty.fa_name}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item.department.fa_name}
                  </td>

                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700  hidden lg:block">
                    {moment(item.date, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    <div className="flex justify-around">
                      <button
                        onClick={() => updateF(item)}
                        className="h-full flex items-center hover:text-black hover:scale-105"
                      >
                        <PencilSquareIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => deleteF(item)}
                        className="h-full flex items-center hover:text-black hover:scale-105"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Paginate
            itemsPerPage={itemsPerPage}
            items={subjects}
            setItems={setItems}
            itemOffset={itemOffset}
            setItemOffset={setItemOffset}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectTable;
