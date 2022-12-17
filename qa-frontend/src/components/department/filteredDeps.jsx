import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Select from "../SelectForFilter";

const schema = yup.object({
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
});

const FilterDep = ({ selectedFac, setSelectedFac, faculties }) => {
  const [cancelFilter, setCancelFilter] = useState(false);

  // const { data: faculties, loading, error } = useFetch("faculty");

  const {
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { facultyId: null },
  });

  useEffect(() => {
    reset({ departmentId: null, facultyId: null });
    setSelectedFac(null);
  }, [cancelFilter, reset, setSelectedFac]);

  // console.log("filterTeacher");

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
          setSelected={setSelectedFac}
          resetField={resetField}
          reset={cancelFilter}
        />
      </article>
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

export default FilterDep;
