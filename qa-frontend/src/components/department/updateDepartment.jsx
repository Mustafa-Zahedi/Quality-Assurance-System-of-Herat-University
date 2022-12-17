import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { httpPutDepartment } from "../../services/department";
import SelectInput from "../faculty/select";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";

export default function UpdateDepartment({
  isOpen,
  setIsOpen,
  schema,
  confirmText,
  denyText,
  refetch,
  department,
  setLoading,
  faculties,
}) {
  console.log(department);
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
    setData(department);
    reset();
  }, [department, isOpen, reset, setIsOpen]);

  const onSubmit = async (data) => {
    setLoading(true);
    const date = new Date(data.date);
    const res = await httpPutDepartment({
      id: department.id,
      fa_name: data.fa_name,
      en_name: data.en_name,
      facultyId: data.facultyId,
      date: date.toJSON().slice(0, 10),
    });
    console.log("put", res);
    if (res.updated) {
      refetch();
      setLoading(false);
    }
    closeModal();
  };

  return (
    <article className="w-full">
      <FormBorder label={"ویرایش دیپارتمنت"}>
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
            defaultValue={data.fa_name}
          />
          <Input
            register={register}
            errors={errors}
            dir={"ltr"}
            label="نام دیپارتمنت (انگلیسی)"
            name="en_name"
            type="text"
            defaultValue={data.en_name}
          />
          <SelectInput
            name="facultyId"
            Type={"number"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={faculties?.map((item) => [item.fa_name, item.id])}
            placeholder="فاکولته"
            defaultValue={[department.faculty.fa_name, department.facultyId]}
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
            defaultValue={new Date(department.date)}
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
