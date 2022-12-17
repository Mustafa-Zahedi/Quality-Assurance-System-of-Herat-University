import React from "react";

const Input = ({
  register,
  errors,
  label,
  name,
  type,
  defaultValue,
  ...props
}) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center ">
      <label htmlFor={name}>{label}</label>
      <div className="w-full">
        <input
          {...register(name)}
          type={`${type}`}
          {...props}
          defaultValue={defaultValue}
          className="w-full border-2 border-[#1E408E] p-1 rounded"
        />
        {errors[name] && (
          <p className="text-red-500 text-xs">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
