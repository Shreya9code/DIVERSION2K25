import React from "react";
/*import WellnessProgram from "../components/WellnessProgram";
import ChatSupport from "./ChatSupport";
import MedicineReminder from "./MedicineReminder";
import MentalHealth from "./MentalHealth";*/
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import { Link } from "react-router-dom"; // Import Link

const Home = () => {
  const redirectToFlask = () => {
    window.location.href = "http://localhost:5000"; // URL of your Flask app
  };
  return (
    <div>
      {/* Quick Access Options */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700">Explore More</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <Link
            to="/wellness"
            className="p-4 bg-green-500 text-white text-center rounded-lg shadow-md hover:bg-green-600"
          >
            Wellness Program
          </Link>
          <a
            href="http://localhost:5000"
            className="p-4 bg-pink-400 text-white text-center rounded-lg shadow-md hover:bg-pink-600"
          >
            Disease Prediction
          </a>
          {/*<Link to="/chat" className="p-4 bg-blue-500 text-white text-center rounded-lg shadow-md hover:bg-blue-600">
            Chat Support
          </Link>*/}
          <div
            onClick={() => window.open("http://localhost:8501", "_blank")}
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
          >
            Open Prescription Reader
          </div>

          <Link
            to="/reminder"
            className="p-4 bg-purple-500 text-white text-center rounded-lg shadow-md hover:bg-purple-600"
          >
            Medicine Reminder
          </Link>
          <Link
            to="/mental-health"
            className="p-4 bg-red-500 text-white text-center rounded-lg shadow-md hover:bg-red-600"
          >
            Mental Health
          </Link>
        </div>
      </div>
      <div>
        <Header />

        <SpecialityMenu />
        <TopDoctors />
        <Banner />
      </div>
    </div>
  );
};

export default Home;
