const Table = ({ reports }) => {
  const printStylesPage = () => {
    return `@page { margin: 40px !important; }`;
  };

  // console.log("table", reports);
  return (
    <section dir="rtl">
      <style type="text/css" media="print">
        {printStylesPage()}
      </style>
      <ul className="font-vazirBold grid grid-cols-2 bg-blue-300 rounded py-5 px-10 gap-x-10">
        <li className="flex gap-3">
          <span>نام و تخلص:</span>
          <span>{reports?.purifyTeachers?.teacher?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>فاکولته:</span>
          <span>{reports?.department?.faculty?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت:</span>
          <span>{reports?.department?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>سال:</span>
          <span>{reports?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر:</span>
          <span>{reports?.semester_type}</span>
        </li>
      </ul>
      <article className="flex gap-2 flex-wrap justify-around bg-orange-400 my-3 py-2 rounded">
        <div className="flex gap-3">
          <span>فیصدی امتیازات استاد:</span>
          <span>{Number(reports?.purifyTeachers?.percent).toFixed(1)}%</span>
        </div>

        <div className="flex gap-3">
          <span>تعداد اشتراک کننده:</span>
          <span>{Number(reports?.purifyTeachers?.subscribers)}</span>
        </div>
      </article>
      <div className="p-5 rounded-xl bg-gray-100">
        <h4 className="font-vazir text-xl">
          جدول گزارش مضامین استاد {reports.purifyTeachers?.teacher?.fa_name}{" "}
        </h4>
        <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-5 text">
          <table
            className="min-w-full divide-y divide-gray-300 font-vazir"
            dir="rtl"
          >
            <thead dir="rtl" className="text-base">
              <tr className="divide-x divide-x-reverse divide-gray-200">
                <th
                  scope="col"
                  className="w-[3rem] py-3.5 pr-4 pl-4 text-right font-semibold text-gray-900 sm:pr-6"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="max-w-[40rem] px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  نام مضمون
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  سمستر
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  فیصدی نمرات
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  تعداد پاسخ ها
                </th>
              </tr>
            </thead>
            <tbody dir="rtl" className="divide-y divide-gray-200 bg-white">
              {reports?.purifySubject?.map((item, ndx) => (
                <tr
                  key={ndx}
                  className="divide-x divide-x-reverse divide-gray-200"
                >
                  <td className="whitespace-nowrap p-2 lg:p-4  font-medium text-gray-900">
                    {item?.subject?.id}
                  </td>

                  <td className="max-w-[40rem] p-2 lg:p-4  text-gray-700">
                    <p>{item?.subject?.name}</p>
                  </td>
                  <td className="max-w-[40rem] p-2 lg:p-4  text-gray-700">
                    <p>{item?.semester}</p>
                  </td>

                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    % {(+item?.percent).toFixed(1)}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item?.subscribers}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
