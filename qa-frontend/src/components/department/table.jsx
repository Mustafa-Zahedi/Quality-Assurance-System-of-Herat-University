import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Paginate from "../teacher/paginate";
import FilterDep from "./filteredDeps";

const DepartmentTable = ({
  departments,
  updateF,
  deleteF,
  setAddNewDep,
  faculties,
}) => {
  const [items, setItems] = useState(departments);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedFac, setSelectedFac] = useState(null);
  const [filteredDeps, setFilteredDeps] = useState(null);
  useEffect(() => {
    setFilteredDeps(
      selectedFac
        ? departments?.filter(
            (department) => department.facultyId === selectedFac
          )
        : departments
    );
    setItemOffset(0);
  }, [departments, selectedFac]);

  if (!filteredDeps) <div>خطا در بارگیری</div>;

  return (
    <div>
      <div className="mb-5 flex flex-wrap w-full justify-between gap-5">
        <div>
          <FilterDep
            setSelectedFac={setSelectedFac}
            selectedFac={selectedFac}
            faculties={faculties}
          />
        </div>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setAddNewDep(true)}
        >
          اضافه کردن دیپارتمنت
        </button>
      </div>
      <div className="p-5 rounded-xl bg-blue-100">
        <h4 className="font-vazirBlack text-3xl">لیست دیپارتمنت ها</h4>

        <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-40 text">
          <table
            className="min-w-full divide-y divide-gray-700 font-vazir"
            dir="rtl"
          >
            <thead dir="rtl" className="font-vazirBold text-base">
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
                  نام
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
                  تاریخ ثبت
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-4 py-3.5 text-right font-semibold"
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
                  key={item.en_name}
                  className="divide-x divide-x-reverse divide-gray-700"
                >
                  <td className="whitespace-nowrap p-2 lg:p-4">{item.id}</td>
                  <td className="whitespace-nowrap p-2 lg:p-4">
                    {item.fa_name}
                    {" - "}
                    {item.en_name}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4">
                    {item.faculty.fa_name}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4">
                    {moment(item.date, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4">
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
            itemsPerPage={5}
            items={filteredDeps}
            setItems={setItems}
            itemOffset={itemOffset}
            setItemOffset={setItemOffset}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentTable;
