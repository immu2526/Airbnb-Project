import React, { useState } from "react";
import { FaCompass } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authLogin } from "../../store/user/auth";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formattedUsername =
      form.username.charAt(0).toUpperCase() +
      form.username.slice(1).toLowerCase();

    console.log(form);

    dispatch(
      authLogin({
        username: formattedUsername,
        password: form.password,
      })
    )
      .unwrap()
      .then((res) => {
        console.log("API CALL");
        setForm({
          username: "",
          password: "",
        });
        navigate("/");
        toast.success("Successfully login!");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
        setLoading(false);
      });

    // try {
    //   setLoading(true);
    //   const res = await fetch("http://localhost:5000/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //     body: JSON.stringify(form),
    //   });

    //   console.log(res);
    //   const data = await res.json();

    //   if (!res.ok) {
    //     setError(data.message || "Kuch galat ho gaya!");
    //     return;
    //   }

    //   navigate("/");
    // } catch (err) {
    //   //   setError(err);
    //   toast.error(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg p-8 sm:p-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <FaCompass className="text-[#FF5A5F] text-[30px] relative left-2" />
          <span className="text-lg font-bold text-[#FF385C] tracking-tight">
            airbnb
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Log in to your account to continue.
        </p>
        <hr className="mb-6 border-gray-100" />

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="border border-gray-300 rounded-xl focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 overflow-hidden mb-4">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest px-3.5 pt-2.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="john_doe"
              autoComplete="username"
              required
              className="block w-full px-3.5 pb-2.5 text-sm font-medium text-gray-900 bg-transparent outline-none placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="border border-gray-300 rounded-xl focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 overflow-hidden mb-4 relative">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest px-3.5 pt-2.5">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="block w-full pl-3.5 pr-16 pb-2.5 text-sm font-medium text-gray-900 bg-transparent outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-700 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 px-4 rounded-lg">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-2 rounded-xl text-white font-bold text-base transition-opacity disabled:opacity-60 cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #e61e4d, #e31c5f, #d70466)",
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-100" />
            <span className="text-xs text-gray-400">new to airbnb?</span>
            <hr className="flex-1 border-gray-100" />
          </div>

          {/* Signup Link */}
          <a
            href="/singup"
            className="block w-full h-12 rounded-xl border border-gray-300 text-gray-900 font-bold text-sm text-center leading-[48px] hover:bg-gray-50 transition-colors"
          >
            Create an account
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
