import React from "react";

const TeacherData = ({ formData }) => {
  const { teacher } = formData;
  return (
    <section className="px-5 py-5 font-vazirBlack text-lg border-b border-gray-700 bg-cyan-800 text-white">
      <div className="flex flex-wrap gap-5 justify-between">
        <article className="flex gap-5 justify-center">
          <ul className="grid gap-1">
            <li className="flex gap-10">
              <span>استاد</span>
            </li>
            <li className="flex gap-10">
              <span>فاکولته</span>
            </li>
            <li className="flex gap-10">
              <span>دیپارتمنت</span>
            </li>
            <li className="flex gap-10">
              <span>مضمون</span>
            </li>
            <li className="flex gap-10">
              <span>سمستر</span>
            </li>
            <li className="flex gap-10">
              <span>سال</span>
            </li>
          </ul>
          <ul className="grid gap-1">
            <span>{teacher.fa_name}</span>
            <span>{formData.department.faculty.fa_name}</span>
            <span>{formData.department.fa_name}</span>
            <span>{formData.subject.name}</span>
            <span>
              <span>{formData.semester}</span> -{" "}
              <span>{formData.semester_type}</span>
            </span>
            <span>{formData.year}</span>
          </ul>
        </article>
        <article className="hidden md:block">
          <img src="/icons/avatar.png" alt="avatar" className="h-auto" />
        </article>
      </div>
    </section>
  );
};

export default TeacherData;
