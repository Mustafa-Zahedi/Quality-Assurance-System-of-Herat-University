import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { httpPutFaculties } from "../../services/faculty";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";

export default function UpdateFaculty({
  isOpen,
  setIsOpen,
  schema,
  confirmText,
  denyText,
  refetch,
  faculty,
  setLoading,
}) {
  const [data, setData] = useState("");

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

  useEffect(() => {
    setData(faculty);
    reset();
  }, [faculty, isOpen, reset, setIsOpen]);

  const onSubmit = async (data) => {
    setLoading(true);
    const date = new Date(data.date);
    const res = await httpPutFaculties({
      id: faculty.id,
      fa_name: data.fa_name,
      en_name: data.en_name,
      date: date.toJSON().slice(0, 10),
    });
    // console.log(res, "res put");
    if (res) {
      refetch();
      setLoading(false);
    }
    closeModal();
  };

  return (
    <article className="w-full">
      <FormBorder label={"ویرایش فاکولته"}>
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
            defaultValue={data.fa_name}
          />
          <Input
            register={register}
            errors={errors}
            dir={"ltr"}
            label="نام فاکولته(انگلیسی)"
            name="en_name"
            type="text"
            defaultValue={data.en_name}
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
            defaultValue={new Date(faculty.date)}
          />

          <div className="mt-4 flex gap-3">
            <button
              type="reset"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              {denyText}
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              {confirmText}
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
}
