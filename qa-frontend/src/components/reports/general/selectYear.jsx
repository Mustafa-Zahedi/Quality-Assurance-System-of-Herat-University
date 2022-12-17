import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import FormBorder from "../../form/formBorder";
import InputYear from "../../form/inputYear";
import Select from "../../form/Select";
import { semester_type } from "../../../services/list";
import TotalReport from "./totalReport";

const schema = yup.object({
  semester_type: yup
    .string()
    .required("لطفا نوعیت سمستر مورد نظرتان را انتخاب نمایید "),
  year: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const TotalReportSelection = () => {
  const [selected, setSelected] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setSelected(data);
  };

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      {!selected ? (
        <div>
          <FormBorder label={"درخواست گزارش"} className="lg:mx-40">
            <h6 className="mb-10 text-sm">
              برای تهیه گزارش لطفا موارد ذیل را با دقت انتخاب نمایید
            </h6>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid w-full gap-3"
            >
              <InputYear
                register={register}
                errors={errors}
                label="سال"
                name="year"
                type="Date"
                useForm={useForm}
                Controller={Controller}
                control={control}
                defaultValue={Date.now()}
              />
              <Select
                name="semester_type"
                Type={"string"}
                label={"نوعیت سمستر"}
                errors={errors}
                Controller={Controller}
                control={control}
                options={semester_type}
                placeholder="نوعیت سمستر"
              />
              <div className="flex justify-end px-20">
                <button
                  type={"submit"}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  تایید
                </button>
              </div>
            </form>
          </FormBorder>
        </div>
      ) : (
        <TotalReport
          setSelected={setSelected}
          year={selected.year}
          semester_type={selected.semester_type}
        />
      )}
    </section>
  );
};

export default TotalReportSelection;
