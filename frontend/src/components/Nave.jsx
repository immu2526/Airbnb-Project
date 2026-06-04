import React, { useState } from "react";
import { FaCompass } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import AccountModal from "./AccountModle";
import { NavLink } from "react-router-dom";

const Nave = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="h-18 w-full border-b-1 flex items-center   md:text-[20px]">
        {/* logo */}
        <div>
          <FaCompass className="text-[#FF5A5F] text-[35px] relative left-2" />
        </div>
        <div className="ml-4">
          <NavLink to="/">All Listing</NavLink>
        </div>
        <div className="ml-4 grow">
          <NavLink to="/listing/new">Create Listing</NavLink>
        </div>

        <div className="">
          <VscAccount
            className="text-[35px] relative right-5"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {isOpen ? <AccountModal isOpne={isOpen} setIsOpne={setIsOpen} /> : null}
      </div>
    </>
  );
};

export default Nave;
