import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchHote from "./SearchHote";
import TopNavbar from "./TopNavbar";

const HotelHero = ({ title }) => {
    const location = useLocation();

  // Check if route is homepage
  const isHomePage = location.pathname === "/package-list";
  return (
    <div className="relative sm:h-[250px] h-[22vh] w-full">
      <img
        className="h-full w-full object-cover"
        src="https://admin.wagnistrip.com/public/homepageimg/pagebanner.png"
        alt="HeroImage"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black bg-opacity-90"></div>

      <div className="absolute px-4 sm:px-20 py-10 inset-0 w-full flex flex-col items-center justify-around">
        {/* <div>
       <p className='sm:text-[80px] capitalize font-medium text-5xl allisonfont text-center text-white'>{title}</p> 

      </div> */}
      </div>
      {/* <div className="absolute flex items-center justify-center w-full -bottom-10 right-auto left-auto"> */}
      {isHomePage && (
      <div className="absolute flex items-center justify-center w-full -bottom-[180px] sm:-bottom-10 right-auto left-auto">
        <SearchHote/>
      </div>)}
      {!isHomePage && (
        <div className="absolute flex items-center justify-center w-full -bottom-[180px] sm:-bottom-10 right-auto left-auto">
          <TopNavbar />
        </div>
      )}
    </div>
  );
};

export default HotelHero;
