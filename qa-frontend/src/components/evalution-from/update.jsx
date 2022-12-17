import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FormBorder from "../form/formBorder";
import InputTime from "../form/InputTime";
import { httpPutForm } from "../../services/evalution-form";
import { toast } from "react-toastify";
import { ToastMsg } from "../TaostMsg";

const schema = yup.object({
  start_date: yup.number().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
  end_date: yup.number().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const UpdateForm = ({ formData, refetch, setIsOpen, setLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    // console.log(data, formData, "🎈🎈");
    const res = await httpPutForm({
      id: formData.id,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      year: new Date(data.start_date).getFullYear(),
    });
    if (res) {
      res.ok
        ? toast.success(<ToastMsg text={"فورم بروز شد"} />)
        : toast.warning(<ToastMsg text={"فورم بروز نشد"} />);
      refetch();
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <FormBorder label={"ویرایش فورم ارزیابی"} childClassName="mt-0">
        <div className="flex justify-around mb-5">
          <p>آیدی</p>
          <p>{formData.id}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-3">
          <>
            <InputTime
              register={register}
              errors={errors}
              label="تاریخ شروع"
              name="start_date"
              type="Date"
              useForm={useForm}
              Controller={Controller}
              control={control}
              defaultValue={formData.start_date || Date.now}
            />
            <InputTime
              register={register}
              errors={errors}
              label="تاریخ ختم"
              name="end_date"
              type="Date"
              useForm={useForm}
              Controller={Controller}
              control={control}
              defaultValue={
                formData.end_date || Date.now() + 1000 * 60 * 60 * 24
              }
            />
          </>
          <div className="mt-4 flex gap-3">
            <button
              type="reset"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(false)}
            >
              لغو{" "}
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              تایید{" "}
            </button>
          </div>
        </form>
      </FormBorder>
    </div>
  );
};

export default UpdateForm;
