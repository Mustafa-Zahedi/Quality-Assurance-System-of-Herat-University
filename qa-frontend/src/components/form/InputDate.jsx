import React from "react";

import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const InputDate = ({
  control,
  Controller,
  label,
  name,
  errors,
  defaultValue,
}) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field: { onChange, name, value } }) => (
          <div className="grid">
            <DatePicker
              value={value || ""}
              onChange={(date) => {
                onChange(date.toDate());
              }}
              format={"YYYY/MM/DD"}
              calendar={persian}
              locale={persian_fa}
              inputClass="w-full border-2 border-[#1E408E] p-1 rounded"
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

export default InputDate;
