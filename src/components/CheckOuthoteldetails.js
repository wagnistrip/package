import React, { useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import { GoDot } from "react-icons/go";
import AddIcon from "@mui/icons-material/Add";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import RemoveIcon from "@mui/icons-material/Remove";

const CheckOuthoteldetails = ({ data }) => {
    console.log("data => ", data);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [view, setViews] = useState(false);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    const convertToJSDate = (ddmmyyyy) => {
        const [day, month, year] = ddmmyyyy.split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const getEndDate = (startDate, days) => {
        const end = new Date(startDate);
        end.setDate(end.getDate() + days);
        return end;
    };



    const startDateString = data?.packageDate;
    const durationDays = data?.packageData?.duration_days;

    // Convert to JS date
    const startDate = convertToJSDate(startDateString);

    // Calculate end date
    const endDate = getEndDate(startDate, durationDays);

    // Format final dates
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);


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
        <div className='rounded-md overflow-hidden bg-white border-[1px] border-gray-200'>
            <div className='p-4'>
                <p className='font-semibold text-[#333333] text-lg sm:text-xl xl:text-2xl flex items-center justify-start mr-2'>{data && data?.packageData && data?.packageData?.title}</p>
                <p className='text-sm font-normal sm:text-sm xl:text-base text-opacity-70 text-[#8c8a8a]'>{data?.packageData?.itineraries?.map((item, index) => (
                    <span key={item.id} className="whitespace-nowrap">
                        {item.day}D {item.title}
                        {index !== data?.packageData?.itineraries.length - 1 && (
                            <span className="mx-1">|</span>
                        )}
                    </span>
                ))}</p>
            </div>

            <div className='w-full mt-6 flex flex-col p-4 gap-y-6 sm:flex-row  gap-x-6'>
                <img className='w-full sm:w-80 sm:h-80 rounded-lg' src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <div className='flex flex-col w-full gap-y-4'>
                    <div className='rounded-lg shadow-sm grid grid-cols-2 sm:grid-cols-3 w-full gap-y-4 p-4  bg-[#eef7fe]'>
                        <div className='flex flex-col text-[#627686] gap-y-1 text-xs sm:text-sm '>
                            <p>Package Start</p>
                            <p className='text-[#000000] font-semibold text-base sm:text-lg'>{formattedStart}</p>

                        </div>

                        <div className='flex flex-col text-[#627686] text-center gap-y-1 text-xs sm:text-sm '>
                            <p>Duration </p>
                            <p className='text-[#000000] font-semibold text-base sm:text-lg'>{data.packageData.duration_nights}N</p>

                        </div>
                        <div className='flex flex-col text-[#627686] text-start lg:text-end gap-y-1 text-xs sm:text-sm '>
                            <p>Package End</p>
                            <p className='text-[#000000] font-semibold text-base sm:text-lg'>{formattedEnd}</p>

                        </div>
                    </div>
                    <div className='rounded-lg shadow-sm gap-y-3 flex py-4 flex-col w-full border-[1px] border-[#3f8dc9]'>
                        <div className='flex flex-col px-4'>
                            <p className='text-[#000000] font-semibold text-sm sm:text-base'>{data && data?.packageData && data?.packageData?.title}</p>
                            <p className='text-xs sm:text-sm text-[#3f3f3f]'>Duration : <strong>{data && data?.packageData && data?.packageData?.duration_nights}Nights / {data && data?.packageData && data?.packageData?.duration_days}Days</strong></p>
                            <p className='text-xs sm:text-sm text-[#3f3f3f]'>No of Travellers : <strong>{data?.noOfAdult + data?.noOfChild}</strong></p>
                            <p className='text-xs sm:text-sm text-[#3f3f3f]'>No of Rooms : <strong>{data?.noOfRoom?.length}</strong></p>
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='text-[#000000] font-semibold text-xs sm:text-sm'>Cancellation Policy</p>
                            <p className='text-xs sm:text-sm text-[#3f3f3f]'>Booking is Non Refundable</p>
                        </div>
                        <button onClick={() => setViews(!view)} type='button' className='cursor-pointer w-fit hover:underline ml-4 text-[#2196f3] hover:text-[#458cc5]'>View More</button>

                        {
                            view && (
                                <div className="w-full bg-white p-5">
                                    {/* Title */}
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <span className="h-5 w-1 bg-blue-500 rounded-md"></span>
                                        Hotel Details
                                    </h2>

                                    {/* Card */}

                                    {
                                        data?.packageData && data?.packageData?.hotels.map((data, index) => (
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
                            )
                        }

                        <div className='w-full px-4 border-t-[1px]'>
                            <p className='text-xs sm:text-sm font-normal text-[#159d23] pt-2'>Booking is Non Refundable</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-[#f7fbff] border rounded-tr-none">

                {/* Inclusions */}
                <Accordion
                    expanded={open1}
                    onChange={() => setOpen1(!open1)}
                    sx={{
                        boxShadow: "none",
                        borderBottom: "1px solid #e0e0e0",
                        background: "transparent",
                    }}
                >
                    <AccordionSummary
                        expandIcon={open1 ? <RemoveIcon /> : <AddIcon />}
                    >
                        <Typography className="text-[16px] font-semibold">
                            Inclusions
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <ul className="space-y-2">
                            {data && data?.packageData && data?.packageData?.inclusions?.map((item) => (
                                <li key={item.id} className="flex gap-2 text-[14px] text-gray-700">
                                    <span><GoDot /></span>
                                    <span>{item.description}</span>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>

                {/* Exclusions */}
                <Accordion
                    expanded={open2}
                    onChange={() => setOpen2(!open2)}
                    sx={{
                        boxShadow: "none",
                        borderBottom: "1px solid #e0e0e0",
                        background: "transparent",
                    }}
                >
                    <AccordionSummary
                        expandIcon={open2 ? <RemoveIcon /> : <AddIcon />}
                    >
                        <Typography className="text-[16px] font-semibold">
                            Exclusions
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <ul className="space-y-2">
                            {data && data?.packageData && data?.packageData?.exclusions?.map((item) => (
                                <li key={item.id} className="flex gap-2 text-[14px] text-gray-700">
                                    <span><GoDot /></span>
                                    <span>{item.description}</span>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default CheckOuthoteldetails