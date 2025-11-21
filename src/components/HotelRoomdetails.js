import React, { useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const HotelRoomdetails = ({ packagedata }) => {
  console.log("package data => ", packagedata);

  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const inclusionRef = useRef(null);
  const infoRef = useRef(null);

  const scrollToSection = (ref) => {
    const navbarHeight = 85; // adjust to your navbar height
    const offset =
      ref.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-orange-500 text-sm">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}

      {halfStar && <FaStarHalfAlt key="half" />}

      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};
  return (
    <>
      <div className="w-full h-[250px] sm:h-[400px] rounded-3xl overflow-hidden object-contain">
        <img
          className="sm:h-[400px] h-[250px] w-full"
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="select hotel"
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-start">
        <div className="flex flex-col w-3/4 gap-y-2 font-medium text-[#1e1e1e]">
          <div className=" block  lg:flex items-center justify-start gap-x-3">
            <p className="text-xl sm:text-2xl xl:text-[34px]">
              {packagedata?.title}{" "}
            </p>
            <span className="text-base font-medium">
              {packagedata?.duration_nights} nights /{" "}
              {packagedata?.duration_days} days
            </span>
          </div>
          <p className="flex flex-wrap gap-x-2 text-xs sm:text-base xl:text-base text-[#656565] font-normal">
            {packagedata?.itineraries?.map((item, index) => (
              <span key={item.id} className="whitespace-nowrap">
                {item.day}D {item.title}
                {index !== packagedata.itineraries.length - 1 && (
                  <span className="mx-1">|</span>
                )}
              </span>
            ))}
          </p>
        </div>
        <div className="flex flex-col w-1/4 gap-y-2 font-medium text-start lg:text-end text-[#1e1e1e]">
          <p className="text-xl sm:text-2xl xl:text-[28px]">
            From {} ₹{packagedata?.total_fare}
          </p>
          <p className="text-xs sm:text-base xl:text-xl text-[#656565] font-normal text-opacity-80">
            per person
          </p>
        </div>
      </div>
      <hr className="w-full h-[1px] bg-[#656565] bg-opacity-40 border-0 rounded md:my-2" />

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => scrollToSection(overviewRef)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection(itineraryRef)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300"
          >
            Day wise Itinerary
          </button>
          <button
            onClick={() => scrollToSection(inclusionRef)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300"
          >
            Inclusions/Exclusions
          </button>
          <button
            onClick={() => scrollToSection(infoRef)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300"
          >
            Additional Info
          </button>
        </div>

        <hr className="w-full h-[1px] bg-[#656565] bg-opacity-40 border-0 rounded my-3 md:my-4" />
        <section ref={overviewRef} className="scroll-mt-24 py-3 ">
          <div className="bg-white border rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-600 pl-3">
              Package Overview
            </h2>

            {/* Content */}
            <div className="text-gray-700 text-sm sm:text-base xl:text-lg leading-7 sm:leading-8 text-justify">
              <p className="mb-4">{packagedata?.short_description}</p>
              <p className="mb-4">{packagedata?.description}</p>
            </div>
          </div>
        </section>

        <div className="w-full bg-white p-5 rounded-xl shadow-sm border">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-5 w-1 bg-indigo-500 rounded-md"></span>
            Hotel Details
          </h2>

          {/* Card */}

          {
            packagedata && packagedata?.hotels.map((data,index)=>(
          <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 mb-4  rounded-xl border bg-white items-start justify-start">
            {/* Image */}
            <img
              src="https://img.easemytrip.com/roomimages/EMTHOTEL-1083906/23/442670003/6406957.jpg"
              alt="hotel"
              className=" w-full md:w-40 h-28 object-cover rounded-lg"
            />

            <div className="flex flex-col justify-center">
              {/* Name */}
             <div className="flex flex-col md:flex-row gap-y-2 gap-x-3">
               <h3 className="text-lg font-semibold">{data?.name}{" "}</h3>
              <StarRating rating={parseFloat(data?.rating)} />
             </div>

              {/* Subtitle */}
              <p className="text-gray-500 text-sm mt-3 sm:mt-1">
                {data?.address}
              </p>
            </div>
          </div>
            ))
          }
        </div>
      </div>
      <section ref={itineraryRef} className="scroll-mt-24">
        <div className="bg-white border rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6 border-l-4 border-indigo-600 pl-3">
            Day Wise Itinerary
          </h2>

          <div className="relative border-l-2 border-gray-200 ml-6 sm:ml-10">
            {packagedata &&
              packagedata?.itineraries.map((item, index) => (
                <div key={index} className="mb-8 sm:mb-10 relative">
                  {/* Day Circle */}
                  <div className="absolute -left-[28px] sm:-left-[39px] flex flex-col items-center">
                    <div
                      className="bg-indigo-500 text-white font-semibold rounded-full 
                            w-12 h-12 sm:w-16 sm:h-16 
                            flex flex-col justify-center items-center 
                            shadow-md border-4 border-white"
                    >
                      <span className="text-[11px] sm:text-[13px] leading-none">
                        Day
                      </span>
                      <span className="text-lg sm:text-xl font-bold leading-none">
                        {item.day}
                      </span>
                    </div>
                    {index < packagedata?.itineraries.length - 1 && (
                      <div className="h-full w-[2px] sm:w-[3px] bg-gray-300 mt-1"></div>
                    )}
                  </div>

                  {/* Card */}
                  <div className="ml-8 sm:ml-10">
                    <div className="bg-[#E9F4FF] rounded-t-lg px-3 sm:px-4 py-2 font-semibold text-gray-800 border border-gray-200 text-sm sm:text-base">
                      {item.title}
                    </div>
                    <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg px-4 sm:px-5 py-3">
                      <ul className="list-disc pl-4 sm:pl-5 text-gray-700 text-sm sm:text-base leading-6">
                        {/* {item.details.map((detail, i) => ( */}
                        <li>{item?.description}</li>
                        {/* ))} */}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <div>
        <section ref={inclusionRef} className="scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {/* Inclusions Box */}
            <div className="flex-1 bg-green-50 border border-green-200 rounded-lg shadow-sm overflow-hidden">
              <div className="border-l-4 border-green-500 p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Inclusions
                </h2>
                <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {packagedata && packagedata?.inclusions?.length > 0 ? (
                    <ul className="space-y-2 text-gray-700 text-sm">
                      {packagedata?.inclusions.map((item) => (
                        <li key={item.id} className="flex items-start">
                          <span className="text-green-600 mr-2">✔</span>
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No inclusions available.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Exclusions Box */}
            <div className="flex-1 bg-red-50 border border-red-200 rounded-lg shadow-sm overflow-hidden">
              <div className="border-l-4 border-red-500 p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Exclusions
                </h2>
                <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {packagedata && packagedata?.exclusions?.length > 0 ? (
                    <ul className="space-y-2 text-gray-700 text-sm">
                      {packagedata?.exclusions.map((item) => (
                        <li key={item.id} className="flex items-start">
                          <span className="text-red-500 mr-2">✖</span>
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No exclusions available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref={infoRef} className="scroll-mt-24">
          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2 text-blue-700">
              Additional Info
            </h2>
            <p className="text-gray-700 text-sm">
              Here you can put any additional information about the package.
            </p>
          </div>
        </section>
      </div>
      <hr className="w-full h-[1px] bg-[#656565] bg-opacity-40 border-0 rounded md:my-4" />
    </>
  );
};

export default HotelRoomdetails;
