const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const middleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Wrong token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newUser = { name: user.name, email: user.email, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error when verifying user." });
  }
}

module.exports = middleware;