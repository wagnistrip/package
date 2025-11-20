import React, { useEffect, useState } from "react";
import HotelHero from "../components/HotelHero";
import { MdRadioButtonChecked } from "react-icons/md";
import {
  FaTv,
  FaWifi,
  FaLock,
  FaShower,
  FaPhone,
  FaWind,
  FaThermometerHalf,
  FaRegGrinBeamSweat,
} from "react-icons/fa";
import {
  FaDumbbell,
  FaParking,
  FaSpa,
  FaUtensils,
  FaConciergeBell,
  FaSwimmingPool,
  FaHotel,
} from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import HotelReviewroom from "../components/HotelReviewroom";
import RoomAmenities from "../components/RoomAmenities";
import HotelBookfare from "../components/HotelBookfare";
import Hotelequiry from "../components/Hotelequiry";
import HotelRoomdetails from "../components/HotelRoomdetails";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import PackageDetailsSkeleton from "../utils/api";

const hotelAmenities = [
  { icon: FaDumbbell, name: "Gym" },
  { icon: FaParking, name: "Parking" },
  { icon: FaSpa, name: "Spa" },
  { icon: FaUtensils, name: "Restaurant" },
  { icon: FaConciergeBell, name: "Room Service" },
  { icon: FaSwimmingPool, name: "Swimming Pool" },
  { icon: FaHotel, name: "24 Hour Concierge" },
  { icon: MdLocalLaundryService, name: "In-house Laundry" },
];

const amenities = [
  { icon: FaTv, name: "TV" },
  { icon: FaWifi, name: "Free Wifi" },
  { icon: FaLock, name: "Safe" },
  { icon: FaShower, name: "None Smoking" },
  { icon: FaWind, name: "Air Conditioning" },
  { icon: FaThermometerHalf, name: "Heater" },
  { icon: FaPhone, name: "Phone" },
  { icon: FaRegGrinBeamSweat, name: "Hair Dryer" },
];

const HotelDetailspage = () => {
  const [active, setActive] = useState("hotelDetails");
  const location = useLocation();
  const { pkg } = location.state || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full">
      <HotelHero title="Luxury Suite" />
      <Navbar />
      {loading ? (
        <div className=" mx-auto sm:w-[90%] px-3  lg:px-40 mt-1 sm:mt-10">
        <PackageDetailsSkeleton />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row w-full mx-auto gap-y-8 sm:w-[90%] gap-x-3 lg:gap-x-10  px-4 sm:px-2 lg:px-24 xl:px-40 py-6 sm:py-10 mt-1 sm:mt-10">
            <div className="sm:w-[70%] w-full flex flex-col gap-y-6 sm:gap-y-10">
              <HotelRoomdetails packagedata={pkg} />
              <RoomAmenities amenities={amenities} title="Room Amenities" />
              <RoomAmenities
                amenities={hotelAmenities}
                title="Hotel Amenities"
              />

              <hr className="w-full h-[1px] bg-[#656565] bg-opacity-40 border-0 rounded md:my-4" />

              <div>
                <h3 className="text-base sm:text-xl xl:text-2xl font-medium text-[#383838] mb-8">
                  Hotel Rules
                </h3>
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-row gap-x-2 items-center ">
                    <MdRadioButtonChecked size={20} />{" "}
                    <label className="text-sm sm:text-base xl:text-lg text-[#656565]">
                      Smoking not allowed
                    </label>
                  </div>
                  <div className="flex flex-row gap-x-2 items-center ">
                    <MdRadioButtonChecked size={20} />{" "}
                    <label className="text-sm sm:text-base xl:text-lg text-[#656565]">
                      Pets not allowed
                    </label>
                  </div>
                  <div className="flex flex-row gap-x-2 items-center ">
                    <MdRadioButtonChecked size={20} />{" "}
                    <label className="text-sm sm:text-base xl:text-lg text-[#656565]">
                      Swimming pool closed from 8.00pm - 6.00am
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-[30%]  w-full h-fit gap-y-6 flex flex-col">
              <div className="grid grid-cols-2 justify-around items-center text-sm sm:text-base xl:text-lg  font-semibold  gap-x-6 text-center">
                <div
                  onClick={() => setActive("hotelDetails")}
                  className={`py-2 ${
                    active === "hotelDetails"
                      ? "border-b-2 border-black text-[#000000]"
                      : "border-b-0 text-[#bebebe]"
                  } cursor-pointer`}
                >
                  <p className="">Book Your Room</p>
                </div>
                <div
                  onClick={() => setActive("enquiry")}
                  className={`py-2 ${
                    active === "enquiry"
                      ? "border-b-2 border-black text-[#000000]"
                      : "border-b-0 text-[#bebebe]"
                  } cursor-pointer`}
                >
                  <p className="">Enquiry</p>
                </div>
              </div>
              {active === "hotelDetails" && (
                <HotelBookfare searchData={pkg} title={pkg?.title} />
              )}
              {active === "enquiry" && <Hotelequiry packagedata={pkg} />}
            </div>
          </div>

          <div className="sm:h-[30%] sm:w-[74%] w-full h-full sm:mx-auto flex items-center justify-center">
            <HotelReviewroom />
          </div>
        </>
      )}
    </div>
  );
};

export default HotelDetailspage;
