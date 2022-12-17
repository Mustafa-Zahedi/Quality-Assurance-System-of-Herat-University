import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { httpPostQuestion } from "../../services/questin";
import FormBorder from "../form/formBorder";
import TextInput from "../form/textInput";
import Select from "../teacher/Select";

const AddQuestionForm = ({
  schema,
  setLoading,
  addNew,
  setAddNew,
  refetch,
}) => {
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

    const res = await httpPostQuestion({
      ...data,
    });
    console.log(res);
    if (res) {
      refetch();
      setLoading(false);
      setAddNew(false);
    }
  };

  useEffect(() => {
    reset();
  }, [addNew, reset]);

  return (
    <article className="">
      <FormBorder label={"اضافه کردن سوال"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <TextInput
            register={register}
            errors={errors}
            rows={5}
            label="متن سوال"
            name="text"
            type="text"
          />

          <Select
            name="status"
            // Type={"number"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={[
              ["پیش نویس", false],
              ["فعال", true],
            ]}
            placeholder="حالت"
            label="حالت"
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

export default AddQuestionForm;
