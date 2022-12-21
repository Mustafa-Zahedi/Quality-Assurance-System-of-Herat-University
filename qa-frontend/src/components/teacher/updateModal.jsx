import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { httpPutTeacher } from "../../services/teacher";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";
import TextInput from "../form/textInput";
import Select from "./Select";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  type: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  gender: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
  des: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
});

export default function UpdateModal({
  setIsOpen,
  confirmText,
  denyText,
  refetch,
  teacher,
  setLoading,
  setIsOpenTeacherModal,
}) {
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
    // console.log("teacher", teacher, {
    //   id: teacher.id,
    //   fa_name: data.fa_name,
    //   en_name: data.en_name,
    //   des: data.des,
    //   gender: data.gender,
    //   state: data.type,
    //   date: data.date,
    // });
    setLoading(true);
    const res = await httpPutTeacher({
      id: teacher.id,
      fa_name: data.fa_name,
      en_name: data.en_name,
      des: data.des,
      gender: data.gender,
      state: data.state,
      type: data.type,
    });
    // console.log("put", res);
    if (res) {
      refetch();
      setLoading(false);
      setIsOpenTeacherModal(false);
    }
    closeModal();
  };

  return (
    <article className="w-full">
      <FormBorder label={"ویرایش استاد"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام استاد (فارسی)"
            name="fa_name"
            type="text"
            defaultValue={teacher.fa_name}
          />
          <Input
            register={register}
            errors={errors}
            dir="ltr"
            label="نام استاد (انگلیسی)"
            name="en_name"
            type="text"
            defaultValue={teacher.en_name}
          />
          <Input
            register={register}
            errors={errors}
            label="حالت مدنی"
            name="state"
            type="text"
            defaultValue={teacher.state}
          />
          <Input
            register={register}
            errors={errors}
            label="نوعیت"
            name="type"
            type="text"
            placeholder="دایمی"
            defaultValue={teacher.type}
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
            defaultValue={
              teacher.gender === "male" ? ["آقا", "male"] : ["خانم", "female"]
            }
          />

          <TextInput
            register={register}
            errors={errors}
            label="شرح حال"
            name="des"
            type="text"
            defaultValue={teacher.des}
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
            defaultValue={new Date(teacher.date)}
          />

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              {denyText}
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              // onClick={() => confirmUpdate(department)}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
}
