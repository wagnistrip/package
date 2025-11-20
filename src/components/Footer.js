import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitterSquare} from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { AiFillLinkedin } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
const Footer = () => {
  return (
    <>
      <footer className="bg-[#F3F6FD] sm:px-10 xl:px-60 px-4 py-24 w-full">
        <div className=" mx-auto flex flex-col md:flex-row gap-8 text-[#001F54]">
          {/* Need Help Section */}
          <div>
            <h4 className="text-xl font-medium mb-3 border-b border-[#001F54] inline-block">
              Need any help?
            </h4>
            <div className="space-y-4 mt-4">
              <div className="border-l-2 border-black p-2">
                <p className="text-base text-black">Call 24/7 for any help</p>
                <p className="font-medium text-2xl text-[#01186c]">+91 965 451 9719</p>
              </div>
               <div className="border-l-2 border-black p-2">
                <p className="text-base text-black">Mail to our support team</p>
                <p className="font-medium text-2xl text-[#01186c]">
                  customercare@wagnistrip.com
                </p>
              </div>
              <div className="border-l-2 border-black p-2">
                <p className="text-base mb-2 text-black">Follow us on</p>
                <div className="flex items-center gap-3 text-[#01186c]">
                  <Link to="#">
                    <FaFacebook />
                  </Link>
                  <Link to="#">
                    <FaTwitterSquare />
                  </Link>
                  <Link to="#">
                    <FiInstagram />
                  </Link>
                  <Link to="#">
                    <AiFillLinkedin />
                  </Link>
                  <Link to="#">
                    <FaPinterest />
                  </Link>
                  <Link to="#">
                    <IoLogoYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Browse Tour */}
          <div>
            <h4 className="text-xl font-medium mb-3 border-b border-[#001F54] inline-block">
              Browse Tour
            </h4>
            <ul className="space-y-2 text-lg mt-4">
              <li>
                <Link to="#" className="hover:underline">
                  Flights
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Holidays
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Hotels
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xl font-medium mb-3 border-b border-[#001F54] inline-block">
              Company
            </h4>
            <ul className="space-y-2 text-lg mt-4">
              <li>
                <Link to="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Terms And Conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  User Agreement
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Refund And Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Resources */}
          <div>
            <h4 className="text-xl font-medium mb-3 border-b border-[#001F54] inline-block">
              Travel Resources
            </h4>
            <ul className="space-y-2 mt-4 text-lg">
              <li>
                <Link to="#" className="hover:underline">
                  Domestic Flights
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  International Flights
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-xl font-medium mb-3 border-b border-[#001F54] inline-block">
              More Links
            </h4>
            <ul className="space-y-2 text-lg mt-4">
              <li>
                <Link to="#" className="hover:underline">
                  Event Management
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Testimonial
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Travel Insurance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </footer>

      <div className="bg-[#0e0e0e] block md:flex items-center justify-center md:justify-between text-white py-2 px-2 sm:px-10 xl:px-60">
        <div className="flex items-center justify-center">
            <p>Copyright © 2025 All Rights Reserved</p>
        </div>
        <div className=" flex items-center justify-center">
            <img
              src="data:image/png;base64,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"
              alt="img"
            />
          </div>
      </div>
    </>
  );
};

export default Footer;
