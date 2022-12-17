import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { httpPutTeacher } from "../../services/teacher";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import { httpPutUser } from "../../services/auth";

const schema = yup.object({
  name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  userName: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  status: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
});

export default function UpdateUser({ setIsOpen, refetch, user, setLoading }) {
  function closeModal() {
    setIsOpen(false);
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await httpPutUser({ ...data, id: user.id });
    // console.log("put", await res.json());
    if (res) {
      refetch();
      setLoading(false);
      setIsOpen(false);
    }
    closeModal();
  };

  return (
    <article className="w-full">
      <FormBorder label={"ویرایش کاربر"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام"
            name="name"
            type="text"
            defaultValue={user.name}
          />
          <Input
            register={register}
            errors={errors}
            dir="ltr"
            label="نام کاربری"
            name="userName"
            type="text"
            defaultValue={user.userName}
          />
          <Input
            register={register}
            errors={errors}
            label="حالت"
            name="status"
            type="text"
            placeholder="active | block"
            defaultValue={user.status}
          />
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              لغو{" "}
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              // onClick={() => confirmUpdate(department)}
            >
              تایید{" "}
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
}
