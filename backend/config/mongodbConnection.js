const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to Database.");
  } catch (error) {
    console.log("Error connecting to database.", error);
    return res.status(400).json({ success: false, message: "Error connecting to dattabase."})
  }
}


module.exports = connectMongoDB;