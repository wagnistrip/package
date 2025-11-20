import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {Autoplay ,Pagination } from 'swiper/modules'; // Import Autoplay module
import { testimonials } from "../data/staticdata";


const TestimonialSlider = () => {
    const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <div className="py-8 sm:px-4 w-full">
     <Swiper
slidesPerView={WindowWidth <= 768 ? 1 : WindowWidth <= 1024 ? 2 : 2}
spaceBetween={30}
pagination={{ clickable: true }}
// navigation={WindowWidth > 768} // Show navigation only on tablet (769px and above) and laptop screens
modules={[Autoplay,Pagination]}
autoplay={{
  delay: 4000,
  disableOnInteraction: false,
}}
loop={true}
className="mySwiper"
>
{testimonials.map((testimonial) => (
  <SwiperSlide key={testimonial.id} >
    <div className="bg-white   border-[1px] border-[#eeecec] w-full p-4 sm:p-6 rounded-tl-[40px] rounded-br-[40px]">
       
              <div className="flex flex-row gap-x-3 sm:gap-x-8 w-full items-start py-6">
              <div className="flex w-[20%] relative items-center justify-center">
            <img
              className="object-cover w-20 h-20 rounded-full"
              src={testimonial.image}
              alt={testimonial.name}
            />
   <svg className="w-4 h-4 sm:w-8 sm:h-8 absolute -top-2 sm:top-0 -right-2 sm:right-0 rotate-180 text-gray-500 text-opacity-50 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
        </div>
                <div className="w-[80%] flex text-start flex-col">
              <p className="text-[#656565] text-opacity-70 text-base line-clamp-4 sm:text-lg font-medium">{testimonial.quote}</p>
                  <h3 className="font-bold text-lg sm:text-xl mt-8 text-[#313131]">{testimonial.name}</h3>
                  <p className="text-sm font-medium  sm:text-base mt-1 text-opacity-70 text-[#313131]">{testimonial.role}</p>
                </div>
              </div>
            </div>
  </SwiperSlide>
))}
</Swiper>
    </div>
  );
};

export default TestimonialSlider;
