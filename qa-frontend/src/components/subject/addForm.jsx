import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { httpPostSubject } from "../../services/subject";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";
import Select from "../teacher/Select";

const AddSubjectForm = ({
  schema,
  setLoading,
  addNew,
  setAddNew,
  refetch,
  faculties,
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState([]);

  const {
    register,
    control,
    resetField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);

    const res = await httpPostSubject({
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
    <article className="w-full">
      <FormBorder label={"ایجاد مضمون"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام مضمون"
            name="name"
            type="text"
          />

          <Select
            name="facultyId"
            Type={"number"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={faculties?.map((faculty) => [faculty.fa_name, faculty.id])}
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
              ?.filter((fc) => fc.fa_name === selectedFaculty[0])[0]
              ?.departments?.map((department) => [
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

export default AddSubjectForm;
