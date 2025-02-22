import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import { DoctorContext } from "./context/DoctorContext";
const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken||dToken ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SideBar />
        <div className="flex-1 p-4">
          <Routes>
            {/***** Admin routes*****/}
            <Route path="/" element={<h1>Welcome Admin</h1>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />

            {/******Doctor dashboard *****/}
            <Route path="/doctor-dashboard" element={<DoctorsList />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />

          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
