import React, { useState } from "react";
import CheckId from "../components/student/checkId";
import Form from "../components/student/form";

const Student = () => {
  const [data, setData] = useState();
  return (
    <main className="font-vazirBold my-5 px-5">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center mb-5 ">
        <span className="block xl:inline pb-3">دانشگاه هرات</span>{" "}
        <span className="block text-cyan-600 xl:inline">
          کمیته تضمین کیفیت{" "}
        </span>
      </h1>
      <section>
        {!data ? <CheckId setData={setData} /> : <Form formData={data} />}
      </section>
    </main>
  );
};

export default Student;
