import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Maine = () => {
  const { data, isLoading } = useSelector((state) => state.listing);
  let navigate = useNavigate();

  if (isLoading) return <Loading />;

  let HandleShowListing = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    <>
      <div className=" w-full  flex  items-center justify-center flex-wrap gap-10">
        {data.map((val, ind) => (
          <div
            className="h-[230px] w-[160px]  border rounded-[5px]  md:h-[280px] md:w-[200px]  lg:h-[300px] lg:w-[240px]"
            key={ind}
            onClick={() => HandleShowListing(val._id)}
          >
            <div className="h-[150px] w-[150px] mx-1 mt-1 md:h-[190px] md:w-[190px]  lg:h-[200px] lg:w-[230px]  ">
              <img
                src={val.image.url}
                alt=""
                className="h-full w-full object-cover rounded-[5px]"
              />
            </div>
            <h1 className="ml-1 font-bold text-sm lg:text-[17px]">
              {val.title}
            </h1>
            <p className="ml-1 text-gray-400">
              {val.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Maine;
