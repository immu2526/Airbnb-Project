import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Nave from "./components/Nave";
import { useDispatch } from "react-redux";
import { index } from "../store/listing-Slice";
import ShowListing from "./pages/ShowListing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditListing from "./pages/EditListing";
import Login from "./pages/Login";
import { checkAuth } from "../store/user/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(index())
      .unwrap()
      .then((res) => console.log("API CALL"))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then((res) => console.log("user Call CALL"))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Nave />
      <br />
      <ToastContainer />
      <Routes>
        {/* Home Page Layout */}
        <Route path="/" element={<Home />} />

        {/* Listings Group */}
        <Route path="/listing/account" element={<Account />} />
        <Route path="/listing/new" element={<Create />} />
        <Route path="/listing/:id" element={<ShowListing />} />
        <Route path="/listing/:id/edit" element={<EditListing />} />
        <Route path="/singup" element={<Account />} />
        <Route path="/login" element={<Login />} />

        {/* Fallback 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
