import React from "react";
import { Transition } from "@headlessui/react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <section>
      <Helmet>
        <title>دانشگاه هرات</title>
      </Helmet>
      <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center">
          <div className="block xl:inline">دانشگاه هرات </div>
          <span className="block text-cyan-600 xl:inline">
            کمیته تضمین کیفیت{" "}
          </span>
        </h1>
        <article className="my-10">
          <p>
            کمیته تضمین کیفیت مسئول بررسی کیفیت تدریس در سطح دانشگاه هرات
            میباشد. تهیه گزارشات دقیق مسئولیت اصلی این کمیته بوده تا بررسی و
            مطالعه این گزارشات برای بهبود کیفیت تدریس اقدامات لازم صورت بگیرد
          </p>
          <p>
            سیستم تضمین کیفیت تدریس یک سیستم رسمی میباشد که برای بررسی کیفیت
            تدریس اساتید دانشگاه هرات استفاده میگردد. این سیستم جایگزین خوبی
            برای سیستم ها کاغذی که نیاز به منابع مالی و انسانی بیشتری دارد
            میباشد.
          </p>
        </article>
      </section>
      <footer className="absolute bottom-5">
        <div className="border-t-2 p-3">
          <h6 className="text-xs">
            نسخه اول این سیستم توسط آقای نذیر احمد پارسا در سال ۱۳۹۷ شمسی ساخته
            شده بود که به مدت ۵ سال مورد استفاده قرار گرفت و نسخه فعلی این سیستم
            توسط آقایان پیمان رسولی و مصطفی زاهدی از محصلین برحال فاکولته
            کمپیوترساینس ساخته شده است. سورس کد فعلی این سیستم به صورت عمومی و
            منبع باز در گیت هاب برای علاقه مندان و محصلین سالهای بعد بخاطر ارتقا
            و هرگونه تغییر قرار دارد.
          </h6>
        </div>
      </footer>
    </section>
  );
};

export default Home;
