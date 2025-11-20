import { Link } from "react-router-dom";
import PackageBookingModal from "./PackageBookingModal";
import { useState } from "react";

const HotelBookfare = ({ searchData, title }) => {
  const id = title;
const [open, setOpen] = useState(false);
  const infoFields = [
    { label: "Package", value: searchData?.title },
    {
      label: "Duration",
      value: `${searchData?.duration_nights}N / ${searchData?.duration_days}D`,
    },
    {
      label: "Total Amount",
      value: `${searchData?.total_fare} / person`,
    },
  ];

  return (
    <div className="sm:bg-transparent rounded-lg w-full bg-opacity-90">
      <form className="w-full grid grid-cols-1 gap-x-3 gap-y-2 sm:gap-y-6 items-center justify-center">
        {infoFields.map(({ label, value }, i) => (
          <div
            key={i}
            className="p-3 px-4 sm:px-10 rounded-md sm:h-24 sm:shadow-sm bg-[#f5f5f5]"
          >
            <label className="block text-[#8f8f8f] mb-1 font-semibold">
              {label}
            </label>
            <div className="flex items-center mt-3 text-sm sm:text-base font-semibold justify-between">
              <p>{value || "-"}</p>
            </div>
          </div>
        ))}

        {/* <Link
          className="w-full"
          to={`/packages/${searchData?.title
            ?.toLowerCase()
            ?.replace(/\s+/g, "-")
            ?.replace(/[^\w-]+/g, "")}/checkout`}
            state={{ searchData }}
        > */}
          <button
           onClick={() => setOpen(true)}
            type="button"
            className="uppercase font-semibold sm:h-14 h-10 px-8 bg-blue-100 hover:bg-black hover:text-white transition-all duration-200 hover:bg-gradient-to-br mt-4 sm:mt-0 sm:bg-transparent w-full border-[1px] sm:border-[3px] border-black text-black rounded"
          >
            book now
          </button>
      </form>
      <PackageBookingModal open={open} onClose={() => setOpen(false)} packagedata={searchData}  />
    </div>
  );
};

export default HotelBookfare;
