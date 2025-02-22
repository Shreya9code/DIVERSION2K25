import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; //empty since we started frm 1 afterwards
  const navigate=useNavigate()
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A"; // Handle undefined case

    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointments = async () => {
    try {
      console.log("Fetching appointments..."); // Check if this runs
      console.log("Token:", token); // Ensure token is not empty

      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", data); // Log full response

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error("No appointments found");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  /*
  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)

      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open
  }
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(data.success){
        console.log(data.order)
        initPay(data.order)
      }
    } catch (error) {}
  };*/
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, []);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700  border-b">
        My Appointments
      </p>
      <div>
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">
            No appointments found
          </p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b mt-3"
            >
              <div>
                {item.docData?.image ? (
                  <img
                    className="w-32 bg-teal-50"
                    src={item.docData.image}
                    alt="Doctor"
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData?.name || "Unknown Doctor"}
                </p>
                <p>{item.docData?.speciality || "Speciality not available"}</p>
                <p className="text-zinc-700 font-medium mt-1">Address</p>
                <p className="text-xs">
                  {item.docData?.address?.line1 || "Address not available"}
                </p>
                <p className="text-xs">{item.docData?.address?.line2 || ""}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>
                  {slotDateFormat(item.slotDate) || "N/A"} |{" "}
                  {item.slotTime || "N/A"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                {!item.cancelled && !item.isCompleted &&(
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Pay
                  </button>
                )}
                {!item.cancelled && !item.isCompleted &&(
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
                {item.cancelled && !item.isCompleted &&(
                  <span className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow">
                    Appointment Cancelled
                  </span>
                )}
                {item.isCompleted && <button>Completed</button>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
