import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("0-2 years"); 
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician"); 
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  //const [phone, setPhone] = useState("");

  const { /*backendUrl,*/ aToken } = useContext(AdminContext);
  const backendUrl = "http://localhost:4000";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload doctor image");
      }
      const formData = new FormData();
      formData.append("image", docImg); //image is key in multer
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      //formData.append("phone", phone);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads
      'aToken': aToken,
          },
        }
      );
      const { data } = response;
      if (data.error) {
        return toast.error(data.error);
      } else {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setFees("");
        setAbout("");
        setSpeciality("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        //setPhone("");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white rounded-lg shadow-md space-y-6 max-w-3xl mx-auto"
    >
      <p>Add Doctor</p>
      <p className="text-xl font-semibold text-gray-800">Add Doctor</p>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            //src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-gray-600 mt-2 text-center">
            Upload Doctor
            <br />
            picture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700">Doctor name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter doctor name"
              required
            />
          </div>
          <div>
            <p>Doctor email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter doctor email"
              required
            />
          </div>
          <div>
            <p className="text-gray-700">Doctor password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter doctor password"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <p className="text-gray-700">Doctor experience</p>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              name=""
              id=""
            >
              <option value="0-2 years">0-2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
          <div>
            <p className="text-gray-700"> Doctor speciality</p>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              name=""
              id=""
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynaecologist">Gynaecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div>
            <p>Doctor fees</p>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Enter doctor fees"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/*<div>
            <p>Doctor phone number</p>
            <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
              type="number"
              placeholder="Enter doctor phone number"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>*/}
          <div>
            <p className="text-gray-700">Doctor qualification</p>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Enter doctor qualification(likeMBBS, MD,etc.)"
              required
            />
          </div>
          <div>
            <p className="text-gray-700">Doctor address</p>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address line1"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Address line2"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <p>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            cols="10"
            rows="5"
            placeholder="Enter about doctor"
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-800 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
