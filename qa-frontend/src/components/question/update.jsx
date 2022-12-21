import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormBorder from "../form/formBorder";
import { httpPutQuestion } from "../../services/questin";
import Select from "../teacher/Select";
import TextInput from "../form/textInput";

export default function UpdateQuestion({
  schema,
  isOpen,
  setIsOpen,
  confirmText,
  denyText,
  refetch,
  question,
  setLoading,
}) {
  const [data, setData] = useState(null);

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
    setData(question);
    reset();
  }, [question, isOpen, reset, setIsOpen]);

  const onSubmit = async (data) => {
    console.log("sbbmit data", data);
    setLoading(true);
    const res = await httpPutQuestion({
      id: question.id,
      status: data.status,
      text: data.text,
    });
    console.log(res, "res put");
    if (res) {
      refetch();
      setLoading(false);
    }
    closeModal();
  };

  // console.log(data);

  if (!data) return <div className="text-red-500">خطا در بارگیری دیتا</div>;

  return (
    <article className="w-full">
      <FormBorder label={"ویرایش سوال"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <TextInput
            register={register}
            errors={errors}
            rows={5}
            label="متن"
            name="text"
            type="text"
            defaultValue={data.text}
          />
          <Select
            name="status"
            Controller={Controller}
            control={control}
            errors={errors}
            options={[
              ["متوقف", false],
              ["فعال", true],
            ]}
            placeholder="حالت"
            label="حالت"
            defaultValue={data.status ? ["فعال", true] : ["پیش نویس", false]}
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
