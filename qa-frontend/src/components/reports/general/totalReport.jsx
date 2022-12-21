import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetGeneralReport } from "../../../services/report";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";
import { BarChart } from "../barChart";
import { PieChart } from "../pie";
import { useRef } from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { useReactToPrint } from "react-to-print";
import Table from "./table";

const TotalReport = ({ year, semester_type, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [subsData, setSubsData] = useState([]);
  const [response, setResponse] = useState(null);
  const chartRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => chartRef.current,
  });
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await httpGetGeneralReport({
          year: new Date(year).getFullYear(),
          semester_type,
        });
        setResponse(res);

        const reports = await res.json();
        setReports(reports);
        setChartData(
          reports?.purifyFaculty?.map((item) => ({
            percent: item?.percent,
            label: item?.faculty.fa_name,
          }))
        );
        setSubsData(
          reports?.purifyFaculty?.map((item) => ({
            percent: item?.subscribers,
            label: item?.faculty.fa_name,
          }))
        );
      } catch (error) {
        toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />);
      } finally {
        setLoading(false);
      }
    })();
  }, [semester_type, year]);

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
    <section>
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

      {reports?.totalSubscribers === 0 ? (
        <div>هنوز کسی اشتراک نکرده</div>
      ) : (
        <>
          <article ref={chartRef}>
            <Table reports={reports} />
            <style type="text/css" media="print">
              {`@page { size: landscape; margin: 40px !important; }`}
            </style>
          </article>
          <article className="flex flex-wrap justify-center gap-3">
            <div className="w-fit xl:min-w-[45rem]">
              {chartData?.length > 0 && (
                <BarChart
                  chartData={chartData}
                  label="نمودار فیصدی امتیازات فاکولته ها"
                  y_label="درصدی"
                  x_label="فاکولته"
                  title=" چارت نشان دهنده فیصدی نمرات همه فاکولته ها میباشد."
                />
              )}
            </div>
            <div className="w-fit xl:w-[40rem]">
              {subsData?.length > 0 && (
                <PieChart
                  chartData={subsData}
                  label="نمودار تعداد اشتراک کننده ها"
                  y_label="درصدی"
                  x_label="فاکولته"
                  title=" چارت نشان دهنده فیصدی نمرات همه فاکولته هامیباشد."
                />
              )}
            </div>
          </article>
        </>
      )}
    </section>
  );
};

export default TotalReport;
