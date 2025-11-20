import React from 'react'
import { SlArrowRight } from "react-icons/sl";
const HotelAbout = () => {
  return (
    <>
    <div className='w-full grid grid-cols-1 text-[#0a0a0a] py-8 lg:grid-cols-2 gap-x-8 gap-y-20'>
        <div className='flex flex-col gap-y-10'>
          <div className='flex flex-row gap-x-20'>
          <p className='text-xl sm:text-2xl xl:text-[54px] font-medium'>5 <span className='text-xs  font-normal sm:text-sm xl:text-2xl'>stars</span></p>
          <p className='text-xl sm:text-2xl xl:text-[54px] font-medium'>25 <span className='text-xs font-normal  sm:text-sm xl:text-2xl'>Hotels</span></p>
          </div>
          
            <div>
            <h3 className='linehight tracking-widest w-full sm:w-[560px]'>At our highly regarded hotel, enjoy luxury at its best with breathtaking views top-notch amenities, and first-rate service.</h3>
            </div>

            <button className=' uppercase text-base font-semibold border-b-[1px] w-fit pr-3 py-1 hover:border-black border-gray-300 flex item' type='button'>More About US <SlArrowRight size={20} /></button>
            
        

        </div>

        <div >
          <img className='sm:h-[600px] h-full rounded-[40px] -z-20 rounded-tr-none' src="https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img here" />

        </div>
    </div>
    <div className='w-full h-[25vh] sm:h-[70vh] relative inset-0 z-0'>
      <img className='absolute bottom-5  sm:bottom-20 sm:w-[90%] w-full mx-auto left-0 right-0' src={""} alt="hotelst" />
    </div>
  </>
  )
}

export default HotelAbout