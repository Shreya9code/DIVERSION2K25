import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const {slotDateFormat}=useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Doctors Card */}
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md border">
          <img
            src={assets.doctor_icon}
            alt="Doctor Icon"
            className="w-12 h-12 mr-4"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashData.doctors}
            </p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md border">
          <img
            src={assets.appointments_icon}
            alt="Appointments Icon"
            className="w-12 h-12 mr-4"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashData.appointments}
            </p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md border">
          <img
            src={assets.patients_icon}
            alt="Patients Icon"
            className="w-12 h-12 mr-4"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashData.patients}
            </p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <img src={assets.list_icon} alt="" />
          <p>Latetst Bookings</p>
        </div>

        <div>
          {dashData.latestAppointments.map((item, index) => {
            <div key={index}>
              <img src={item.docData.image} alt="" />
              <div>
                <p>{item.docData.name}</p>
                <p>{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-500 font-semibold">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="cursor-pointer w-6 h-6 hover:opacity-80 transition-opacity duration-200"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
