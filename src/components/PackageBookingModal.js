import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiTrash2, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const PackageBookingModal = ({ open, onClose, packagedata }) => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }]);
  const [selectedDate, setSelectedDate] = useState(null); // dayjs object
  const [showSummary, setShowSummary] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loadingCalculate, setLoadingCalculate] = useState(false);
  const [loadingContinue, setLoadingContinue] = useState(false);

  // VALIDATION RULES
  const validateRoom = (adults, children) => {
    const total = adults + children;

    if (adults > 3) {
      alert("Maximum 3 adults allowed per room.");
      return false;
    }

    if (adults === 3 && children > 1) {
      alert("If 3 adults, only 1 child allowed. Please add another room.");
      return false;
    }

    if (total > 4) {
      alert("Maximum 4 people allowed per room.");
      return false;
    }

    return true;
  };

  // UPDATE ADULT / CHILD COUNT
  const updateCount = (index, field, operation) => {
    setRooms((prev) =>
      prev.map((room, i) => {
        if (i !== index) return room;

        const updatedValue =
          operation === "inc"
            ? room[field] + 1
            : room[field] > 0
            ? room[field] - 1
            : 0;

        const newRoom = { ...room, [field]: updatedValue };

        if (!validateRoom(newRoom.adults, newRoom.children)) return room;

        return newRoom;
      })
    );
  };

  // ADD ROOM
  const addRoom = () => {
    setRooms([...rooms, { adults: 2, children: 0 }]);
  };

  // REMOVE ROOM
  const removeRoom = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  // TOTAL CALCULATION
  const calculateTotal = () => {
    setLoadingCalculate(true);

    let price = 0;
    rooms.forEach((room) => {
      price += room.adults * packagedata?.total_fare;
      price += room.children * packagedata?.total_fare;
    });

    setTimeout(() => {
      setTotalPrice(price);
      setLoadingCalculate(false);
      setShowSummary(true);
    }, 2000);
  };

  const handleBooking = () => {
    setLoadingContinue(true);

    // Calculate total adults & children
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

  const response = {
      noOfAdult: totalAdults,
      noOfChild: totalChildren,
      noOfRoom: rooms || 1,
      totalAmt: totalPrice || 0,
      packageData: packagedata,
    };

    console.log("response => ",response);
    return;

    setTimeout(() => {
      navigate(
        `/packages/${packagedata?.title
          ?.toLowerCase()
          ?.replace(/\s+/g, "-")
          ?.replace(/[^\w-]+/g, "")}/checkout`,
        { state: { response } }
      );
    }, 1500);
  };

  const canCalculate = () => {
    if (!selectedDate) return false;
    return rooms.every((room) => validateRoom(room.adults, room.children));
  };

  useEffect(() => {
    setShowSummary(false);
    setSelectedDate(null);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]">
      <div className="bg-white rounded-xl w-[90%] max-w-3xl p-6 shadow-xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        >
          <IoMdClose />
        </button>

        {/* SCREEN 1 */}
        {!showSummary && (
          <>
            <h2 className="text-[24px] font-bold text-gray-900">
              {packagedata?.title}
            </h2>

            <div className="text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-y-3 text-sm mt-1 gap-x-2 mb-4">
              {packagedata?.itineraries?.map((data, index) => (
                <p key={index}>{data?.title}</p>
              ))}
            </div>

            <hr className="my-4" />

            {/* MUI DATE PICKER */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disablePast
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "medium",
                  },
                }}
              />
            </LocalizationProvider>

            {/* ROOMS */}
            <div className="max-h-[300px] overflow-y-auto pr-2">
            {rooms.map((room, index) => (
              <div key={index} className="mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Room {index + 1}</h3>

                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                  {/* ADULT */}
                  <div>
                    <span className="font-medium text-gray-900">Adult</span>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      (Above 12 years) <FiInfo size={14} />
                    </div>

                    <div className="flex items-center border rounded-lg mt-2 w-[130px]">
                      <button
                        onClick={() => updateCount(index, "adults", "dec")}
                        className="px-3 py-2 text-xl"
                      >
                        –
                      </button>
                      <div className="px-6 py-2 font-semibold">
                        {room.adults}
                      </div>
                      <button
                        onClick={() => updateCount(index, "adults", "inc")}
                        className="px-3 py-2 text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* CHILD */}
                  <div>
                    <span className="font-medium text-gray-900">Child</span>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      (Below 12 years) <FiInfo size={14} />
                    </div>

                    <div className="flex items-center border rounded-lg mt-2 w-[130px]">
                      <button
                        onClick={() => updateCount(index, "children", "dec")}
                        className="px-3 py-2 text-xl"
                      >
                        –
                      </button>
                      <div className="px-6 py-2 font-semibold">
                        {room.children}
                      </div>
                      <button
                        onClick={() => updateCount(index, "children", "inc")}
                        className="px-3 py-2 text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
            {/* ADD ROOM */}
            <button
              onClick={addRoom}
              className="text-blue-600 mt-4 font-medium cursor-pointer"
            >
              + Add Room
            </button>

            {/* CALCULATE BUTTON */}
            <button
              disabled={!canCalculate() || loadingCalculate}
              onClick={calculateTotal}
              className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold flex justify-center items-center
                ${
                  canCalculate() && !loadingCalculate
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
            >
              {loadingCalculate ? (
                <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                "Calculate Amount"
              )}
            </button>
          </>
        )}

        {/* SCREEN 2 */}
        {showSummary && (
          <div className="animate-fadeIn">

            <h2 className="text-[24px] font-bold text-gray-900">
              {packagedata?.title}
            </h2>

            <div className="text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-y-3 text-sm mt-1 gap-x-2 mb-4">
              {packagedata?.itineraries?.map((data, index) => (
                <p key={index}>{data?.title}</p>
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between">
              <p className="font-semibold">Travel Date :</p>
              <p className="font-semibold">
                {selectedDate?.format("DD/MM/YYYY")}
              </p>

              <button
                onClick={() => {
                  setSelectedDate(null);
                  setShowSummary(false);
                }}
                className="text-blue-600 text-sm"
              >
                Change Date
              </button>
            </div>

            <p className="mt-4 font-medium">Total Price</p>
            <p className="text-green-600 text-3xl font-bold">
              ₹ {totalPrice.toLocaleString("en-IN")}
            </p>

            <div className="mt-6 border rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" checked readOnly />
              <div>
                <p className="font-semibold">Full Payment</p>
                <p className="text-red-500 font-semibold text-lg">
                  ₹ {totalPrice.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* CONTINUE BUTTON */}
            <button
              type="button"
              onClick={handleBooking}
              disabled={loadingContinue}
              className="w-full mt-6 border-black border-2 text-black hover:text-white py-3 rounded-md ease-linear duration-200 text-lg font-semibold hover:bg-[#0e0e0e] flex justify-center"
            >
              {loadingContinue ? (
                <div className="animate-spin h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full"></div>
              ) : (
                "Continue Booking"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageBookingModal;
