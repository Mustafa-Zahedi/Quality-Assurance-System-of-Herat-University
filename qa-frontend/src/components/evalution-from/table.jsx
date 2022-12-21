import moment from "jalali-moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FilterForms from "./filter";
import {
  PencilSquareIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const EvaluationFromTable = ({
  setIsOpenModal,
  forms,
  deleteF,
  updateF,
  faculties,
}) => {
  const [years, setYears] = useState([2022]);
  const [existingFaculties, setExistingFaculties] = useState([faculties]);
  const [existingDeps, setExistingDeps] = useState([faculties]);
  const [selectedDep, setSelectedDep] = useState(null);
  const [selectedFac, setSelectedFac] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSmstrType, setSelectedSmstrType] = useState(null);
  const [filteredYear, setFilterYear] = useState(forms);
  const [filteredSmstr, setFilteredSmstr] = useState(filteredYear);
  const [filteredFaculty, setFilteredFaculty] = useState(filteredSmstr);
  const [filteredDeps, setFilteredDeps] = useState(filteredSmstr);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printStylesPage = () => {
    return `@page { size: landscape; margin: 20px !important; }`;
  };

  useEffect(() => {
    const years = forms.reduce((acc, current) => {
      acc[current.year] = acc[current.year] ?? [];
      acc[current.year].push(current);
      return acc;
    }, {});
    setYears(years);
    const fcs = filteredSmstr.reduce((acc, current) => {
      acc[current.faculty.fa_name] = acc[current.faculty.fa_name] ?? [];
      acc[current.faculty.fa_name].push(current);
      return acc;
    }, {});
    setExistingFaculties(fcs);

    const deps = faculties
      ?.filter((fc) => fc.fa_name === selectedFac)[0]
      ?.departments?.map((department) => [
        department.fa_name,
        department.fa_name,
      ]);
    setExistingDeps(deps);

    // const groupedDeps = filteredFaculty.reduce((acc, current) => {
    //   acc[current.department.id] = acc[current.department.id] ?? [];
    //   acc[current.department.id].push(current);
    //   return acc;
    // }, {});
  }, [faculties, filteredSmstr, forms, selectedFac]);

  useEffect(() => {
    selectedYear
      ? setFilterYear(forms?.filter((form) => +selectedYear === form.year))
      : setFilterYear(forms);
    setSelectedFac(null);
    setSelectedDep(null);
    setSelectedSmstrType(null);
  }, [forms, selectedYear]);

  useEffect(() => {
    selectedSmstrType
      ? setFilteredSmstr(
          filteredYear?.filter(
            (form) => selectedSmstrType === form.semester_type
          )
        )
      : setFilteredSmstr(filteredYear);
  }, [filteredYear, selectedSmstrType]);

  useEffect(() => {
    setFilteredFaculty(
      selectedFac
        ? filteredSmstr?.filter((form) => form.faculty.fa_name === selectedFac)
        : filteredSmstr
    );
  }, [selectedFac, filteredSmstr]);

  useEffect(() => {
    setFilteredDeps(
      selectedDep
        ? filteredFaculty?.filter(
            (form) => form.department.fa_name === selectedDep
          )
        : filteredFaculty
    );
  }, [selectedDep, filteredFaculty]);

  useMemo(() => {
    setSelectedDep(null);
  }, [selectedFac]);

  // console.log(selectedYear);

  return (
    <section className="font-vazir" dir="rtl">
      {forms?.length < 1 ? (
        <article className="w-full grid">
          <div className="mb-10 flex flex-wrap w-full justify-end gap-5">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpenModal(true)}
            >
              فورم جدید
            </button>
          </div>
          <div className="grid place-content-center">
            <p className="grid place-content-center">اطلاعاتی یافت نشد</p>
          </div>
        </article>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap w-full justify-between gap-5">
            <div className="inline-flex">
              <FilterForms
                // faculties={faculties}
                years={years}
                existingFaculties={existingFaculties}
                existingDeps={existingDeps}
                selectedSmstrType={selectedSmstrType}
                selectedYear={selectedYear}
                selectedDep={selectedDep}
                selectedFac={selectedFac}
                setSelectedDep={setSelectedDep}
                setSelectedFac={setSelectedFac}
                setSelectedYear={setSelectedYear}
                setSelectedSmstrType={setSelectedSmstrType}
              />
            </div>
            <div className="inline-flex gap-3">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsOpenModal(true)}
              >
                فورم جدید
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handlePrint}
              >
                <span>پرینت</span>
                <span>
                  <PrinterIcon className="h-6 w-6" />
                </span>
              </button>
            </div>
          </div>
          <div
            dir="rtl"
            ref={componentRef}
            className="p-5 rounded-xl bg-blue-100"
          >
            <style type="text/css" media="print">
              {printStylesPage()}
            </style>
            <h4 className="font-vazirBlack text-3xl">لیست فورم های ارزیابی</h4>
            <div className="flex flex-wrap gap-5 pt-5 font-vazirBold">
              {selectedYear && <p> سال {selectedYear}</p>}{" "}
              {selectedSmstrType && <p>سمستر {selectedSmstrType} </p>}{" "}
              {selectedFac && <p>فاکولته {selectedFac} </p>}{" "}
              {selectedDep && <p> دیپارتمنت {selectedDep} </p>}{" "}
            </div>
            <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-50">
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
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                    >
                      دیپارتمنت
                    </th>
                    <th
                      scope="col"
                      className="p-2 lg:p-4 text-right font-semibold"
                    >
                      استاد
                    </th>
                    <th
                      scope="col"
                      className="p-2 lg:p-4 text-right font-semibold"
                    >
                      مضمون
                    </th>
                    <th
                      scope="col"
                      className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                    >
                      سمستر
                    </th>
                    <th
                      scope="col"
                      className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                    >
                      سال
                    </th>
                    <th
                      scope="col"
                      className="px-2 lg:px-4 py-3.5 text-right font-semibold"
                    >
                      تایم شروع
                      {" - "} تایم ختم
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
                  {filteredDeps?.map((item) => (
                    <tr
                      key={item.id}
                      className="divide-x divide-x-reverse divide-gray-700"
                    >
                      <td
                        className="font-sans font-bold whitespace-nowrap p-2 lg:p-4 text-gray-700"
                        lang="en"
                      >
                        {item.id}
                      </td>
                      <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                        {item.department.fa_name}
                      </td>
                      <td className="whitespace-nowrapp-2 p-2 lg:p-4  text-gray-700">
                        {item.teacher.fa_name}
                      </td>
                      <td className="whitespace-nowrapp-2 p-2 lg:p-4  text-gray-700">
                        <p className="truncate max-w-[8rem] xl:max-w-sm">
                          {item.subject.name}
                        </p>
                      </td>
                      <td className="whitespace-nowrapp-2 p-2 lg:p-4  text-gray-700">
                        {item.semester}
                        {" - "}
                        {item.semester_type}
                      </td>
                      <td className="whitespace-nowrapp-2 p-2 lg:p-4  text-gray-700">
                        {item.year}
                      </td>
                      <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                        {moment(item.start_date, "YYYY/MM/DD h:mm")
                          .locale("fa")
                          .format("hh:mm a YYYY/MM/DD")}
                        <br />
                        {moment(item.end_date, "YYYY/MM/DD hh:mm")
                          .locale("fa")
                          .format("hh:mm a YYYY/MM/DD")}
                      </td>
                      <td className="whitespace-nowrapp-2 p-2 lg:p-4  text-gray-700">
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
          </div>
        </>
      )}
    </section>
  );
};

export default EvaluationFromTable;
