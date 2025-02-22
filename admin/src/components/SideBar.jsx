import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-cyan-800 bg-glass backdrop-blur-glass border border-glas text-white w-64 p-5 fixed top-0 left-0 overflow-y-auto pt-20">
      {aToken ? (
        // ✅ Show Admin Sidebar if aToken exists
        <ul className="space-y-4">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.home_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.appointment_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.add_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.people_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      ) : dToken ? (
        // ✅ Show Doctor Sidebar if dToken exists
        <ul className="space-y-4">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.home_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.appointment_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.people_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Doctor's Profile</p>
          </NavLink>
        </ul>
      ) : (
        // ✅ Show message if no token exists
        <p className="text-center mt-10 text-gray-300">Please log in</p>
      )}
    </div>
  );
};

export default SideBar;

/*
import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen  bg-cyan-800 bg-glass backdrop-blur-glass border border-glas text-white w-64 p-5 fixed top-0 left-0 overflow-y-auto pt-20">
      {aToken && (
        <ul className="space-y-4">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.home_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt="logo"
              className="w-6 h-6 mr-3"
            />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.add_icon} alt="logo" className=" w-6 h-6 mr-3" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.people_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="space-y-4">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.home_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt="logo"
              className="w-6 h-6 mr-3"
            />
            <p>Appointments</p>
          </NavLink>
          
          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${
                isActive ? "bg-cyan-600" : "hover:bg-cyan-700"
              }`
            }
          >
            <img src={assets.people_icon} alt="logo" className="w-6 h-6 mr-3" />
            <p>Doctor's Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
*/