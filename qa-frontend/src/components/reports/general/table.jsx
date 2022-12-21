const Table = ({ reports }) => {
  // console.log(reports);
  return (
    <section dir="rtl" className="font-vazirBold">
      <ul className="grid grid-cols-2 bg-blue-300 rounded py-5 px-10">
        <li className="flex gap-3">
          <span>سال:</span>
          <span>{reports?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر:</span>
          <span>{reports?.semester_type}</span>
        </li>
      </ul>
      <article className="font-vazir flex gap-2 flex-wrap justify-around bg-orange-400 my-3 py-2 rounded">
        <div className="flex gap-3">
          <span>فیصدی امتیازات در سطح کل دانشگاه:</span>
          <span>{Number(reports?.total?.percent).toFixed(1).toString()}%</span>
        </div>
        <div className="flex gap-3">
          <span>تعداد فاکولته های شامل این گزارش:</span>
          <span>{reports?.purifyFaculty?.length}</span>
        </div>
        <div className="flex gap-3">
          <span>تعداد اشتراک کننده ها:</span>
          <span>{reports?.total?.subscribers}</span>
        </div>
      </article>
      <div className="p-5 rounded-xl bg-gray-100">
        <h4 className="font-vazir text-xl">گزارش فاکولته ها </h4>
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
                  #{" "}
                </th>
                <th
                  scope="col"
                  className="max-w-[40rem] px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  نام و تخلص
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
                  تعداد اشتراک کننده
                </th>
              </tr>
            </thead>
            <tbody dir="rtl" className="divide-y divide-gray-200 bg-white">
              {reports.purifyFaculty?.map(
                (item, ndx) =>
                  item && (
                    <tr
                      key={ndx}
                      className="divide-x divide-x-reverse divide-gray-200"
                    >
                      <td className="whitespace-nowrap p-2 lg:p-4  font-medium text-gray-900">
                        {ndx + 1}
                      </td>

                      <td className="max-w-[40rem] p-2 lg:p-4  text-gray-700">
                        <p>{item?.faculty?.fa_name}</p>
                      </td>
                      <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                        % {(+item?.percent).toFixed(1)}
                      </td>
                      <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                        {item?.subscribers}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
