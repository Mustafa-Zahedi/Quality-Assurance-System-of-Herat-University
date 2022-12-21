import React from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <section className="relative min-h-[90vh] h-full">
      <Helmet>
        <title>دانشگاه هرات</title>
      </Helmet>
      <section className="relative font-vazirBold p-2 md:p-5 lg:p-10 w-full">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center">
          <div className="block xl:inline">دانشگاه هرات </div>
          <span className="block text-cyan-600 xl:inline">
            کمیته تضمین کیفیت{" "}
          </span>
        </h1>
        <article className="my-10">
          <p>
            کمیته تضمین کیفیت مسئول بررسی کیفیت تدریس در سطح دانشگاه هرات
            میباشد. تهیه گزارشات دقیق مسئولیت اصلی این کمیته بوده تا با بررسی و
            مطالعه این گزارشات برای بهبود کیفیت تدریس اقدامات لازم صورت بگیرد.
          </p>
          <p>
            سیستم تضمین کیفیت تدریس یک سیستم رسمی میباشد که برای بررسی کیفیت
            تدریس اساتید دانشگاه هرات استفاده میگردد. این سیستم جایگزین مناسبی
            برای سیستم های کاغذی که نیاز به منابع مالی و انسانی بیشتری دارد
            میباشد.
          </p>
          <p>
            نسخه اول این سیستم توسط آقای نذیر احمد پارسا در سال ۱۳۹۷ شمسی ساخته
            شده بود که به مدت ۵ سال مورد استفاده قرار گرفت اما بنابر بعضی مشکلات
            که داشت نیاز به بروزرسانی و ارتقا داشت و نسخه فعلی این سیستم به همین
            جهت توسط آقایان پیمان رسولی و مصطفی زاهدی از محصلین برحال فاکولته
            کمپیوترساینس ساخته شده است. سورس کد فعلی این سیستم در گیت هاب به
            صورت عمومی و منبع باز به دسترس علاقه مندان و محصلین سالهای بعد جهت
            ارتقا و هرگونه تغییر قرار دارد.
            <span className="px-2 text-xs text-blue-500 underline">
              <a href="https://github.com/Mustafa-Zahedi/Quality-Assurance-System-of-Herat-University">
                آدرس گیت هاب پروژه
              </a>
            </span>
          </p>
        </article>
      </section>
    </section>
  );
};

export default Home;
