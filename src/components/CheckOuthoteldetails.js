import React from 'react'
import { IoIosStar } from 'react-icons/io'

const CheckOuthoteldetails = () => {
    return (
        <>
            <div className='flex flex-row items-center text-[#d87753]'> <p className='font-semibold text-[#333333] text-lg sm:text-xl xl:text-2xl flex items-center justify-start mr-2'>Inaara Hotel</p><IoIosStar /><IoIosStar /><IoIosStar /></div>
            <p className='text-sm font-normal sm:text-sm xl:text-base text-opacity-70 text-[#8c8a8a]'>4 & 4A, Hesarghatta Rd, Beside Nrr Hospital, Geleyara Balaga Layout, Jalahalli West, Bengaluru, Karnataka 560090</p>

            <div className='w-full mt-6 flex flex-col gap-y-6 sm:flex-row  gap-x-6'>
                <img className='w-full sm:w-80 sm:h-80 rounded-lg' src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <div className='flex flex-col w-full gap-y-4'>
                    <div className='rounded-lg shadow-sm grid grid-cols-2 sm:grid-cols-3 w-full gap-y-4 p-4  bg-[#eef7fe]'>
                        <div className='flex flex-col text-[#627686] gap-y-1 text-xs sm:text-sm '>
                            <p>Package Commencement</p>
                            <p className='text-[#000000] font-semibold text-base sm:text-lg'>Thu, Oct 23, 2025</p>

                        </div>
                        <div className='flex flex-col text-[#627686] gap-y-1 text-xs sm:text-sm '>
                            <p>Package Conclusion</p>
                            <p className='text-[#000000] font-semibold text-base sm:text-lg'>Sun, Oct 26, 2025</p>

                        </div>
                        <div className='flex flex-col text-[#627686] gap-y-1 text-xs sm:text-sm '>
                            <p>Guest</p>
                            <p className='text-[#000000] font-semibold text-base sm:text-lg'>1 Room | 4D/3N</p>

                        </div>
                    </div>
                    <div className='rounded-lg shadow-sm gap-y-3 flex py-4 flex-col w-full border-[1px] border-[#3f8dc9]'>
                        <div className='flex flex-col px-4'>
                            <p className='text-[#000000] font-semibold text-sm sm:text-base'>Room Type: Day Use Room (Check In 9am - Check Out 5pm) (8 Hours stay between 09:00 to 17:00)</p>
                            <p className='text-xs sm:text-sm text-[#3f3f3f]'>Room Only</p>
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='text-[#000000] font-semibold text-xs sm:text-sm'>Cancellation Policy</p>
                            <p className='text-xs sm:text-sm text-[#3f3f3f]'>Booking is Non Refundable</p>
                        </div>
                        <button type='button' className='cursor-pointer w-fit hover:underline ml-4 text-[#2196f3] hover:text-[#458cc5]'>View More</button>

                        <div className='w-full px-4 border-t-[1px]'>
                            <p className='text-xs sm:text-sm font-normal text-[#159d23] pt-2'>Booking is Non Refundable</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CheckOuthoteldetails