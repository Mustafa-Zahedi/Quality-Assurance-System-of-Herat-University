import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";

import Loading from "../components/loading";
import { login } from "../services/auth";
import { useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";
import Input from "../components/form/input";
import FormBorder from "../components/form/formBorder";

const schema = yup.object({
  username: yup.string().required("نام کاربری تان را وارد نمایید"),
  password: yup.string().required("رمز عبور تان را وارد نمایید"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await login(data);
    // console.log(res, "res");
    if (res) {
      setLoading(false);
      if (res?.ok) {
        const data = await res.json();
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("username", data.name);
        sessionStorage.setItem("data", data);
        navigate("/dashboard");
      } else {
        toast.error("نام کاربری و یا رمز عبور اشتباه است");
      }
    }
    setLoading(false);
  };

  return (
    <section className="relative grid place-content-center font-vazirBold h-screen">
      <FormBorder label={"ورود به حساب کاربری"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3 p-5"
        >
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
          {/* <div className="grid gap-2">
          <label htmlFor="username">نام کاربری</label>
          <div>
            <input
              type="text"
              {...register("username")}
              className="border-2 border-[#1E408E] p-1 rounded"
            />
            {errors?.["username"] ? (
              <p className="text-red-500">{errors?.["username"].message}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">رمز عبور</label>
          <div>
            <input
              type="password"
              {...register("password")}
              className="border-2 border-[#1E408E] p-1 rounded"
            />
            {errors?.["password"] && (
              <p className="text-red-500">{errors?.["password"].message}</p>
            )}
          </div>
        </div> */}
          <div className="flex justify-end px-20">
            <button
              type={"submit"}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              تایید
            </button>
          </div>
        </form>
      </FormBorder>
      {loading && <Loading />}
    </section>
  );
};

export default Login;
