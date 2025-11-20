

import React from 'react';
import homeimg from '../images/hero.jpg';
import SearchHote from './SearchHote';


const Herosection = () => {

 

  return (
    <div className='relative h-screen xl:h-[80vh] w-full'>
      <img className='h-full w-full object-cover' src={homeimg} alt='HeroImage' />
      <div className='absolute inset-0 bg-gradient-to-b from-black bg-opacity-80'></div>

      <div className='absolute px-4 sm:px-20 py-10 inset-0 w-full flex flex-col items-center justify-around'>
        <div>
          <p className='sm:text-[126px] hidden md:flex font-medium text-3xl allisonfont text-center text-white'>
            Book Your Vacation
          </p>
        </div>
       <SearchHote/>
      </div>
    </div>
  );
};

export default Herosection;
