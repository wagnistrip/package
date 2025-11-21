import HotelHero from "../components/HotelHero";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import RoomCard from "../components/RoomCard";
import { Slider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Skelton from "../components/Skelton";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { applySortFilter } from "../utils/api";
import TablePaginationDemo from "../components/Login";
const filters = [
  "Duration (in Nights)",
  "Flights",
  "Budget (per person)",
  "Hotel Category",
  "Cities",
  "Themes",
  "Package Type",
  "Premium Packages",
];
const hotelCategories = [
  { label: "3 Star", count: 12 },
  { label: "4 Star", count: 8 },
  { label: "5 Star", count: 5 },
];
const allCities = [
  { label: "Mumbai", count: 5 },
  { label: "Delhi", count: 8 },
  { label: "Goa", count: 12 },
  { label: "Haridwar", count: 3 },
  { label: "Kedarnath", count: 2 },
  { label: "Rishikesh", count: 4 },
  { label: "Guptkashi", count: 3 },
];
const options = [
  "Popular",
  "Price - Low to High",
  "Price - High to Low",
  "Duration - Low to High",
  "Duration - High to Low",
];
const HotelListpage = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
  const [duration, setDuration] = useState([1, 10]);
  const [budget, setBudget] = useState([1000, 80000]);

  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const data = location.state?.responseData;
    setTimeout(() => {
      setResponseData(data || []);
      setLoading(false);
    }, 2000);
  }, [location.state]);

  // Filter cities based on search
  const filteredCities = allCities.filter((city) =>
    city.label.toLowerCase().includes(search.toLowerCase())
  );

  // Show first 4 unless "Show More" is clicked
  const visibleCities = showAll ? filteredCities : filteredCities.slice(0, 4);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sortedData, setSortedData] = useState([]);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  useEffect(() => {
    if (responseData.length > 0) {
      setLoading(true);
      const sorted = applySortFilter(responseData, options[selectedIndex]);
      setSortedData(sorted);
      setTimeout(() => setLoading(false), 500);
    }else{
      setSortedData([])
    }
  }, [responseData, selectedIndex]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  console.log("filter data => ", responseData, sortedData);

  return (
    <div className="h-full w-full">
      <HotelHero title="" />
      <div className="flex mt-40 md:mt-0 flex-col lg:flex-row w-full mx-auto gap-y-8 xl:w-[90%]  gap-x-3 lg:gap-x-10  px-4 sm:px-2 lg:px-12 xl:px-40 py-6 sm:py-16">
        <div className="relative w-full lg:w-[25%]">
          {/* Header with Filter + Icon (mobile toggle) */}
          <div className="flex flex-row justify-between p-3">
            <p className="text-base sm:text-xl font-semibold">Filter</p>
            <div className="flex lg:hidden">
              <span className="text-xl">
                <SortIcon onClick={() => setMobileOpen(true)} />
              </span>
            </div>
          </div>

          {/* Sidebar (desktop always visible, mobile drawer) */}
          <div
            className={`
          fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:w-full lg:h-fit lg:shadow-none
        `}
          >
            {/* Close Button for mobile */}
            <div className="flex justify-between items-center p-3 lg:hidden border-b">
              <p className="text-lg font-semibold">Filters</p>
              <CloseIcon onClick={() => setMobileOpen(false)} />
            </div>

            {/* Filter List */}
            <div className="space-y-2 p-3">
              {filters.map((filter, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx !== filters.length - 1 ? "border-b-2" : ""
                  }`}
                >
                  {/* Toggle Header */}
                  <button
                    className="w-full flex justify-between items-center p-2 font-medium text-gray-700"
                    onClick={() =>
                      setOpenFilter(openFilter === idx ? null : idx)
                    }
                  >
                    {filter}
                    <span>{openFilter === idx ? "−" : "+"}</span>
                  </button>

                  {/* Filter Content */}
                  {openFilter === idx && (
                    <div className="p-2 text-sm text-gray-600">
                      {filter === "Duration (in Nights)" && (
                        <div>
                          <Slider
                            value={duration}
                            onChange={(e, newValue) => setDuration(newValue)}
                            valueLabelDisplay="auto"
                            min={1}
                            max={10}
                          />
                          <div className="flex font-semibold flex-row justify-between items-center">
                            <p>{duration[0]}N</p>
                            <p>{duration[1]}N</p>
                          </div>
                        </div>
                      )}

                      {filter === "Flights" && (
                        <div className="flex w-full gap-2">
                          <button className="px-3 w-1/2 py-1 border rounded">
                            With Flight
                          </button>
                          <button className="px-3 w-1/2 py-1 border rounded">
                            Without Flight
                          </button>
                        </div>
                      )}

                      {filter === "Budget (per person)" && (
                        <div>
                          <Slider
                            value={budget}
                            onChange={(e, newValue) => setBudget(newValue)}
                            valueLabelDisplay="auto"
                            min={1000}
                            max={80000}
                          />

                          <div className="flex font-semibold flex-row justify-between items-center">
                            <p>₹{budget[0].toLocaleString()}</p>
                            <p>₹{budget[1].toLocaleString()}</p>
                          </div>

                          <div className="mt-2 space-y-1">
                            <label className="flex justify-between items-center gap-2 cursor-pointer">
                              <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>{"< ₹45,000"}</span>
                              </div>
                              <span className="text-gray-500 text-sm">(2)</span>
                            </label>

                            <label className="flex justify-between items-center gap-2 cursor-pointer">
                              <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>₹45,000 - ₹55,000</span>
                              </div>
                              <span className="text-gray-500 text-sm">
                                (10)
                              </span>
                            </label>

                            <label className="flex justify-between items-center gap-2 cursor-pointer">
                              <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>≥ ₹55,000</span>
                              </div>
                              <span className="text-gray-500 text-sm">(5)</span>
                            </label>
                          </div>
                        </div>
                      )}

                      {filter === "Hotel Category" && (
                        <div className="space-y-1">
                          {hotelCategories.map((item, idx) => (
                            <label
                              key={idx}
                              className="flex justify-between items-center gap-2 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>{item.label}</span>
                              </div>
                              <span className="text-gray-500 text-sm">
                                ({item.count})
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {filter === "Cities" && (
                        <div className="space-y-2">
                          {/* Search Box */}
                          <div className="relative">
                            <input
                              type="text"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Search city"
                              className="w-full border rounded-md p-2 pl-8 text-sm"
                            />
                            <SearchIcon className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                          </div>

                          {/* City List */}
                          <div className="space-y-1">
                            {visibleCities.map((city, idx) => (
                              <label
                                key={idx}
                                className="flex justify-between items-center gap-2 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <span>{city.label}</span>
                                </div>
                                <span className="text-gray-500 text-sm">
                                  ({city.count})
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Show More / Less */}
                          {filteredCities.length > 4 && (
                            <button
                              onClick={() => setShowAll(!showAll)}
                              className="text-blue-600 text-sm font-medium hover:underline"
                            >
                              {showAll ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </div>
                      )}

                      {filter === "Themes" && (
                        <div className="space-y-1">
                          <label className="flex justify-between items-center gap-2 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" />
                              <span>Honeymoon</span>
                            </div>
                            <span className="text-gray-500 text-sm">(2)</span>
                          </label>
                          <label className="flex justify-between items-center gap-2 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" />
                              <span>Adventure</span>
                            </div>
                            <span className="text-gray-500 text-sm">(4)</span>
                          </label>
                          <label className="flex justify-between items-center gap-2 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" />
                              <span>Family</span>
                            </div>
                            <span className="text-gray-500 text-sm">(8)</span>
                          </label>
                        </div>
                      )}

                      {filter === "Package Type" && (
                        <div className="w-full flex gap-3">
                          <button className="px-3 w-1/2 py-1 border rounded">
                            Standard
                          </button>
                          <button className="px-3 py-1 w-1/2 border rounded ml-2">
                            Luxury
                          </button>
                        </div>
                      )}

                      {filter === "Premium Packages" && (
                        <div>
                          <label className="flex justify-between items-center gap-2 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" />
                              <span>Only Premium</span>
                            </div>
                            <span className="text-gray-500 text-sm">(2)</span>
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Overlay for mobile */}
          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
        </div>
        <div className="lg:w-[75%] w-full flex flex-col gap-4">
          <div className="flex flex-row justify-end ">
            <div>
              Sorted By :{" "}
              <ButtonGroup
                variant="contained"
                ref={anchorRef}
                onClick={handleToggle}
                aria-label="Button group with a nested menu"
              >
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>

          <div className="w-full gap-10 grid grid-cols-1 sm:grid-cols-2 items-center">
            {loading ? (
              [1, 2, 3, 4, 6].map((item) => <Skelton key={item} />)
            ) : sortedData && sortedData.length > 0 ? (
              sortedData.map((card, index) => (
                <RoomCard key={index} pkg={card} />
              ))
            ) : (
              <div>
                <img src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/5ec8993d-a7cc-47f4-acf2-d771ef68b7ac.png" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
      <TablePaginationDemo/>
    </div>
  );
};

export default HotelListpage;
