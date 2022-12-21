import React, { useEffect, useRef, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { toast } from "react-toastify";
import { ToastMsg } from "../../TaostMsg";
import Table from "./table";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { PieChart } from "../pie";

const DepartmentReportChart = ({
  setSelected,
  departmentId,
  year,
  semester_type,
}) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [subsData, setSubsData] = useState([]);
  const [response, setResponse] = useState(null);

  const componentRef = useRef();
  const chartRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const printChart = useReactToPrint({
    content: () => chartRef.current,
  });

  const printStylesPage = () => {
    return `@page { margin: 40px !important; }`;
  };

  console.log("reports", reports);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await httpGetReport(
          {
            departmentId: departmentId,
            year: new Date(year).getFullYear(),
            semester_type: semester_type,
          },
          "department"
        );
        setResponse(res);
        const reports = await res.json();
        setReport(reports);
        setChartData(
          reports?.teachersRep?.map((item) => ({
            percent: item?.percent,
            label: item?.teacher.fa_name,
          }))
        );
        setSubsData(
          reports?.teachersRep?.map((item) => ({
            percent: item?.subscribers,
            label: item?.teacher.fa_name,
          }))
        );
      } catch (error) {
        toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />);
      } finally {
        setLoading(false);
      }
    })();
  }, [departmentId, semester_type, year]);

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
      <div className="flex flex-wrap w-full justify-end gap-5">
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

      {reports?.total?.subscribers === 0 ? (
        <div>هنوز کسی اشتراک نکرده</div>
      ) : (
        <>
          <div>
            {chartData?.length > 0 && (
              <article>
                <article ref={componentRef} className="pt-3">
                  <style type="text/css" media="print">
                    {printStylesPage()}
                  </style>
                  <Table
                    componentRef={componentRef}
                    teachers={chartData}
                    reports={reports}
                  />
                </article>
                <article className="flex flex-wrap lg:grid justify-center gap-3">
                  <div ref={chartRef} className="w-full min-w-[40rem]">
                    <BarChart
                      chartData={chartData}
                      label="نمودار سطح کیفی اساتید"
                      y_label="درصدی"
                      x_label="استاد"
                      title=" چارت نشان دهنده فیصدی نمرات همه اساتید دیپارتمنت است."
                    />
                  </div>
                  <div ref={chartRef} className="w-full min-w-[30rem] p-10">
                    <PieChart
                      chartData={subsData}
                      label="نمودار تعداد اشتراک کننده برای هر استاد"
                      y_label="درصدی"
                      x_label="استاد"
                      title=" چارت نشان دهنده فیصدی نمرات همه اساتید دیپارتمنت است."
                    />
                  </div>
                </article>
              </article>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default DepartmentReportChart;
