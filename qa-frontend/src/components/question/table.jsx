import jwtDecoder from "jwt-decode";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const QuestionTable = ({ setIsOpenModal, questions, updateF, deleteF }) => {
  const token = sessionStorage.getItem("token");
  const { user } = jwtDecoder(token);
  // console.log(questions);
  return (
    <div>
      {" "}
      <div className="mb-10">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setIsOpenModal(true)}
        >
          اضافه کردن سوال{" "}
        </button>
      </div>
      <div className="p-5 rounded-xl bg-gray-100">
        <h4 className="font-vazirBlack text-3xl">لیست سوالات</h4>
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
                  شماره (Id)
                </th>
                <th
                  scope="col"
                  className="max-w-[40rem] px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  متن سوال
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  حالت
                </th>
                {user.level && (
                  <th
                    scope="col"
                    className="py-3.5 p-4 pr-4 text-right font-semibold text-gray-900 sm:pl-6"
                  >
                    ویرایش/حذف
                  </th>
                )}
              </tr>
            </thead>
            <tbody dir="rtl" className="divide-y divide-gray-200 bg-white">
              {questions?.map((item) => (
                <tr
                  key={item.id}
                  className="divide-x divide-x-reverse divide-gray-200"
                >
                  <td className="whitespace-nowrap p-2 lg:p-4  font-medium text-gray-900">
                    {item.id}
                  </td>

                  <td className="max-w-[40rem] p-2 lg:p-4  text-gray-700">
                    <p>{item.text}</p>
                  </td>

                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item.status ? (
                      <span>تایید شده 🚀</span>
                    ) : (
                      <span>پیش نویس ✍</span>
                    )}
                  </td>
                  {user.level && (
                    <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
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
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionTable;
