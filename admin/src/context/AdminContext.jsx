import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    () => localStorage.getItem("aToken") || ""
  );
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointments, setAppointments] = useState([]);
  const[dashData,setDashData]=useState(false)
  console.log("backendUrl:", backendUrl);
  console.log("aToken:", aToken);

  // To save token in localStorage on login
  const saveToken = (token) => {
    console.log("Saving token:", token);
    localStorage.setItem("aToken", token);
    setAToken(token);
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        {
          headers: { Authorization: `Bearer ${aToken}`, "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Doctors API Response:", data);

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      console.log("Changing availability for:", docId);
      console.log("Using token:", aToken);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );
      console.log("Full API Response:", data);

      if (data.status === "success") {
        getAllDoctors();
        toast.success("Doctor's availability toggled! ✅");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error changing availability:", error);
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/appointments", {
        headers: { Authorization: `Bearer ${aToken}`, "Content-Type": "application/json" },
      });
      if (res.data.success) {
        setAppointments(res.data);
        //setAppointments(data.appointments);
        console.log(res.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointments`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${aToken}`, "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        console.log(data.appointments);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDashData=async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard`,
        //{ appointmentId },
        {
          headers: { Authorization: `Bearer ${aToken}`, "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData)
      } else {
        toast.error(data.message);
        console.log(data)
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  }
  const value = {
    aToken,
    setAToken: saveToken, // Update token
    backendUrl,
    doctors,
    setDoctors, // Expose setDoctors to context consumers
    getAllDoctors,
    changeAvailability,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
