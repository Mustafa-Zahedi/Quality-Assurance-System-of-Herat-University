import { useState } from "react";
import DatePicker from "react-multi-date-picker";

const SelectYear = ({ control, Controller, label, name, errors }) => {
  const [year, setYear] = useState(new Date());
  function selectYear(date) {
    setYear(date);
  }

  return (
    <div className="inline-flex gap-3 content-center items-center">
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        defaultValue={new Date(year)}
        rules={{
          required: {
            value: true,
            message: "لطفا سال مورد نظر تان را وارد نمایید",
          },
        }}
        render={({ field: { onChange, name, value } }) => (
          <div className="">
            <DatePicker
              onlyYearPicker
              value={value}
              onChange={(date) => {
                onChange(date.toDate());
                selectYear(date.toDate());
              }}
              format={"YYYY"}
              inputClass="w-fit border-2 border-[#1E408E] p-1 rounded"
            />
            {errors[name] && (
              <p className="text-red-500 text-xs">{errors[name]?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SelectYear;
