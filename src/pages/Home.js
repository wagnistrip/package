import React from 'react';
import Herosection from '../components/Herosection';
import '../index.css';
import { SlArrowRight } from "react-icons/sl";
import HotelAbout from '../components/HotelAbout';
import Headersection from '../components/Headersection';
import HotelFacitlity from '../components/HotelFacitlity';
import TestimonialSlider from '../components/TestimonialSlider';
import Newoffer from '../components/Newoffer';
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Newletter from '../components/Newletter';
import Ourrooms from '../components/Ourrooms';

function Home() {


  return (
    <div className='w-full flex flex-col sm:gap-y-8 gap-y-4 '>
      <Herosection />
      <div className='lg:px-40 sm:px-6 px-4 pb-8'>

        <HotelAbout />

      </div>


      <div className='min-h-[60vh] bg-[#e6e6e6] lg:px-40 py-10 lg:py-20 px-4'>
        <Headersection title="Our Rooms." des="Experience comfort and luxury in our elegantly designed hotel rooms, featuring modern amenities, plush bedding, and stunning views. Perfect for both relaxation and business stays. Book your stay today!" />
        <Ourrooms />

        <button className=' uppercase mx-auto tracking-widest mt-10 sm:mt-20 text-base font-semibold border-b-[1px] w-fit pr-3 py-1 hover:border-black border-gray-300 flex item' type='button'>View All Rooms <SlArrowRight size={20} /></button>

      </div>



      <div className='lg:px-40 sm:px-6 py-10 lg::py-20 sm:pb-3  px-4'>
        <Headersection title="Hotel Facilities." des="My entire being is overcome with great serenity, similar to these delightful spring mornings that I savor to the fullest." />
      </div>
      <HotelFacitlity />



      <div className='sm:px-40 py-10 sm:py-20 sm:pb-3 relative'>
        <div className='px-4 sm:px-0'>
          <Headersection title="Testimonial" des="My entire being is overcome with great serenity, similar to these delightful spring mornings that I savor to the fullest." />
        </div>
        <div className='flex items-center bg-[#e6e6e6] bg-opacity-40 w-full sm:max-w-6xl h-[57vh] sm:h-[40vh] sm:min-h-[40vh] rounded-lg mt-8 sm:mx-auto justify-center'>

        </div>
        <div className='absolute bottom-20 sm:bottom-5 lg:px-10 left-0 px-4  right-0 h-fit w-full lg:w-[84%] mx-auto'>
          <TestimonialSlider />
        </div>

      </div>



      <div className='lg:px-40 sm:px-6 py-10 sm:py-20 sm:pb-3  px-4'>
        <Headersection title="News & Offers" des="Subscribe to our newsletter for special offers, updates, and insider advice to improve your stay and find fascinating events" />
        <div className='min-h-24   text-white mt-20 w-full items-center justify-center'>
          <Newoffer />
        </div>
      </div>



      <div className='lg:px-40 sm:px-6 py-10 sm:py-20 bg-[#e6e6e6] px-4'>
        <Headersection title="Newsletter" des="Subscribe to our newsletter for exclusive offers, updates, and insider tips to enhance your stay and discover exciting events." />

        <div className='min-h-24 mt-10 text-white flex items-center w-full justify-center'>
          <div className='flex items-center justify-center w-full gap-x-4'>
            <input className='py-3 h-16 md:h-20 px-4 w-full sm:w-[400px] outline-none border-none placeholder:text-base  bg-white text-[#0e0e0e]  shadow-2xl rounded-lg md:rounded-3xl' type="email" placeholder='Your Email Address' />
            <button className='sm:h-20 h-16 w-16 md:p-5 sm:w-20 flex items-center justify-center hover:bg-opacity-50 bg-black hover:text-black text-white rounded-lg md:rounded-3xl'> <FaTelegramPlane className='md:text-5xl text-3xl' /></button>
          </div>
        </div>
        <div className=' mt-10  text-white  w-full items-center justify-center'>
          <Newletter />
        </div>
        <p className='uppercase gap-x-3 flex items-center justify-center text-center mt-8 text-base font-semibold  '><Link className='flex items-center hover:text-opacity-65 text-[#0e0e0e] hover:underline justify-center gap-x-3' to=""><FaInstagram size={20} />Follow us on Instagram </Link></p>
      </div>

    </div>
  )
}


export default Home
 