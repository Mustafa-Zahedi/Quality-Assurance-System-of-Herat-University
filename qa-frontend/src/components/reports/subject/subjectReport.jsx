import React, { useEffect, useRef, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";
import Table from "./table";
import useFetch from "../../../hooks/useFetch";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
const SubjectReport = ({
  teacherId,
  year,
  semester_type,
  semester,
  subjectId,
  setSelected,
}) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { loading: laodingdata, data: questions, error } = useFetch("question");

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await httpGetReport(
          {
            semester,
            teacherId,
            year: new Date(year).getFullYear(),
            semester_type,
            subjectId,
          },
          "subject"
        );
        setResponse(res);
        const reports = await res.json();
        setReport(reports);
        const temp = [];
        for (const [key, value] of Object.entries(reports.result)) {
          temp.push({ label: key, percent: value.percent, subs: value.subs });
        }
        setChartData(temp);
      } catch (error) {
        console.log("error");
        response.status === 404
          ? toast.warning(<ToastMsg text="دیتا وجود ندارد" />, {
              position: "top-center",
            })
          : toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />, {
              position: "top-center",
            });
      } finally {
        setLoading(false);
      }
    })();
  }, [semester, semester_type, subjectId, teacherId, year]);

  const filterdQuestions = questions
    ?.filter((item) => item)
    ?.map(
      (item) =>
        chartData
          .map(
            (q) =>
              item.id === +q.label && {
                question: item,
                percent: q.percent,
                subs: q.subs,
              }
          )
          .filter((item) => item)[0]
    )
    .filter((item) => item);

  if (loading || laodingdata) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );
  // console.log(filterdQuestions, chartData);
  if (response?.status === 404)
    return (
      <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
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

      {filterdQuestions?.length > 0 && (
        <div>
          <article ref={componentRef} dir="rtl">
            <Table filterdQuestions={filterdQuestions} reports={reports} />
          </article>
          <div>
            <BarChart
              chartData={filterdQuestions?.map((item) => {
                return {
                  label: item?.question?.id,
                  percent: item?.percent,
                };
              })}
              label="نمودار فیصدی سوالات"
              y_label="درصدی"
              x_label="آیدی سوال"
              title=" چارت نشان دهنده فیصدی نمرات همه سوالات تایید شده است."
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SubjectReport;
