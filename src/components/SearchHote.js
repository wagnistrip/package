import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import { fetchpackageData } from "../Api/apiService";
const cities = [
  "Agartala",
  "Agatti",
  "Ahmedabad",
  "Aizawl",
  "Ajmer",
  "Amritsar",
];
const SearchHote = () => {
  const today = dayjs().startOf("day").toDate();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState(today);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [showDropdown, setShowDropdown] = useState(null); // "from" | "to" | null
  const [searchValue, setSearchValue] = useState("");
  const [form, setForm] = useState({
    checkInDate: dayjs(today).format("YYYY-MM-DD"),
    adults: 1,
    children: 0,
    rooms: 1,
    from: "New Delhi",
    to: "Goa",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const totalGuests = form.adults + form.children;
    const requiredRooms = Math.ceil(totalGuests / 4) || 1;
    setForm((prev) => ({ ...prev, rooms: requiredRooms }));
  }, [form.adults, form.children]);

  const filteredCities =
    searchValue.trim() === ""
      ? cities // show all cities if input empty
      : cities.filter((city) =>
          city.toLowerCase().includes(searchValue.toLowerCase())
        );

  // Auto focus input when dropdown opens
  useEffect(() => {
    if (showDropdown === "from" || showDropdown === "to") {
      setSearchValue(form[showDropdown]); // prefill input
      inputRef.current?.focus();
    }
  }, [showDropdown]);

  const handleSelectCity = (type, city) => {
    setForm((prev) => ({ ...prev, [type]: city }));
    setShowDropdown(null);
  };

  const increment = (type) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const decrement = (type) => {
    setForm((prev) => ({
      ...prev,
      [type]:
        type === "adults"
          ? Math.max(1, prev.adults - 1)
          : type === "children"
          ? Math.max(0, prev.children - 1)
          : Math.max(1, prev.rooms - 1),
    }));
  };

  const handleOpenDropdown = (type) => {
    setShowDropdown(type);
    setSearchValue(form[type] || ""); // prefill with selected city
  };

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Close Rooms & Guests dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      // Close From dropdown
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target)
      ) {
        if (showDropdown === "from") {
          setShowDropdown(null);
        }
      }

      // Close To dropdown
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target)
      ) {
        if (showDropdown === "to") {
          setShowDropdown(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  function handleBook() {
    console.log("form data => ", form);
    const responseData = form;
    console.log("request data for flight search =>", form);
    localStorage.setItem("form", JSON.stringify(form));
    const queryString = new URLSearchParams(form).toString();
    navigate(`/package-list?${queryString}`, { state: { responseData } });
  }

useEffect(() => {
  const fetchHotels = async () => {
    try {
      // setIsLoading(true);
      // 🔹 Example API call — replace with your real endpoint
      const response = await fetchpackageData("/package/list");
      console.log("response => ",response);
      if(response?.status === 200){
        navigate(`/package-list`, { state: { responseData: response?.packages } });
      }else{
        navigate(`/package-list`, { state: { responseData: response?.packages } });
      };

    } catch (error) {
      console.error("Failed to fetch hotels:", error);
      // setIsLoading(false);
    }
  };

  fetchHotels();
}, []);

  return (
    // <div className='sm:bg-transparent rounded-lg w-full bg-opacity-90 p-6'>
    <div className="bg-[#03274C] w-full flex justify-center py-4">
      <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 px-4 w-full max-w-6xl">
        <div className="flex flex-col bg-[#0C3A60] px-3 py-2 rounded-md flex-1 min-w-[150px] relative">
          <span className="text-xs uppercase tracking-wide text-blue-400">
            Starting From
          </span>
          <span
            className="text-white text-sm font-medium cursor-pointer"
            onClick={() => handleOpenDropdown("from")}
          >
            {form.from}
          </span>

          {showDropdown === "from" && (
            <div
              ref={fromDropdownRef}
              className="absolute top-full left-0 z-30 mt-2 p-2 bg-white rounded shadow max-h-60 overflow-auto w-full"
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Select your origin"
                className="border p-1 w-full mb-2"
              />
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="p-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectCity("from", city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TO SELECTOR */}
        <div className="flex flex-col bg-[#0C3A60] px-3 py-2 rounded-md flex-1 min-w-[150px] relative">
          <span className="text-xs uppercase tracking-wide text-blue-400">
            Destination
          </span>
          <span
            className="text-white text-sm font-medium cursor-pointer"
            onClick={() => handleOpenDropdown("to")}
          >
            {form.to}
          </span>

          {showDropdown === "to" && (
            <div
              ref={toDropdownRef}
              className="absolute top-full left-0 z-30 mt-2 p-2 bg-white rounded shadow max-h-60 overflow-auto w-full"
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Select your destination"
                className="border p-1 w-full mb-2"
              />
              {filteredCities &&
                filteredCities.map((city) => (
                  <div
                    key={city}
                    className="p-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectCity("to", city)}
                  >
                    {city}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Starting Date */}
        <div className="flex flex-col bg-[#0C3A60] px-3 py-2 rounded-md flex-1 min-w-[180px]">
          <span className="text-xs uppercase tracking-wide text-blue-400">
            Starting Date
          </span>
          <span className="text-white text-sm font-medium">
            <DatePicker
              inputClass="custom-input"
              value={checkInDate} // keep as Date object for DatePicker
              onChange={(date) => {
                setCheckInDate(date); // update for UI
                const formattedDate = dayjs(date).format("YYYY-MM-DD"); // only date part
                setForm((prev) => ({ ...prev, checkInDate: formattedDate })); // update API-ready format
              }}
              format="YYYY-MM-DD"
              numberOfMonths={isSmallScreen ? 1 : 2}
              minDate={today}
            />
          </span>
        </div>
        {/* Rooms & Guests */}
        <div
          ref={dropdownRef}
          className="flex flex-col  bg-[#0C3A60] relative px-3 py-2 rounded-md flex-1 min-w-[150px]"
        >
          <span className="text-xs uppercase tracking-wide text-blue-400">
            Rooms & Guests
          </span>
          <span
            onClick={toggleDropdown}
            className="text-white text-sm cursor-default font-medium"
          >
            {form.adults} Adult - {form.children} Child - {form.rooms} Rooms
          </span>
          {isDropdownOpen && (
            <div className="absolute top-full z-30 left-0 mt-2 p-4 bg-white rounded-lg shadow-lg w-full">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Adults</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => decrement("adults")}
                    className="px-2 text-lg"
                  >
                    -
                  </button>
                  <span className="mx-2">{form?.adults}</span>
                  <button
                    type="button"
                    onClick={() => increment("adults")}
                    className="px-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Children</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => decrement("children")}
                    className="px-2 text-lg"
                  >
                    -
                  </button>
                  <span className="mx-2">{form?.children}</span>
                  <button
                    type="button"
                    onClick={() => increment("children")}
                    className="px-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Rooms</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => decrement("rooms")}
                    className="px-2 text-lg"
                  >
                    -
                  </button>
                  <span className="mx-2">{form?.rooms}</span>
                  <button
                    type="button"
                    onClick={() => increment("rooms")}
                    className="px-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Search Button */}
        <button
          onClick={handleBook}
          className="bg-gradient-to-r from-blue-500 w-full md:w-[160px] to-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
    // </div>
  );
};

export default SearchHote;
