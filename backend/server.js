const express = require('express');
const cors = require("cors");
const authRouter = require("./routes/auth.js");
const connectMongoDB = require("./config/mongodbConnection.js");
const dotenv = require("dotenv");
const noteRouter = require("./routes/notes.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server is running on port ${PORT}`);
});