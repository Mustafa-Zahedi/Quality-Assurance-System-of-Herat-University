import React, { useEffect, useState } from "react";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";
import TextInput from "../form/textInput";
import Select from "../teacher/Select";

const AddTeacherForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  Controller,
  control,
  faculties,
  useForm,
  addNewTeacher,
  setAddNewTeacher,
  reset,
  resetField,
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState([]);

  useEffect(() => {
    reset();
  }, [addNewTeacher, reset]);
  return (
    <article className="w-full">
      <button
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group"
        onClick={() => setAddNewTeacher(false)}
      >
        {/* <XMarkIcon className="text-gray-500 group-hover:text-black h-4 w-4" /> */}
        <span>بازگشت</span>
      </button>
      <FormBorder label={"اضافه کردن استاد"} className="lg:mx-40">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام و تخلص (فارسی)"
            name="fa_name"
            type="text"
          />
          <Input
            register={register}
            errors={errors}
            dir="ltr"
            label="نام و تخلص (انگلیسی)"
            name="en_name"
            type="text"
          />
          <Input
            register={register}
            errors={errors}
            label="حالت"
            name="state"
            type="text"
            placeholder="مثلا: تعلیق"
          />
          <Input
            register={register}
            errors={errors}
            label="نوعیت"
            name="type"
            type="text"
            placeholder="دایمی"
          />
          <Select
            name="gender"
            Type={"string"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={[
              ["آقا", "male"],
              ["خانم", "female"],
            ]}
            placeholder="جنسیت"
            label="جنسیت"
            reset={reset}
            defaultValue={["آقا", "male"]}
          />
          <Select
            name="facultyId"
            Type={"number"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={faculties.map((faculty) => [faculty.fa_name, faculty.id])}
            placeholder="فاکولته"
            label="فاکولته"
            setSelectedOptions={setSelectedFaculty}
            resetField={resetField}
          />
          <Select
            name="departmentId"
            Type={"number"}
            errors={errors}
            Controller={Controller}
            control={control}
            options={faculties
              .filter((fc) => fc.fa_name === selectedFaculty[0])[0]
              ?.departments.map((department) => [
                department.fa_name,
                department.id,
              ])}
            placeholder="دیپارتمنت"
            label="دیپارتمنت"
            className={!selectedFaculty && "disabled"}
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
          <TextInput
            register={register}
            errors={errors}
            label="شرح حال"
            name="des"
            type="text"
          />
          <div className="flex gap-5 justify-end w-full">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setAddNewTeacher(false)}
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

export default AddTeacherForm;
