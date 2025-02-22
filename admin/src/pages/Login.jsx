import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const {setDToken}=useContext(DoctorContext)
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const response = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });
        if (response.data.success) {
            localStorage.setItem("aToken", response.data.token);
          setDToken(response.data.token);
          toast.success("Login successful!");
          console.log("aToken:", response.data.token);

        } else {
          setErrorMessage(response.data.error || "Login failed");
          toast.error(response.data.message|| "Login failed");
        }
      }else{
        const response=await axios.post(backendUrl+'/api/doctor/login',{email,password})
        if (response.data.success) {
          localStorage.setItem("dToken", response.data.token);
        setAToken(response.data.token);
        toast.success("Login successful!");
        console.log("Token:", response.data.token);

      } else {
        setErrorMessage(response.data.error || "Login failed");
        toast.error(response.data.message|| "Login failed");
      }

      }
    } catch (error) {
        const errorMsg =error.response?.data?.message || "Internal Server Error";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      console.error("Login Error:", error);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <p className="text-center text-2xl font-semibold mb-6">
          <span className="text-teal-500">{state}</span>
          Login
        </p>
        <div className="flex items-center justify-between mt-4 mb-2">
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex items-center justify-between mt-4 mb-2">
          <label className="mb-2 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className=" p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="w-full mt-4 py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {" "}
          Login
        </button>
        {state === "Admin" ? (
          <p className="mt-4 text-center">
            Doctor Login?{" "}
            <span
              className="text-teal-500 underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center" onClick={() => setState("Admin")}>
            Admin Login?{" "}
            <span className="text-teal-500 underline cursor-pointer">
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
