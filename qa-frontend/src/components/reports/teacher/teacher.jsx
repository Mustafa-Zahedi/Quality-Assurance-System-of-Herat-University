import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";
import Table from "./table";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { PieChart } from "../pie";

const TeacherReport = ({ teacherId, year, semester_type, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [response, setResponse] = useState(null);
  const printComponent = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printComponent.current,
  });

  // console.log("chart", reports);

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
        setReports(reports);
        setChartData(
          reports?.purifySubject?.map((item) => ({
            percent: item?.percent,
            label: item?.subject?.name,
          }))
        );
        setSubscribersData(
          reports?.purifySubject?.map((item) => ({
            percent: item.subscribers,
            label: item.subject.name,
          }))
        );
        // console.log("teacher-report", reports);
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
      <div className="mb-3 flex flex-wrap w-full justify-end gap-5">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setSelected(null)}
        >
          گزارش جدید
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

      {reports?.purifyTeachers?.subscribers === 0 ? (
        <div>هنوز هیچ کسی اشتراک نکرده</div>
      ) : (
        <>
          <article ref={printComponent} className="font-vazir">
            <Table reports={reports} />
            <style type="text/css" media="print">
              {`@page { size: landscape; margin: 40px !important; }`}
            </style>
          </article>
          <article className="flex flex-wrap justify-center gap-5">
            <div className="w-fit xl:w-[30rem]">
              {chartData?.length > 0 && (
                <PieChart
                  chartData={chartData}
                  label="نمودار امتیازات مضامین"
                  title="چارت نشان دهنده امتیازات مضامین میباشد"
                  x_label="مضمون"
                  y_label="درصدی"
                />
              )}
            </div>
            <div className="w-fit xl:w-[30rem]">
              {subscribersData?.length > 0 && (
                <PieChart
                  chartData={subscribersData}
                  label="نمودار تعداد اشتراک کننده مضامین"
                  title="چارت نشان دهنده تعداد اشتراک برای هر مضمون میباشد"
                  x_label="مضمون"
                  y_label="تعداد اشتراک کننده"
                />
              )}
            </div>
          </article>
        </>
      )}
    </section>
  );
};

export default TeacherReport;
