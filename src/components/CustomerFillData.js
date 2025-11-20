import React from "react";
import { FaEdit } from "react-icons/fa";
const CustomerFillData = ({ setStep, guestInfo }) => {
  console.log("guest data => ", guestInfo);

  return (
    <div className="w-full flex flex-col gap-y-4 border-[1px] border-[#3f8dc9] shadow-md rounded-md p-4">
      <div className="flex items-center justify-between">
        <p className="text-base sm:text-lg font-medium"> Guest Details</p>
        <button className="text-indigo-500 hover:text-indigo-600">
          <FaEdit onClick={() => setStep(1)} size={24} />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10">
        <div className="flex flex-col gap-y-1">
          <p className="text-base sm:text-lg font-medium text-[#0e0e0e]">
            E-mail
          </p>
          <p className="text-sm sm:text-base font-normal text-[#7c7a7a]">
            {(guestInfo && guestInfo?.contactDetails?.email) || ""}
          </p>
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-base sm:text-lg font-medium text-[#0e0e0e]">
            Contact No.
          </p>
          <p className="text-sm sm:text-base font-normal text-[#7c7a7a]">
            {guestInfo?.contactDetails
              ? `${guestInfo.contactDetails.countryCode} ${guestInfo.contactDetails.phone}`
              : ""}
          </p>
        </div>
      </div>
      {guestInfo?.guestData?.map((room, roomIndex) => (
        <div key={roomIndex} className="mb-6">
          {/* Room Heading */}
          <h2 className="font-medium text-lg">Room - {roomIndex + 1}</h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 mt-2">
            {/* Adults Section */}
            <div className="flex flex-col gap-y-1">
              <p className="text-base sm:text-lg font-medium text-[#0e0e0e]">
                {room.adults.length} (Adults)
              </p>

              {room.adults.map((adult, aIndex) => (
                <p
                  key={aIndex}
                  className="text-sm sm:text-base font-normal text-[#7c7a7a]"
                >
                  {adult.title} {adult.firstName} {adult.lastName}
                </p>
              ))}
            </div>

            {/* Children Section */}
            <div className="flex flex-col gap-y-1">
              <p className="text-base sm:text-lg font-medium text-[#0e0e0e]">
                {room.children.length} (Child
                {room.children.length > 1 ? "s" : ""})
              </p>

              {room.children.map((child, cIndex) => (
                <p
                  key={cIndex}
                  className="text-sm sm:text-base font-normal text-[#7c7a7a]"
                >
                  {child.title} {child.firstName} {child.lastName}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerFillData;
