import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { newletterdata } from '../data/staticdata';

function Newletter() {
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
    <div className="px-4 lg:px-10">
           <Swiper
        slidesPerView={WindowWidth <= 768 ? 1 : WindowWidth <= 1024 ? 3 : 6}
        spaceBetween={0}

        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {newletterdata.map((data) => (
          <SwiperSlide key={data.id}>
            <Card data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Newletter;

const Card = ({ data }) => {
    return (
      <div className="group w-full sm:h-[300px] overflow-hidden shadow-lg">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover cursor-pointer transform transition-transform duration-500 group-hover:scale-110"
        />
       
      </div>
    );
  };



  

