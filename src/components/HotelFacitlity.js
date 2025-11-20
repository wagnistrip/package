import React from 'react'
import { amenities } from '../data/staticdata'
const HotelFacitlity = () => {

  return (
    <>

      <div className='w-full relative h-full md:min-h-[50vh] grid grid-cols-2'>
        <div className=' h-full'></div>
        <div className='bg-[#e6e6e6] bg-opacity-30 rounded-tl-xl h-full'></div>

        <div className='absolute w-full h-full top-0 left-auto right-auto'>
          <div className='w-full h-full flex flex-col py-16 gap-y-10'>
            <div className='w-full hidden sm:flex flex-row items-center justify-center gap-x-20'>
              {amenities.slice(0, 5).map((amenity) => (
                <div key={amenity.id} className='flex flex-col items-center gap-y-8'>
                  <img className='w-20' src={amenity.src} alt={amenity.label} />
                  <p className='text-xs sm:text-base xl:text-xl font-normal'>{amenity.label}</p>
                </div>
              ))}
            </div>
            <div className='w-full hidden sm:flex flex-row items-center justify-center gap-x-20'>
              {amenities.slice(5).map((amenity) => (
                <div key={amenity.id} className='flex flex-col items-center gap-y-8'>
                  <img className='w-20' src={amenity.src} alt={amenity.label} />
                  <p className='text-xs sm:text-base xl:text-xl font-normal'>{amenity.label}</p>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
      <div className='w-full pb-8 sm:hidden grid grid-cols-3 gap-y-8'>
        {amenities.map((amenity, id) => (
          <div key={id} className='flex flex-col items-center gap-y-6'>
            <img className='w-16' src={amenity.src} alt={amenity.label} />
            <p className='text-xs sm:text-base xl:text-xl font-normal'>{amenity.label}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default HotelFacitlity