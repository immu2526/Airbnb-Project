import React from "react";
// import Nave from "../components/Nave";
import Maine from "../components/Maine";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* <Nave /> */}
      <Maine />
      <br />
      <Footer />
      <Outlet />
    </>
  );
};

export default Home;
