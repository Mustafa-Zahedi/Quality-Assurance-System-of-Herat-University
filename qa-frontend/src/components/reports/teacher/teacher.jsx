import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";

const TeacherReport = ({ teacherId, year, semester_type, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [teacherReport, setTeacherReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  console.log("chart", chartData, { teacherId, year, semester_type });

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await httpGetReport(
          {
            teacherId,
            year: new Date(year).getFullYear(),
            semester_type,
          },
          "teacher"
        );
        setResponse(res);
        const reports = await res.json();
        console.log("-res-teacher-report", reports);
        setTeacherReport(reports);
        setChartData(
          reports?.purifySubject?.map((item) => ({
            percent: item?.percent,
            label: item?.subject?.name,
          }))
        );
        console.log("teacher-report", reports);
      } catch (error) {
        console.log("error");
        toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  if (response?.status === 404)
    return (
      <section className="w-full grid">
        <div className="mb-10 flex flex-wrap w-full justify-end gap-5">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setSelected(null)}
          >
            گزارش جدید
          </button>
        </div>
        <div className="grid place-content-center">اطلاعاتی یافت نشد</div>
      </section>
    );

  return (
    <section className="w-full">
      <div className="mb-10 flex flex-wrap w-full justify-end gap-5">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setSelected(null)}
        >
          گزارش جدید
        </button>
      </div>
      <ul className="grid grid-cols-2 bg-cyan-200 rounded py-5 px-10 gap-x-10">
        <li className="flex gap-3">
          <span>نام و تخلص:</span>
          <span>{teacherReport?.purifyTeachers?.teacher?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>فاکولته:</span>
          <span>{teacherReport?.department?.faculty?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت:</span>
          <span>{teacherReport?.department?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>سال:</span>
          <span>{teacherReport?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر:</span>
          <span>{teacherReport?.semester_type}</span>
        </li>
      </ul>

      {teacherReport?.purifyTeachers?.subscribers === 0 ? (
        <div>هنوز هیچ کسی اشتراک نکرده</div>
      ) : (
        <>
          <article className="flex gap-2 flex-wrap justify-around m-5">
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>فیصدی امتیازات استاد</span>
              <span>
                {Number(teacherReport?.purifyTeachers?.percent).toFixed(1)}%
              </span>
            </div>

            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد اشتراک کننده</span>
              <span>{Number(teacherReport?.purifyTeachers?.subscribers)}</span>
            </div>
          </article>
          <div>
            {chartData?.length > 0 && (
              <BarChart
                chartData={chartData}
                label="نمودار فیصدی مضامین"
                title="چارت نشان دهنده امتیازات مضامین است"
                x_label="مضمون"
                y_label="درصدی"
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default TeacherReport;
