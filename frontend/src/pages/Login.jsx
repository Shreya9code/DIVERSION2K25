import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {backendUrl,token,setToken,}=useContext(AppContext)
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate=useNavigate()
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Your submit logic here
    try {
      if(state==='Sign Up'){
        const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})
        if (data.success) {
          console.log(data)
          localStorage.setItem('token:',data.token)
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }else{//login
        const {data}=await axios.post(backendUrl+'/api/user/login',{password,email})
        if (data.success) {
          console.log(data)
          localStorage.setItem('token',data.token)
          setToken(data.token);
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token,navigate])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <p>Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment</p>
            {state === "Sign Up" && (
              <div className="w-full">
                <label className="block text-gray-700">Full Name:</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            )}
            <div className="w-full">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
            {state === "Sign Up" ? (
              <p>
                Already have an Account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-teal-400 cursor-pointer underline"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create a new Account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-teal-400 cursor-pointer underline"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
