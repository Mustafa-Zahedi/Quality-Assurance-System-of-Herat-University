import TeacherData from "./teacherData";
import QuestionForm from "./questionForm";
import FormBorder from "../form/formBorder";

// const schema = yup.object({
//   q1: yup
//     .string()
//     .required("لطفا پاسخ مورد نظرتان را انتخاب نمایید ")
//     .nullable(),
// });

const Form = ({ formData }) => {
  console.log("formData", formData);

  return (
    <div className="grid justify-center font-vazirBold text-gray-700">
      <div className="p-5 text-cyan-700 font-vazirBlack border-b">
        <p>
          از اینکه در این همه پرسی اشتراک مینمایید از شما قدردانی میکنیم. لطفا
          با دقت پاسخ دهید.
        </p>
      </div>
      <FormBorder label={"فورم ارزیابی"} childClassName="px-0 mt-0 py-0">
        <TeacherData formData={formData} />
        <QuestionForm formId={formData.id} />
      </FormBorder>
    </div>
  );
};

export default Form;
