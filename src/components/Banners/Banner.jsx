import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className="w-2/3 relative container mx-auto px-4 mb-4">
      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg overflow-hidden"
      >
        <SwiperSlide>
          <img src={banner1} className="w-full h-[60vh] object-contain rounded-lg" alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} className="w-full h-[60vh] object-contain rounded-lg" alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} className="w-full h-[60vh] object-contain rounded-lg" alt="Banner 3" />
        </SwiperSlide>
      </Swiper>

      {/* Butoane de navigare */}
      {/* <button className="prev-btn absolute left-40 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full">
        <FaAngleLeft size={24} />
      </button>
      <button className="next-btn absolute right-40 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full">
        <FaAngleRight size={24} />
      </button> */}
    </div>
  );
};

export default Banner;
