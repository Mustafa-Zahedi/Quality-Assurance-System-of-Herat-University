import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="font-vazir grid place-content-center h-screen">
      <h3 className="text-center m-10">Not Found</h3>
      <div className="">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => navigate("/")}
        >
          بازگشت به صفحه اول
        </button>
      </div>
    </div>
  );
};

export default NotFound;
