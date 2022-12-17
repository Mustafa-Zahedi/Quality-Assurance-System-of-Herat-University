import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { httpPostFaculties } from "../../services/faculty";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";
import { ToastMsg } from "../TaostMsg";

const AddFacultyForm = ({ schema, setLoading, addNew, setAddNew, refetch }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);

    const res = await httpPostFaculties({
      ...data,
      date: data.date.toJSON().slice(0, 10),
    });
    // console.log("resss", res);
    if (res) {
      res.ok
        ? toast.success(<ToastMsg text={"فاکولته جدید ایجاد شد"} />)
        : toast.warning(
            <ToastMsg text={"لطفا از ایجاد فاکولته تکراری خودداری نمایید"} />
          );
      refetch();
      setLoading(false);
      setAddNew(false);
    }
  };

  useEffect(() => {
    reset();
  }, [addNew, reset]);

  return (
    <article className="w-full">
      <FormBorder label={"ایجاد فاکولته"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام فاکولته (فارسی)"
            name="fa_name"
            type="text"
          />
          <Input
            register={register}
            errors={errors}
            dir={"ltr"}
            label="نام فاکولته(انگلیسی)"
            name="en_name"
            type="text"
          />
          <InputDate
            register={register}
            errors={errors}
            label="تاریخ"
            name="date"
            type="Date"
            useForm={useForm}
            Controller={Controller}
            control={control}
            defaultValue={new Date()}
          />

          <div className="flex gap-5 justify-end w-full">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setAddNew(false)}
            >
              لغو
            </button>
            <button
              type={"submit"}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              تایید
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
};

export default AddFacultyForm;
