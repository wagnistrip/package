import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { fetchpackageData } from "../Api/apiService";
const SearchHote = () => {
  const today = dayjs().startOf("day").toDate();
  const [searchdata, setSearchdata] = useState([]);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [form, setForm] = useState({
    checkInDate: dayjs(today).format("YYYY-MM-DD"),
    adults: 1,
    children: 0,
    rooms: 1,
    from: "New Delhi",
    to: "Goa",
  });

  const dropdownRef = useRef(null);
  const originList = [
    ...new Set(searchdata.map((item) => item.origin).filter(Boolean)),
  ];

  const destinationList = [
    ...new Set(searchdata.map((item) => item.destination).filter(Boolean)),
  ];

 
  const filteredCities =
    searchValue.trim() === ""
      ? showDropdown === "from"
        ? originList
        : destinationList
      : showDropdown === "from"
      ? originList.filter((city) =>
          city.toLowerCase().includes(searchValue.toLowerCase())
        )
      : destinationList.filter((city) =>
          city.toLowerCase().includes(searchValue.toLowerCase())
        );


  const handleSelectCity = (type, city) => {
    setForm((prev) => ({ ...prev, [type]: city }));
    setShowDropdown(null);
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
        // setIsDropdownOpen(false);
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
        const response = await fetchpackageData("/package/list");
        console.log("response => ", response);
        if (response?.status === 200) {
          setSearchdata(response && response?.origins);
          navigate(`/package-list`, {
            state: { responseData: response?.packages },
          });
        } else {
          navigate(`/package-list`, {
            state: { responseData: response?.packages },
          });
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
        // setIsLoading(false);
      }
    };

    fetchHotels();
  }, [navigate]);

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
