import React, { useEffect, useState } from "react";
import { MdFlight } from "react-icons/md";
import { LiaHotelSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import Login from "./Login";
import { FaRegCircleUser, FaFacebook } from "react-icons/fa6";
import { FaTwitterSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loadSession, logout } from "../redux/actions/authActions";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const handleLinkClick = () => {
    setActive(false);
  };

  const [isSticky, setIsSticky] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const greenChipsPrice = useSelector((state) => state.booking.greenChipsPrice);
  const walletAmout = useSelector((state) => state.booking.walletAmount);
  useEffect(() => {
    dispatch(loadSession()); // Load session on mount
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // <div className="bg-white sticky top-0 left-0 right-0 shadow-md px-4 z-20 py-2 gap-x-8 flex items-center justify-between lg:justify-around">
    <>
      <div
        className={`top-0 left-0 right-0 px-4 z-50 gap-x-8 flex flex-col items-center w-full lg:px-0 justify-between lg:justify-between 
    ${isSticky ? "bg-white shadow-md" : "bg-transparent"} 
    fixed transition-all duration-500 ease-in-out`}
      >
        <div
          className={`w-full border-b-[1px] px-6 lg:px-60 py-2 border-[#ffffff4d] 
      ${isSticky ? "text-black hidden" : "text-white hidden md:flex"} 
      flex items-center justify-between transition-colors duration-500 ease-in-out`}
        >
          <div className="flex flex-row items-center gap-4  text-base">
            <Link to="">
              <div className=" flex items-center justify-start gap-2">
                <FaFacebook />
                <FaTwitterSquare />
                <FaInstagram />
                <FaLinkedin />
              </div>
            </Link>
          </div>
          <div className="flex flex-row gap-x-3">
            <Link to="">
              <div className="">+91 806 914 5571</div>
            </Link>
            <Link to="">
              {" "}
              <div className="border-l-[1px] border-[#ffffff4d] pl-2 ">
                customercare@wagnistrip.com
              </div>
            </Link>
          </div>
        </div>
        <div className="md:flex items-center px-10 xl:px-60 justify-between w-full hidden py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                width="100"
                src="https://admin.wagnistrip.com/public/homepageimg/logo.png"
                alt="logo"
              />
            </Link>
          </div>

          {/* Middle Menu */}
          <div
            className={` ${
              isSticky ? "hidden lg:flex text-black " : "hidden text-white"
            } items-center space-x-6 text-sm font-medium`}
          >
            <Link to="/flights" className="hover:text-blue-600">
              Flights
            </Link>
            {/* <Link to="/hotels" className="hover:text-blue-600">
              Hotels
            </Link> */}
            <Link to="/events" className="hover:text-blue-600">
              Events
            </Link>
            <Link to="/blogs" className="hover:text-blue-600">
              Blogs
            </Link>
            <Link to="/visa" className="hover:text-blue-600">
              Visa
            </Link>
            <Link to="/cabs" className="hover:text-blue-600">
              Cabs
            </Link>
          </div>

          {/* Right side */}
          <div
            className={` ${
              isSticky ? "flex text-black" : "none text-white"
            } items-center space-x-6 text-sm`}
          >
            {user && user.users ? (
              <div className="relative group">
                {/* User button */}
                <button className="flex items-center gap-2">
                  <img
                    src={
                      (user && user?.users.image) ||
                      "https://admin.wagnistrip.com/public/agents/profilePick/1757685255.png"
                    }
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">
                    {user && user?.users?.name}
                  </span>
                </button>

                {/* Dropdown - show on hover */}
                <div
                  className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300"
                >
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">
                      {user && user?.users?.name}{" "}
                      {user && user?.users?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user && user?.users?.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/booking"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    <div className="flex flex-row justify-between">
                      <p>Commision</p>
                      <strong>{greenChipsPrice}</strong>
                    </div>
                  </Link>
                  <div className="block px-4 py-2 hover:bg-gray-100">
                    <div className="flex flex-row justify-between">
                      <p>Wallet</p>
                      <strong>{walletAmout}</strong>
                    </div>
                  </div>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={()=>setOpenModal(true)} type="button" className="hover:underline" >Login / Signup</button>
              </div>
            )}
          </div>
        </div>
        <div className="flex md:hidden w-full items-center justify-between p-2">
          <div className="flex gap-x-4 justify-around items-center">
            <Link to="/">
              <img
                src="https://admin.wagnistrip.com/public/homepageimg/logo.png"
                alt="Logo"
                className="w-28"
              />
            </Link>
          </div>

          <div className="lg:hidden block">
            <button
              type="button"
              className={`${isSticky ? "text-[#0e0e0e]" : "text-[#ffffff]"}`}
            >
              {active ? (
                <RxCross2 size={24} onClick={() => setActive(!active)} />
              ) : (
                <RxHamburgerMenu onClick={() => setActive(!active)} size={24} />
              )}
            </button>
          </div>

          <div
            // className={`lg:hidden fixed  ${isSticky ? 'top-[68px]':'top-0'} left-0 h-full w-[75%] bg-black text-[#ffff] shadow-md z-50 transform ${active ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
            className={`lg:hidden fixed top-0  left-0 h-full w-[100%] bg-white text-[#0e0e0e] shadow-md z-50 transform ${
              active ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex flex-col h-screen justify-between relative">
              <div className="flex flex-col gap-y-6 p-4">
                <Link to="/">
                  <img
                    src="https://admin.wagnistrip.com/public/homepageimg/logo.png"
                    alt="Logo"
                    className="w-28"
                  />
                </Link>
                <div className="flex flex-row items-center gap-x-3">
                  {user && user.users ? (
                    <div>
                      <Link
                        to="#"
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <img
                          src={(user && user?.users.image) || ""}
                          className="h-8 w-8 rounded-full"
                          alt="Flowbite Logo"
                        />
                        <span className="self-center text-sm">
                          <div className="flex flex-col">
                            <p className="font-semibold text-gray-900">
                              {user && user?.users?.name}{" "}
                              {user && user?.users?.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user && user?.users?.email}
                            </p>
                          </div>
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <p
                        className={` flex items-center gap-x-2 cursor-pointer rounded-md  font-medium  text-base  focus:outline-none `}
                      >
                        <FaRegCircleUser size={20} />
                        Login
                      </p>
                    </div>
                  )}
                </div>
                <Link
                  onClick={handleLinkClick}
                  to="#"
                  className=" flex capitalize items-center gap-x-1"
                >
                  <MdFlight className="rotate-45" /> Flights
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="#"
                  className=" flex capitalize items-center gap-x-1"
                >
                  <MdFlight className="rotate-45" /> Packages
                </Link>

                <Link
                  onClick={handleLinkClick}
                  to="#"
                  className=" flex items-center gap-x-1"
                >
                  <LiaHotelSolid /> Events
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="#"
                  className=" flex items-center gap-x-1"
                >
                  <LiaHotelSolid /> Visa
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="#"
                  className=" flex items-center gap-x-1"
                >
                  <LiaHotelSolid /> Cabs
                </Link>
              </div>
              <div className=" flex flex-row wrapper mb-5 text-xs items-center justify-center gap-x-2">
                <Link to="#"> User Agreement</Link>
                <Link to="#"> Term's Condition</Link>
                <Link to="#"> Privacy Policy</Link>
              </div>
              <button type="button" className={` absolute top-10 right-5 `}>
                {active ? (
                  <RxCross2 size={24} onClick={() => setActive(!active)} />
                ) : (
                  <RxHamburgerMenu
                    onClick={() => setActive(!active)}
                    size={24}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Login openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Navbar;
