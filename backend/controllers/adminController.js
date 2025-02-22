import validate from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../../backend/models/appointmentModel.js";
import userModel from "../models/userModel.js";
//api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    console.log(
      {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      },
      imageFile
    );
    //check if all fields are present to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res
        .status(400)
        .json({ succes: false, message: "All fields are required" });
    }
    //validate email
    if (!validate.isEmail(email)) {
      return res
        .status(400)
        .json({ succes: false, message: "Please enter a valid email" });
    }
    //validate strong password
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          succes: false,
          message: "Password should be atleast 8 characters",
        });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //check if doctor already exists
    const doctorExists = await doctorModel.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }
    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    console.log("Image File Received:", imageUpload);

    //create new doctor
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      //available:true,
      fees,
      address: JSON.parse(decodeURIComponent(address)),
      image: imageUrl,
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if all fields are present to login
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //validate email
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      //create token
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error.message" });
  }
};
//API to get all doctors list for admin
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api to get all appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).json({ success: true, appointments }); //sends data
  } catch (error) {
    console.log("Error:", error);
    res.json({ success: false, message: error.message });
    toast.error(error.message);
  }
};
//api to cancel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    //verify app user
    if (appointmentData.userId != userId) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized Action!" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    //release doc slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "app cancelled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//api for admin dash get
const adminDashboard = async (req, res) => {
    try {
      const doctors = await doctorModel.find({});
      const users = await userModel.find({});
      const appointments=await appointmentModel.find({})

      const dashData={
        doctors:doctors.length,
        appointments:appointments.length,
        patients:users.length,
        latestAppointments:appointments.reverse().slice(0,5)
      }
      res.json({success:true,dashData})
    } catch (error) {
      console.log(error);
    }
  };

 
  
export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard
};
