import React from "react";
import { FaCompass } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="flex gap-3 items-center  bg-gray-50 ">
        <FaCompass className="text-[#FF5A5F] text-[35px] relative left-2 " />
        <span>Airbnb</span>
      </div>
      <div className="w-full bg-gray-50 flex items-center flex-wrap justify-between gap-1 px-6  pb-6 md:px-20 ">
        {/* col 1 */}

        <div>
          <p className="font-bold text-[16px] ">Support</p>
          <p>Help Center</p>
          <p>AirCover</p>
          <p>Anti-discrimination</p>
          <p>Disability support</p>
          <p>Cancellation options</p>
        </div>

        {/* col 2 */}

        <div>
          <p className="font-bold text-[16px] ">Hosting</p>
          <p> Airbnb your home</p>
          <p>AirCover for Hosts</p>
          <p>Hosting resources</p>
          <p>Community forum</p>
          <p>Hosting responsibly</p>
        </div>

        {/* col 3 */}

        <div>
          <p className="font-bold text-[16px] ">Support</p>
          <p>Newsroom</p>
          <p>New features</p>
          <p>Careers</p>
          <p>Investors</p>
          <p>Gift cards</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
