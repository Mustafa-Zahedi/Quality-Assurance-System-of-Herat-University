import Countdown from "react-countdown";
import TeacherData from "./teacherData";
import QuestionForm from "./questionForm";
import FormBorder from "../form/formBorder";
import { useNavigate } from "react-router-dom";

const Form = ({ formData }) => {
  // console.log("formData", formData);
  const navigate = useNavigate();

  return (
    <section className="grid justify-center font-vazirBold text-gray-700">
      <div className="max-w-[40rem] ">
        <div className="p-2 text-cyan-700 font-vazirBlack border-b">
          <p>
            از اینکه در این همه پرسی اشتراک مینمایید از شما قدردانی میکنیم. لطفا
            با دقت پاسخ دهید.
          </p>
          <p>این فورم تا پایان زمان باقیمانده در دسترس خواهد بود</p>
          <div className="flex justify-end gap-2 px-5 text-red-500">
            <div className="grid grid-cols-2 w-44">
              <p>زمان باقیمانده</p>
              <Countdown
                date={new Date(formData.end_date)}
                className="flex justify-end"
                onComplete={() => navigate("/")}
              />
            </div>
          </div>
        </div>
        <FormBorder label={"فورم ارزیابی"} childClassName="p-0 mt-0 py-0">
          <TeacherData formData={formData} />
          <QuestionForm formId={formData.id} />
        </FormBorder>
        <p className="text-xs px-5">
          <p>
            <span>توسعه دهنده گان: </span>
            <span>پیمان رسولی و مصطفی زاهدی</span>
          </p>
          <p className="flex flex-wrap gap-1">
            <span>استاد راهنما:</span>
            پوهنیار حامد امیری
          </p>

          <a
            href="https://github.com/Mustafa-Zahedi/Quality-Assurance-System-of-Herat-University"
            className="text-xs text-blue-500 underline"
          >
            سورس کد نسخه فعلی این سیستم در گیت هاب به صورت عمومی و منبع باز به
            دسترس علاقه مندان و محصلین جهت ارتقا و هر گونه تغییر قرار دارد.
          </a>
        </p>
      </div>
    </section>
  );
};

export default Form;
