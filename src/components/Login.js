

import { Label, Modal } from "flowbite-react";
import { useState,useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import { newsletdata } from "../data/staticdata";
import { LuMoveLeft } from "react-icons/lu";
import { MuiOtpInput } from 'mui-one-time-password-input';
import {  Box } from '@mui/material';
const Login = ({openModal,setOpenModal}) => {
  const [otp, setOtp] = useState('');
  const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  return (
    // <div className="h-screen flex items-center justify-center">
    //   <Button className="text-black" onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal className="p-0 w-full" show={openModal}  popup onClose={() => setOpenModal(false)} >
        <div className="w-full">
        
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:w-[900px] bg-white rounded-lg overflow-hidden">
            <div className="h-[30vh] inline-block justify-end items-center">
  
        <Swiper
        slidesPerView={WindowWidth <= 768 ? 1 :1}
        spaceBetween={0}
        pagination={{ clickable: true }}
        modules={[Autoplay,Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {newsletdata.map((data) => (
          <SwiperSlide key={data.id}>
            <Card data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
            </div>
            <div className="space-y-4  shadow-xl shadow-gray-500 py-3 px-1 sm:px-6 pb-6 rounded-tl-2xl rounded-br-lg">
              <div className={`w-full items-center ${step=== 1 ?'justify-end':'justify-between'} flex `}>
                {
                    step===2 && (
                        <button onClick={() => setStep(step-1)}><LuMoveLeft size={20} /></button>
                    )
                }
                <button onClick={() => setOpenModal(false)} className="p-2 rounded-md border bg-gray-100 hover:bg-indigo-500 hover:text-white"><RxCross2 size={20} /></button>
              </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Login or Create an account</h3>
            {
                step===1 ? (
                    <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Your email" />
                    </div>
                    <input className="outline-none focus:ring-0 border w-full py-2.5 px-5 rounded-lg placeholder:text-gray-400" id="email"  placeholder="Email ID or Mobile Number" required />
                  </div> 
                ):(
                //     <div>
                //     <div className="mb-2 block">
                //       <Label htmlFor="password" value="Your password" />
                //     </div>
                //     <input className="outline-none focus:ring-0 border w-full py-2.5 px-5 rounded-lg placeholder:text-gray-400" id="password" type="password" placeholder="Password" required />
                //   </div>
                <Otpvalidation otp={otp} handleChange={handleChange}/>

                )
            }
          
          
            <div className="w-full">
            {
                step===1 ? (
                  <button onClick={() => setStep(step+1)} className="w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-2.5 px-5">Continue</button>
                ) : (
                  <button onClick={() => setOpenModal(false)} className="w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-2.5 px-5">Login</button>
                )
              }
            </div>
            {/* <p className="text-sm font-semibold cursor-pointer text-center" >Login with otp</p> */}
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
             <p>By logging in, I understand & agree to Wagnistrip terms of use and privacy policy</p>
            </div>
          </div>
          </div>
        </div>
      </Modal>
    // </div>
  );
}
export default Login

const Card = ({ data }) => {
  return (
    <div className="group w-full h-[30vh] sm:h-[38vh] overflow-hidden shadow-lg">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-full object-cover cursor-pointer transform transition-transform duration-500 group-hover:scale-110"
      />
     
    </div>
  );
};



const Otpvalidation = ({otp,handleChange}) => {
  // const [otp, setOtp] = React.useState('');
  
  // const handleChange = (newValue) => {
  //   setOtp(newValue);
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
      }}
    >
      <p className='text-sm text-start font-semibold text-[#0e0e0e] text-opacity-70 mb-2'>
        Enter OTP sent to the email 
        <span className='font-bold text-[#0e0e0e] text-opacity-90'>
          gupta@gmail.com
        </span>
      </p>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        length={6}
        inputStyle={{
          padding: 0,
          width: '40px', 
          height: '40px', 
          fontSize: '16px', 
          margin: '0', 
        }}
        inputProps={{
          style: {
            textAlign: 'center', 
          },
        }}
      />
    </Box>
  );
};
