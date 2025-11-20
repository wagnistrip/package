import React from 'react'

const Headersection = ({title,des}) => {
  return (
    <div className='flex items-center justify-center flex-col'> 
     <p className='text-6xl sm:text-[52px] xl:text-[80px] w-fit allisonfont  custom-border font-normal  text-center'>{title}</p>
    <p className='text-base font-normal text-[#898989] w-full text-center mx-auto mt-10 sm:w-[400px]  lg:w-[700px] sm:text-lg xl:text-xl'>{des}</p>
</div>
  )
}

export default Headersection