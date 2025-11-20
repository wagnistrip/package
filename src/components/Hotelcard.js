import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Autoplay ,Pagination } from 'swiper/modules'; // Import Autoplay module
import { useEffect, useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { cardda } from '../data/staticdata';

function Hotelcard() {
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
    <div className="px-4 mt-10 sm:mt-20 sm:px-28">
           <Swiper
        slidesPerView={WindowWidth <= 768 ? 1 : WindowWidth <= 1024 ? 2 : 3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={WindowWidth > 768} // Show navigation only on tablet (769px and above) and laptop screens
        modules={[Navigation, Autoplay,Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {cardda.map((data) => (
          <SwiperSlide key={data.id}>
            <Card data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hotelcard;

function Card({ data }) {
  return (
    <div className="flex cursor-pointer bg-white flex-col rounded-lg">
      <div className="flex relative w-full overflow-hidden rounded-tl-lg rounded-tr-lg h-[30vh]">
        <img
          className="w-full h-full"
          src="https://plus.unsplash.com/premium_photo-1678297269980-16f4be3a15a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="img here"
        />
        <div className="w-fit absolute bottom-4 left-4 p-3 rounded-md bg-opacity-40 bg-[#000000] text-white">
          <p className="text-xs sm:text-2xl font-bold">
            From <strike className="text-[10px] font-normal text-white text-opacity-80 sm:text-base">$250</strike> $200{' '}
            <span className="text-[10px] text-white font-normal text-opacity-80 sm:text-base">/ night</span>
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-y-4 sm:gap-y-6 sm:p-10 text-[#0e0e0e]">
        <h3 className="text-xl font-semibold sm:text-2xl text-[#0e0e0e] text-start hover:text-[#a7a6a6] cursor-pointer xl:text-4xl">
          {data.name}
        </h3>
        <div className="flex text-sm sm:text-xl text-[#848484] items-center justify-start gap-x-10">
          <div className="flex items-center justify-start gap-x-2">
            <p>1 King Bed</p>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <p>4 guests</p>
          </div>
        </div>
        <button
          className="uppercase tracking-widest text-base font-semibold border-b-[1px] w-fit pr-3 py-1 hover:border-black border-gray-300 flex item"
          type="button"
        >
          Book now <SlArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
