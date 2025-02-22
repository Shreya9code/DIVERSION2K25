import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      console.log("Fetching appointments...");
      getAllAppointments().then(() =>
        console.log("Appointments fetched:", appointments)
      
      );
    }else {
      console.log("No admin token found!");
    }
  }, [aToken]);

  return (
    <div>
      <h1>All Appointments</h1>
      <div className="w-full p-4 bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-7 gap-4 font-semibold text-gray-700 bg-gray-100 p-3 rounded-md">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doc Name</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 border border-gray-200"
            >
              <p className="text-lg font-bold text-gray-700">{index + 1}.</p>
              <div>
                <img
                  src={item.userData?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                />
                <p className="text-gray-800 font-medium">
                  {item.userData?.name || "Unknown"}
                </p>
              </div>
              <p>{calculateAge(item.userData?.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)},{item.slotTime}
              </p>
              <div>
                <img
                  src={item.docData.image || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                />{" "}
                <p className="text-gray-800 font-medium">
                  {item.docData?.name || "Unknown"}
                </p>
              </div>
              <p>
                {currency}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-red-500 font-semibold">Cancelled</p>
              ) : (
                <img
                onClick={()=>cancelAppointment(item._id)}
                  className="cursor-pointer w-6 h-6 hover:opacity-80 transition-opacity duration-200"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">No Appointments Found</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
