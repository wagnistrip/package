import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Autoplay ,Pagination } from 'swiper/modules'; // Import Autoplay module
import { useEffect, useState } from 'react';
import { LuClock5 } from "react-icons/lu";
import { carddataoffer } from '../data/staticdata';
import { useNavigate } from 'react-router-dom';

function Newoffer() {
  const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
const navigate = useNavigate();
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
    <div className="lg:px-4 mt-10 sm:mt-20 ">
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
        {carddataoffer.map((data) => (
          <SwiperSlide key={data.id}>
            <Card data={data} navigate={navigate} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Newoffer;

const Card = ({ data,navigate }) => {
  const handleCardClick = () => {
    // Navigate to the blog section with the card title
    navigate(`/hotels/blog/${data.title}`);
  };
    return (
      <div onClick={handleCardClick} className="group relative w-full sm:h-[400px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
        {/* Image */}
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-8 items-center text-center text-white px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-2xl font-bold mb-2">{data.title}</h3>
          <p className="text-sm flex items-center center gap-x-4"><LuClock5 size={18} />{data.date}</p>
        </div>
      </div>
    );
  };
