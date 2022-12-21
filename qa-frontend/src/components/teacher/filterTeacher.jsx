import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Select from "../SelectForFilter";

const schema = yup.object({
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  departmentId: yup
    .number()
    .nullable()
    .required("لطفا این قسمت را تکمیل نمایید"),
  //   date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const FilterTeacher = ({
  selectedFac,
  setSelectedFac,
  setSelectedDep,
  faculties,
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [cancelFilter, setCancelFilter] = useState(false);

  const {
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { facultyId: null, departmentId: null },
  });

  useEffect(() => {
    reset({ departmentId: null, facultyId: null });
    setSelectedDep(null);
    setSelectedFac(null);
  }, [cancelFilter]);

  return (
    <div className="flex flex-wrap gap-5 w-full px-5">
      <article className="">
        <Select
          name="facultyId"
          Type={"number"}
          Controller={Controller}
          control={control}
          errors={errors}
          options={faculties?.map((faculty) => [faculty.fa_name, faculty.id])}
          placeholder="فاکولته"
          label=" فیلتر فاکولته"
          setSelectedOptions={setSelectedFaculty}
          setSelected={setSelectedFac}
          resetField={resetField}
          reset={cancelFilter}
        />
      </article>
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
        setSelected={setSelectedDep}
        placeholder="دیپارتمنت"
        label="فیلتر دیپارتمنت"
        className={!selectedFaculty && "disabled"}
        reset={cancelFilter}
      />
      {selectedFac && (
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setCancelFilter(!cancelFilter)}
        >
          لغو فیلتر
        </button>
      )}
    </div>
  );
};

export default FilterTeacher;
