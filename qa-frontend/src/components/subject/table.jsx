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
      <div className="mb-5 flex flex-wrap w-full justify-end gap-5">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setIsOpenModal(true)}
        >
          مضمون جدید
        </button>
      </div>
      <div className="p-5 rounded-xl bg-blue-100">
        <h4 className="font-vazirBlack text-3xl">لیست مضامین</h4>
        <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-50 text">
          <table
            className="min-w-full divide-y divide-gray-700 font-vazir"
            dir="rtl"
          >
            <thead dir="rtl" className="font-vazirBold text-base">
              <tr className="divide-x divide-x-reverse text-blue-900 divide-gray-700">
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold sm:pr-6"
                >
                  شماره
                </th>
                <th scope="col" className="p-2 lg:p-4 text-right font-semibold">
                  آیدی
                </th>
                <th scope="col" className="p-2 lg:p-4 text-right font-semibold">
                  نام
                </th>
                <th scope="col" className="p-2 lg:p-4 text-right font-semibold">
                  فاکولته
                </th>
                <th scope="col" className="p-2 lg:p-4 text-right font-semibold">
                  دیپارتمنت
                </th>

                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold hidden lg:block"
                >
                  تاریخ ثبت
                </th>
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold sm:pl-6"
                >
                  ویرایش/حذف
                </th>
              </tr>
            </thead>
            <tbody
              dir="rtl"
              className="divide-y divide-gray-700 bg-blue-50 text-gray-900"
            >
              {items?.map((item, ndx) => (
                <tr
                  key={item.id}
                  className="divide-x divide-x-reverse divide-gray-700"
                >
                  <td className="whitespace-nowrap p-2 lg:p-4  font-medium">
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
