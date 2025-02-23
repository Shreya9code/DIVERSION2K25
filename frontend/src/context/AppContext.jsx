import { createContext } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { useEffect,useCallback ,useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const currencySymbol = "Rs.";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  //localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmE4NzUyY2YzNGVkNWQ2OGQ1MjAyZCIsImlhdCI6MTc0MDI3NzU4NiwiZXhwIjoxNzQwODgyMzg2fQ.UBqg7N0C4wbXIC5P6MlUDaB9c43NF_skG_hUq9AIQM0");
  //const token = localStorage.getItem("token");
  //const [token, setToken] = useState(localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmE4NzUyY2YzNGVkNWQ2OGQ1MjAyZCIsImlhdCI6MTc0MDI3NzU4NiwiZXhwIjoxNzQwODgyMzg2fQ.UBqg7N0C4wbXIC5P6MlUDaB9c43NF_skG_hUq9AIQM0");

  const [userData, setUserData] = useState(false);
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },});
      console.log(data);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  /*const loadUserProfileData = useCallback(async () => {
    try {
      if (!token) {
        toast.error("No token found, please log in again.");
        return;
      }
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, token]);*/
  const loadUserProfileData = async () => {
    try {
      console.log("Token being sent:", token); // Debugging step
      if (!token) {
        toast.error("No token found, please log in again.");
        return;
      }
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Correct way to send token
        },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData({
        name: "",
        email: "",
        phone: "",
        image: "",
        address: { line1: "", line2: "" },
        gender: "",
        dob: "",
      });
    }
  }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
