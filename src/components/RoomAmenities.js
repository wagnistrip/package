import React from 'react'

const RoomAmenities = ({ amenities, title }) => {
    return (
      <div className="">
        <h2 className="text-lg sm:text-xl  xl:text-2xl text-[#383838] font-medium mb-4 sm:mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center justify-start hover:-translate-y-2 hover:shadow-xl transition-all duration-300 text-[#848484] p-3 py-4 sm:p-8 sm:py-8 border rounded-xl sm:rounded-[20px] shadow-sm"
            >
              <amenity.icon size={24} className="text-2xl mr-2" />
              <span className="text-sm sm:text-base xl:text-lg font-medium">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default RoomAmenities