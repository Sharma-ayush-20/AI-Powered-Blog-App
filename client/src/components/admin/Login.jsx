import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Login() {

  const {axios, setToken, navigate} = useAppContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`/api/admin/login`, {email, password})

      if(response.data.success){
        toast.success("Admin Login SuccessFully");
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        axios.defaults.headers.common['Authorization'] = response.data.token
        navigate("/admin")      
      }
      else{
        toast.error(response.data.message);
      }

    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
        {/* Outer Box */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-1.5 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            ← Back
          </button>

          {/* Logo & Title */}
          <div className="flex flex-col justify-center items-center gap-3 mb-6 mt-6">
            <img
              src={assets.logo}
              alt="Admin Logo"
              className="w-24 md:w-28 cursor-pointer transform hover:scale-105 transition-transform duration-500 drop-shadow-lg"
            />
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
              Welcome To{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent animate-pulse inline-block font-bold tracking-wide">
                Admin
              </span>{" "}
              Panel
            </h3>
            <p className="text-gray-500 text-sm md:text-base tracking-wide text-center">
              Manage blogs, comments & more..
            </p>
          </div>

          {/* Subtitle */}
          <div className="mb-6 text-center">
            <p className="text-gray-500 text-sm md:text-base">
              Enter your{" "}
              <span className="font-semibold text-emerald-500">credentials</span>{" "}
              to access the{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent font-bold">
                Admin Panel
              </span>
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col text-left">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-400/30 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col text-left">
              <label
                htmlFor="password"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="••••••••"
                required
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-400/30 outline-none transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:scale-105 transition-all shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
