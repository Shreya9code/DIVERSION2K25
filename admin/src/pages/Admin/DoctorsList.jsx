import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, setDoctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext); // Ensure setDoctors is part of context
  console.log("Admin Token:", aToken);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // Handle checkbox click and immediately update UI (optimistic update)
  const handleChangeAvailability = (docId) => {
    // Optimistically update the UI
    setDoctors((prevDoctors) =>
      prevDoctors.map((doc) =>
        doc._id === docId ? { ...doc, available: !doc.available } : doc
      )
    );
    
    // Send the change to the backend
    changeAvailability(docId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Doctors List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 ? (
          <p className="text-center text-gray-600">No doctors available.</p>
        ) : (
          doctors.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={item.image}
                alt=""
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-neutral-800">{item.email}</p>
                <p className="text-zinc-600">{item.speciality}</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    className="form-checkbox h-5 w-5 text-teal-600 cursor-pointer"
                    onChange={() => handleChangeAvailability(item._id)} // Use local handler
                  />
                  <p>Available</p>
                </div>
                <p className="text-gray-600">{item.experience}</p>
                <p className="text-gray-600">{item.degree}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
