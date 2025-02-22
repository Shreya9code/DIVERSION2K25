import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken,dashData={}, setDashData, getDashData,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Doctor Dashboard</h1>
      {/* Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Earnings Card */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md border">
              <img
                src={assets.earning_icon}
                alt="Doctor Icon"
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {currency} {dashData.earnings||"0"}
                </p>
                <p className="text-gray-600">Earnings</p>
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
                  {dashData.patients||"0"}
                </p>
                <p className="text-gray-600">Patients</p>
              </div>
            </div>
          </div>
                {/* Latest Bookings Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold text-lg">Latest Bookings</p>
            </div>
        {/* Appointments List */}
            <div>
              {dashData.latestAppointments.map((item, index) => {
                <div key={index}>
                  <img src={item.userData.image} alt="" />
                  <div>
                    <p>{item.userData.name}</p>
                    <p>{slotDateFormat(item.slotDate)}</p>
                  </div>
                  {item.cancelled ? (
                    <p>Cancelled</p>
                  ) : item.isCompleted ? (
                    <p>Completed</p>
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Approve"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                    </div>
                  )}
                </div>;
              })}
            </div>
          </div>
        </div>
        
      </div>
    )
  );
};

export default DoctorDashboard;
