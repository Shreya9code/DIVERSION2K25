import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <p className="text-xl font-semibold text-gray-800 mb-4">
        Doc Appointments
      </p>

      {/* Table Header */}
      <div className="grid grid-cols-7 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-md text-center">
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {/* Table Rows */}
      {appointments.reverse.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-7 items-center text-center border-b border-gray-200 py-3 px-4 hover:bg-gray-50"
        >
          <p className="text-gray-800">{index + 1}</p>

          <div className="flex items-center gap-3 justify-center">
            <img
              src={item.userData.image}
              alt=""
              className="w-10 h-10 rounded-full border"
            />
            <p className="text-gray-700 font-medium">{item.userData.name}</p>
          </div>

          <p
            className={`font-semibold ${
              item.payment ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.payment ? "Online" : "Cash"}
          </p>

          <p className="text-gray-700">{calculateAge(item.userData.dob)}</p>

          <p className="text-gray-700">
            {slotDateFormat(item.slotDate)}, {item.slotTime}
          </p>

          <p className="font-semibold text-gray-800">
            {currency}
            {item.amount}
          </p>
          {
          item.cancelled ? (
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
        </div>
      ))}
    </div>
  );
};

export default DoctorAppointments;
