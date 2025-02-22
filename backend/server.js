import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables FIRST

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app=express();
const port=process.env.PORT||4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors({ origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'atoken'] }))
    app.use(express.urlencoded({ extended: true })); // ✅ Add this line

//api endpoints
app.use('/api/admin',adminRouter)//localhost:4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)//localhost:4000/api/doctor/register
app.use('/api/user',userRouter)//localhost:4000/api/user/login
console.log("✅ Routes Loaded");
//console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.get('/',(req,res)=>{
    res.send("API working")
})
app.use((err, req, res, next) => {
    console.error("🔥 Uncaught Error:", err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

app.listen(port,()=>console.log("Server started at PORT",port))