import React from "react";
import { useState } from "react";
import { FaCompass } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../../store/user/auth";
import { toast } from "react-toastify";

const Account = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
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

    if (form.password.length < 8) {
      setError("Password must be 8 digit");
      return;
    }

    const formattedUsername =
      form.username.charAt(0).toUpperCase() +
      form.username.slice(1).toLowerCase();

    console.log(form);
    setLoading(true);
    dispatch(
      authUser({
        username: formattedUsername,
        email: form.email,
        password: form.password,
      })
    )
      .unwrap()
      .then((res) => {
        console.log("API CALL");
        toast.success("Successfully Singup!");
        navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg p-8 sm:p-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <FaCompass className="text-[#FF5A5F] text-[30px] relative left-2" />
          <span className="text-lg font-bold text-[#FF385C] tracking-tight">
            airbnb
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Create your Account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Join millions of hosts and guests around the world.
        </p>
        <hr className="mb-6 border-gray-100" />

        <form onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <div className="flex mb-4">
            <div className="flex-1 border border-gray-300 rounded-l-xl focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 overflow-hidden">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest px-3.5 pt-2.5">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className="block w-full px-3.5 pb-2.5 text-sm font-medium text-gray-900 bg-transparent outline-none placeholder-gray-400"
              />
            </div>
            <div className="flex-1 border border-l-0 border-gray-300 rounded-r-xl focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 overflow-hidden">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest px-3.5 pt-2.5">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="block w-full px-3.5 pb-2.5 text-sm font-medium text-gray-900 bg-transparent outline-none placeholder-gray-400"
              />
            </div>
          </div>

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

          {/* Email */}
          <div className="border border-gray-300 rounded-xl focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 overflow-hidden mb-4">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest px-3.5 pt-2.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              autoComplete="email"
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
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className="block w-full pl-3.5 pr-12 pb-2.5 text-sm font-medium text-gray-900 bg-transparent outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
            By selecting{" "}
            <strong className="text-gray-700">Create Account</strong>, I agree
            to Airbnb's{" "}
            <a href="#" className="underline text-gray-700 font-semibold">
              Terms of Service
            </a>
            ,{" "}
            <a href="#" className="underline text-gray-700 font-semibold">
              Payments Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-gray-700 font-semibold">
              Privacy Policy
            </a>
            .
          </p>

          {/* Login Link */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-gray-900 font-bold underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Account;
