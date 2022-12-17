import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import * as yup from "yup";
import moment from "jalali-moment";

import useFetch from "../hooks/useFetch";
import Loading from "../components/loading";
import Modal from "../components/modal";
import DeleteModal from "../components/users/deleteModal";
import UpdateUser from "../components/users/updateModal";

const schema = yup.object({
  name: yup.string().required("نام تان را بنویسید"),
  username: yup.string().required("نام کاربری تان را بنویسید"),
  password: yup
    .string()
    .min(6, "رمز عبورباید  حداقل ۶ کاراکتر باشد")
    .required("رمز عبور تان را بنویسید"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "رمز عبور تان را با دقت وارد نمایید "),
  faculty: yup.number().nullable().required("فاکولته تان را انتخاب نمایید"),
});

const Users = () => {
  const [loadingUser, setLoading] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { data: users, loading, refetch, error } = useFetch("auth/users");

  console.log(users);

  const updateUser = (data) => {
    setSelectedUser(data);
    setIsOpenUpdateModal(true);
  };
  const deleteUser = (data) => {
    setSelectedUser(data);
    setIsOpenDeleteModal(true);
  };

  if (loading || loadingUser) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div className="p-5 rounded-xl bg-gray-100">
        <h4 className="font-vazirBlack text-3xl">لیست کاربران</h4>

        <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-5 text">
          <table
            className="min-w-full divide-y divide-gray-300 font-vazir"
            dir="rtl"
          >
            <thead dir="rtl" className="font-vazirBold text-base">
              <tr className="divide-x divide-x-reverse divide-gray-200">
                <th
                  scope="col"
                  className="px-2 lg:px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  آی دی
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  نام
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  نام کاربری
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  فاکولته
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  حالت
                </th>
                <th
                  scope="col"
                  className="px-2 lg:px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  تاریخ
                </th>
                <th
                  scope="col"
                  className="p-2 lg:p-4 text-right font-semibold text-gray-900 sm:pl-6"
                >
                  ویرایش/حذف
                </th>
              </tr>
            </thead>
            <tbody dir="rtl" className="divide-y divide-gray-200 bg-white">
              {users?.map((item, ndx) => (
                <tr
                  key={ndx}
                  className={`divide-x divide-x-reverse divide-gray-200 ${
                    item.is_super_admin && "bg-green-100"
                  }`}
                >
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item?.id}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item?.name}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item?.userName}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item?.faculty?.fa_name}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item?.status}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {moment(item?.createdAt, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    <div className="flex justify-around">
                      <button
                        onClick={() => updateUser(item)}
                        className="h-full flex items-center hover:text-black hover:scale-105"
                      >
                        <PencilSquareIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => deleteUser(item)}
                        className="h-full flex items-center hover:text-black group"
                      >
                        <TrashIcon className="h-6 w-6  group-hover:scale-105" />
                      </button>
                    </div>
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateUser
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          schema={schema}
          setLoading={setLoading}
          title={"ویرایش فاکولته"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          user={selectedUser}
        />
      </Modal>
      {selectedUser && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          setIsOpen={setIsOpenDeleteModal}
          title={"حذف فاکولته"}
          refetch={refetch}
          user={selectedUser}
        />
      )}
    </section>
  );
};

export default Users;
