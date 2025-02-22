import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set up event listener for connection success
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connection to MongoDB established");
  } catch (error) {
    console.error("❌Error connecting to the database:", error.message);
  }
};
export default connectDB;
