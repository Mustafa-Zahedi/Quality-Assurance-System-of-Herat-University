import React from "react";

const FormBorder = ({ children, label, className, childClassName }) => {
  return (
    <div
      className={`rounded ${className} bg-stone-50 shadow-xl border border-gray-500 m-5 transition-all duration-200`}
    >
      <div className="w-full border-b border-gray-500 bg-cyan-800 px-5 py-1 rounded-t">
        <h1 className="py-1 text-xl md:text-3xl font-bold text-white">
          {label}
        </h1>
      </div>
      <div className={`mt-5 p-5 ${childClassName}`}>{children}</div>
    </div>
  );
};

export default FormBorder;
