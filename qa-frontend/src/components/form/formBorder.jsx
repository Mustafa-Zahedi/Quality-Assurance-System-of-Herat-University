import React from "react";

const FormBorder = ({ children, label, className, childClassName }) => {
  return (
    <div
      className={`${className} bg-stone-50 shadow-xl border border-gray-500 m-5 rounded-lg transition-all duration-200`}
    >
      <div className="w-full border-b border-gray-500 bg-stone-200 px-5 py-1 rounded-t-lg">
        <h1 className="py-1 text-xl md:text-3xl font-bold text-cyan-700">
          {label}
        </h1>
      </div>
      <div className={`${childClassName} mt-5 p-5`}>{children}</div>
    </div>
  );
};

export default FormBorder;
