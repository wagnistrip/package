import React from 'react'
import { Link } from 'react-router-dom'

const NoteFound = () => {
  return (
    <div className='h-screen text-center gap-y-4 flex flex-col justify-center'>
        {/* <img className='h-full w-full' src="https://images.saymedia-content.com/.image/t_share/MjAwNDU1MDkxMzI4MDY2OTM2/react-404-page-template.png" alt="404" /> */}
        <p className='text-5xl sm:text-[100px] font-bold text-[#0e0e0e] text-opacity-40 md:text-[140px] lg:text-[300px]'>404</p>
        <p className='text-lg sm:text-6xl text-[#0e0e0e] text-opacity-90 font-semibold '>Sorry, we couldn't find this page</p>
        <p className='text-lg sm:text-3xl mx-auto w-full md:w-[600px] text-[#0e0e0e] text-opacity-50 font-medium'>But don't warry, you can find plenty of other things on our homepage</p>
        <Link className='w-fit mx-auto' to="/"><button className='bg-indigo-500 py-2.5 px-10 font-medium text-base text-white hover:bg-indigo-600 rounded-md mt-6 w-fit mx-auto'>Back to hompage</button></Link>
    </div>
  )
}

export default NoteFound