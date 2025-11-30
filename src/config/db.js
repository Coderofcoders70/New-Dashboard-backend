require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("Missing MONGO_URI in .env");
    }

    await mongoose.connect(uri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
