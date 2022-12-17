import React from "react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const InputTime = ({
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
        defaultValue={new Date(defaultValue).getTime()}
        rules={{ required: true }}
        render={({ field: { onChange, name, value } }) => (
          <div className="grid">
            <DatePicker
              value={new Date(value).getTime() || undefined}
              onChange={(date) => {
                onChange(new Date(date).getTime());
              }}
              format={"hh:mm a YYYY/MM/DD"}
              plugins={[<TimePicker position="bottom" hideSeconds />]}
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

export default InputTime;
