import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../store/user/auth";
import { toast } from "react-toastify";

export default function AccountModal({ isOpne, setIsOpne }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  let handleActionSingup = () => {
    navigate("/singup");
    setIsOpne(false);
  };
  let handleActionLogin = () => {
    navigate("/login");
    setIsOpne(false);
  };

  let handleLogout = () => {
    dispatch(authLogout())
      .unwrap()
      .then((res) => {
        console.log(res);
        toast.success(res.data);
        setIsOpne(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-2xl p-8 w-80 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpne(!isOpne)}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-2xl">
          <VscAccount className="text-[60px] text-[#FF5A5F]" />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">My Account</h2>
        <p className="text-sm text-gray-400 mb-6">
          {user?.username || "Account Session"}
        </p>

        <div className="border-t border-gray-100 pt-5 flex flex-col gap-3">
          {user ? (
            <button
              onClick={() => handleLogout("logout")}
              className="w-full py-2.5 rounded-lg bg-red-50 text-red-500 font-medium border border-red-100 hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => handleActionSingup("login")}
                className="w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium border border-blue-100 hover:bg-blue-100 transition"
              >
                Signup
              </button>

              <button
                onClick={() => handleActionLogin()}
                className="w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium border border-blue-100 hover:bg-blue-100 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
