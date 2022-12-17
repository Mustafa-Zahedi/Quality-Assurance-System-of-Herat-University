import React, { useEffect } from "react";
import SelectInput from "../faculty/select";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";

const AddDepartmentForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  Controller,
  control,
  faculties,
  useForm,
  addNewDep,
  setAddNewDep,
  reset,
  refetch,
}) => {
  useEffect(() => {
    reset();
  }, [addNewDep, reset]);
  return (
    <section>
      <button
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group"
        onClick={() => setAddNewDep(false)}
      >
        {/* <XMarkIcon className="text-gray-500 group-hover:text-black h-4 w-4" /> */}
        <span>بازگشت</span>
      </button>
      <FormBorder label={"ایجاد دیپارتمنت"} className="lg:mx-40">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام دیپارتمنت (فارسی)"
            name="fa_name"
            type="text"
          />
          <Input
            register={register}
            errors={errors}
            dir="ltr"
            label="نام دیپارتمنت(انگلیسی)"
            name="en_name"
            type="text"
          />
          <SelectInput
            name="facultyId"
            Type={"number"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={faculties?.map((item) => [item.fa_name, item.id])}
            placeholder="فاکولته"
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
          />
          <div className="flex gap-5 justify-end w-full">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setAddNewDep(false)}
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
    </section>
  );
};

export default AddDepartmentForm;
