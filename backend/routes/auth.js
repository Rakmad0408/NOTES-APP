const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../middlewares/middleware.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if(user){
      return res.status(400).json({success: false, message: "User already exists."})
    }
    const hashPassword = await bcrypt.hash( password, 12);
    const newUser = new User({
      name, email, password: hashPassword
    });

    await newUser.save();
    return res.status(200).json({ success: true, message: "Account created successfully."})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Error adding user."})
  }
});



router.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({ success: false, message: "User does not exists"});
    }

    const isMatch = await bcrypt.compare( password, user.password );

    if(!isMatch){
      return res.status(401).json({ success: false, message: "Invalid Email or Password."});
    }

    const token = jwt.sign( { id: user._id, email}, process.env.JWT_SECRET_KEY, { expiresIn: "5h"});

    return res.status(200).json({ success: true, message: "Login successful", token, user: {name: user.name} })


  }catch(error){
    console.log(error);
    return res.status(500).json({ success: false, message: "Error logging in user."})
  }
})



router.get("/verify", middleware, async (req, res) => {
  return res.status(200).json( { success: true, user: req.user } );
})

module.exports = router;