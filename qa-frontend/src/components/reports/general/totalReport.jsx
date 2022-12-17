import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetGeneralReport } from "../../../services/report";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";
import { BarChart } from "../barChart";

const TotalReport = ({ year, semester_type, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

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
      <div className="mb-10 flex flex-wrap w-full justify-end gap-5">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setSelected(null)}
        >
          گزارش جدید
        </button>
      </div>
      <ul className="grid grid-cols-2 bg-cyan-200 rounded py-5 px-10">
        <li className="flex gap-3">
          <span>سال:</span>
          <span>{reports?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر:</span>
          <span>{reports?.semester_type}</span>
        </li>
      </ul>

      {reports?.totalSubscribers === 0 ? (
        <div>هنوز کسی اشتراک نکرده</div>
      ) : (
        <>
          <article className="flex gap-2 flex-wrap justify-around m-5">
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>فیصدی امتیازات در سطح کل دانشگاه</span>
              <span>
                {Number(reports?.total?.percent).toFixed(1).toString()}%
              </span>
            </div>
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد فاکولته های شامل این گزارش</span>
              <span>{reports?.purifyFaculty?.length}</span>
            </div>
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد اشتراک کننده ها</span>
              <span>{reports?.total?.subscribers}</span>
            </div>
          </article>
          <div>
            {chartData?.length > 0 && (
              <BarChart
                chartData={chartData}
                label="نمودار فیصدی فاکولته ها"
                y_label="درصدی"
                x_label="فاکولته"
                title=" چارت نشان دهنده فیصدی نمرات همه فاکولته ها است."
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default TotalReport;
