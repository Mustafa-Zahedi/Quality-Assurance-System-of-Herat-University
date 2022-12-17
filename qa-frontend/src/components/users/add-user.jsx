import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import SelectInput from "../faculty/select";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import { toast } from "react-toastify";
import { ToastMsg } from "../TaostMsg";
import Loading from "../loading";
import { registerUser } from "../../services/auth";

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

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const { data: faculties } = useFetch("faculty");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("register", data);
    setLoading(true);
    try {
      const res = await registerUser({
        name: data.name,
        username: data.username,
        faculty: data.faculty,
        password: data.password,
      });
      console.log(res, "res");

      if (res?.ok) {
        toast.success(<ToastMsg text={"حساب کاربری موفقانه ایجاد شد"} />, {
          position: "bottom-left",
        });
        navigate("/user/users");
      } else {
        // const data = await res.json();
        console.log("data", data);
        res.status === 400
          ? toast.error(
              <ToastMsg text={"این حساب کاربری قبلا ایجاد شده است"} />,
              { position: "bottom-left" }
            )
          : toast.error(
              <ToastMsg text={"متاسفانه حساب کاربری مورد نظر ایجاد نشد"} />,
              { position: "bottom-left" }
            );
      }
    } catch (error) {
      toast.error("لطفا ارتباط با سرور را چک نمایید");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <section className="w-full">
        {" "}
        <FormBorder label={"اضافه کردن کابر جدید"}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid min-w-full gap-3 p-5"
          >
            <Input
              register={register}
              errors={errors}
              label="نام"
              name="name"
              type="text"
            />
            <Input
              register={register}
              errors={errors}
              label=" نام کاربری (ایمیل)"
              name="username"
              type="text"
              dir="ltr"
            />
            <Input
              register={register}
              errors={errors}
              label="رمز عبور"
              name="password"
              type="password"
              dir="ltr"
            />
            <Input
              register={register}
              errors={errors}
              label="تایید رمز عبور"
              name="passwordConfirmation"
              type="password"
              dir="ltr"
            />
            <SelectInput
              name="faculty"
              Type={"number"}
              Controller={Controller}
              control={control}
              errors={errors}
              options={faculties?.map((item) => [item.fa_name, item.id])}
              placeholder="فاکولته"
            />
            <div className="flex justify-end px-20">
              <button
                type={"submit"}
                className="px-5 py-2 rounded-sm text-white bg-[#1E408E] hover:bg-[#3672ff]"
              >
                تایید
              </button>
            </div>
          </form>
        </FormBorder>
      </section>
      {loading && <Loading />}
    </main>
  );
};

export default AddUser;
