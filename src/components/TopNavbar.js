import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import flighticons from '../icons/flighticons.png'
import hotelicons from '../icons/hotelicons.png';
import cabicons from '../icons/taxicab.png'
import eventicons from '../icons/eventsicons.png'
import blogicons from '../icons/blogicon.png'
import visaicons from '../icons/visaicon.png'
import contacticons from '../icons/contacticon.png';
import holidaysicons from '../icons/holidaysicon.png'
const TopNavbar = () => {
   const [activeBtn, setActiveBtn] = useState("Flights");
    const location = useLocation();
  
    useEffect(() => {
      if (location.pathname === "/") setActiveBtn("Flights");
      else if (location.pathname === "/hotels") setActiveBtn("Hotels");
      else if (location.pathname === "/visa") {
        window.location.href = "https://visa.wagnistrip.com/";
      } else if (location.pathname === "/events") {
        window.location.href = "https://event.wagnistrip.com/";
      } else if (location.pathname === "/cabs") {
        window.location.href = "https://demo.wagnistrip.com/";
      } else if (location.pathname === "/contact-us") setActiveBtn("Contact");
      else if (location.pathname === "/blogs") setActiveBtn("blogs");
      else setActiveBtn("");
    }, [location]);
  
    return (
      <div className=" w-[60%] lg:w-[50%] hidden md:flex bg-white shadow-sm py-5 px-7 rounded-lg">
        <div className="flex justify-around items-center w-full gap-14 text-center">
          {/* Flight */}
          <Link to="/" className="flex flex-col items-center">
            <img
              src={flighticons}
              alt="Flight"
              className="h-8"
            />
            <p
              className={`text-base ${
                activeBtn === "Flights"
                  ? "text-[var(--main-color)] font-bold"
                  : "text-gray-700 font-normal"
              }`}
            >
              Flight
            </p>
          </Link>

               {/* Holidays */}
          <Link to="/contact-us" className="flex flex-col items-center">
            <img
              src={holidaysicons}
              alt="Flight"
              className="h-8"
            />
            <p
              className={`text-base ${
                activeBtn === "Contact"
                  ? "text-[var(--main-color)] font-bold"
                  : "text-gray-700 font-normal"
              }`}
            >
             Holidays
            </p>
          </Link>
  
          {/* Hotel */}
          {/* <Link to="/hotels" className="flex flex-col items-center">
            <img src={hotelicons} alt="Flight" className="h-8" />
            <p
              className={`text-base ${
                activeBtn === 'Hotels'
                  ? 'text-[var(--main-color)] font-bold'
                  : 'text-gray-700 font-normal'
              }`}
            >
              Hotel
            </p>
          </Link> */}
  
          {/* Event */}
          <Link to="https://www.event.wagnistrip.com/" className="flex flex-col items-center">
            <img
              src={eventicons}
              alt="Flight"
              className="h-8"
            />
            <p
              className={`text-base ${
                activeBtn === "Events"
                  ? "text-[var(--main-color)] font-bold"
                  : "text-gray-700 font-normal"
              }`}
            >
              Event
            </p>
          </Link>
  
          {/* Blog */}
          <Link to="/blogs" className="flex flex-col items-center">
            <img
              src={cabicons}
              alt="Flight"
              className="h-8"
            />
            <p
              className={`text-base ${
                activeBtn === "blogs"
                  ? "text-[var(--main-color)] font-bold"
                  : "text-gray-700 font-normal"
              }`}
            >
              Cabs
            </p>
          </Link>
  
          {/* Blog */}
          <Link to="/contact-us" className="flex flex-col items-center">
            <img
              src={blogicons}
              alt="Flight"
              className="h-8"
            />
            <p
              className={`text-base ${
                activeBtn === "Contact"
                  ? "text-[var(--main-color)] font-bold"
                  : "text-gray-700 font-normal"
              }`}
            >
             Blog
            </p>
          </Link>
  
          {/* Visa */}
          <Link to="https://visa.wagnistrip.com/" className="flex flex-col items-center">
            <img
              src={visaicons}
              alt="Flight"
              className="h-8"
            />
            <p
              className={`text-base ${
                activeBtn === "Visa"
                  ? "text-[var(--main-color)] font-bold"
                  : "text-gray-700 font-normal"
              }`}
            >
              Visa
            </p>
          </Link>


           {/* Contact */}
          {/* <Link to="/contact-us" className="flex flex-col items-center">
            <img
              src={contacticons}
              alt="Flight"
              className="h-8"
            />
            <p
              className={`text-base ${
                activeBtn === "Contact"
                  ? "text-[var(--main-color)] font-bold"
                  : "text-gray-700 font-normal"
              }`}
            >
             Contact
            </p>
          </Link> */}
        </div>
      </div>
    );
}

export default TopNavbar