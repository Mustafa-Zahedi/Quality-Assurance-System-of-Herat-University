import DatePicker from "react-multi-date-picker";

const InputYear = ({
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
        defaultValue={new Date(defaultValue)}
        rules={{
          required: {
            value: true,
            message: "لطفا سال مورد نظر تان را وارد نمایید",
          },
        }}
        render={({ field: { onChange, name, value } }) => (
          <div className="grid">
            <DatePicker
              onlyYearPicker
              value={value}
              onChange={(date) => {
                onChange(date.toDate());
              }}
              format={"YYYY"}
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

export default InputYear;
