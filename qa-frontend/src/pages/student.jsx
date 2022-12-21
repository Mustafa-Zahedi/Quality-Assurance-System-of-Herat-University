import React, { useState } from "react";
import CheckId from "../components/student/checkId";
import Form from "../components/student/form";

const Student = () => {
  const [data, setData] = useState();
  // console.log(data);
  return (
    <main className="min-h-screen font-vazirBold pt-10 px-5 from-slate-100 to-white bg-gradient-to-br">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center mb-5 ">
        <span className="block xl:inline pb-3">دانشگاه هرات</span>{" "}
        <span className="block text-cyan-500 xl:inline">
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
