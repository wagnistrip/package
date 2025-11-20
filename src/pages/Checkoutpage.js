import React, { useState } from "react";
import HotelHero from "../components/HotelHero";
import CustomerFillData from "../components/CustomerFillData";
import GuestDetailsForm from "../components/GuestDetailsForm";
import CheckOuthoteldetails from "../components/CheckOuthoteldetails";
import { useLocation } from "react-router-dom";

const Checkoutpage = () => {
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState([]);
  const location = useLocation();
  const { response } = location.state;
  return (
    <div className="min-h-screen pb-6 w-full">
      <HotelHero title="Payment & Customer Info" />

      <div className="sm:w-[80%] flex flex-col w-full px-4 mt-10 sm:px-0 mx-0 sm:mx-auto">
        {/* Step Progress Indicator */}
        <ol className="flex items-center my-6 w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li
            className={`flex md:w-full items-center text-indigo-600 dark:text-indigo-600 sm:after:content-[''] after:w-full after:h-1 after:border-b ${
              step === 2 || step === 3
                ? "after:border-indigo-500"
                : "after:border-gray-300"
            } after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
          >
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Personal{" "}
              <span className="hidden sm:inline-flex sm:ms-2">details</span>
            </span>
          </li>

          <li
            className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b ${
              step === 3 ? "after:border-indigo-500" : "after:border-gray-300"
            } after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
          >
            <span
              className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-indigo-600 ${
                step === 2 || step === 3 ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              <span
                className={`me-2 ${
                  step === 2 || step === 3 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                {step === 2 || step === 3 ? (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  "2"
                )}
              </span>
              Payment{" "}
              <span className="hidden sm:inline-flex sm:ms-2">details</span>
            </span>
          </li>

          <li
            className={`flex ${
              step === 3 ? "text-indigo-600" : "text-gray-400"
            } items-center`}
          >
            <span
              className={`me-2 ${
                step === 3 ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              {step === 3 ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                "3"
              )}
            </span>
            Confirmation
          </li>
        </ol>

        <div className="w-full items-start flex sm:flex-row flex-col gap-x-6 gap-y-4 justify-between">
          {step === 1 ? (
            <div className="flex flex-col gap-y-6 w-full md:w-3/4">
              <CheckOuthoteldetails />
              <GuestDetailsForm
                setStep={setStep}
                packagedata={response?.noOfRoom}
                existingData={guestInfo}
                setGuestInfo={setGuestInfo}
              />
            </div>
          ) : step === 2 ? (
            <div className="flex flex-col gap-y-6 w-full md:w-3/4">
              <CheckOuthoteldetails />
              <CustomerFillData setStep={setStep} guestInfo={guestInfo} />

              <div className="rounded-lg shadow-sm gap-y-3 sm:flex inline-block justify-between px-4 items-start gap-x-4 sm:items-center py-4 w-full border-[1px] bg-gradient-to-r to-[#f6f6e4] from-[#e3faf2] border-[#c2dac1]">
                <div className="flex flex-row gap-x-3 items-start sm:items-center">
                  <img
                    className="w-10 h-10"
                    src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
                    alt=""
                  />
                  <p className="text-[#000000] font-semibold text-sm sm:text-base">
                    You have to use this wallet amount while login
                  </p>
                </div>
                <button className="w-full sm:w-fit items-center mt-4 text-nowrap sm:mt-0 justify-center bg-indigo-500 hover:bg-indigo-600 rounded-full flex py-1.5 text-xs sm:text-sm font-bold text-white px-4">
                  Log In
                </button>
              </div>

              <div className="rounded-lg shadow-sm gap-y-3 sm:flex inline-block justify-between px-4 items-start gap-x-4 sm:items-center py-4 w-full">
                <div className="flex flex-row gap-x-3 items-start sm:items-center">
                  <p className="text-[#000000] font-semibold text-sm sm:text-base">
                    Total Amt of checkout
                  </p>
                </div>

                <div className="flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => setStep(step - 1)}
                    type="button"
                    className="text-sm w-full font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => setStep(step + 1)}
                    className="w-full sm:w-fit items-center mt-4 text-nowrap sm:mt-0 justify-center bg-orange-500 hover:bg-orange-600 rounded-md flex py-1.5 text-xs sm:text-sm font-bold text-white px-4"
                  >
                    Pay ₹4300
                  </button>
                </div>
              </div>
            </div>
          ) : step === 3 ? (
            <div className="w-full items-center justify-center h-[60vh] flex">
              <h2 className="text-xl font-semibold text-green-600">
                ✅ Payment Successful! Booking Confirmed.
              </h2>
            </div>
          ) : null}

          {(step === 1 || step === 2) && (
            <div className="min-h-60 w-full md:w-1/4">
              <HotelPriceSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkoutpage;

// ============ SIDE COMPONENT ===============
const HotelPriceSummary = () => {
  return (
    <div className="shadow-sm border overflow-hidden w-full">
      {/* Header */}
      <div className="flex bg-indigo-600 text-white items-center border-b-[1px] px-4 py-2">
        <span className="text-xl font-bold">₹</span>
        <span className="ml-2 text-sm sm:text-base font-semibold">
          Room Price Details
        </span>
      </div>

      {/* Room Details */}
      <div className="mt-4 px-4">
        <div className="flex text-base sm:text-sm border-b border-gray-300 pb-2 font-semibold justify-between">
          <span>1 Room x 1 Night</span>
          <span>₹ 2538</span>
        </div>
      </div>

      {/* Total Discount */}
      <div className="mt-2 px-4">
        <div className="flex justify-between text-sm border-b border-gray-300 pb-2">
          <div className="flex items-center">
            <span className="text-[#2196f3] cursor-pointer">
              Total Discount
            </span>
            <span className="ml-1 text-gray-500" title="Discount Information">
              ℹ️
            </span>
          </div>
          <span className="text-red-500 font-semibold">- ₹ 1065</span>
        </div>
      </div>

      {/* Price After Discount */}
      <div className="mt-2 px-4">
        <div className="flex justify-between text-sm border-b border-gray-300 pb-2">
          <span>Price after Discount</span>
          <span className="font-semibold">₹ 1473</span>
        </div>
      </div>

      {/* Taxes & Service Fees */}
      <div className="mt-2 text-sm border-b border-gray-300 pb-2 px-4">
        <div className="flex justify-between">
          <span>Taxes & Service Fees</span>
          <span className="font-semibold">₹ 202</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="px-4 py-3 border-gray-400">
        <div className="flex justify-between">
          <span className="font-semibold text-lg">Grand Total</span>
          <span className="font-bold text-red-600 text-lg">₹ 1675</span>
        </div>
      </div>
    </div>
  );
};
