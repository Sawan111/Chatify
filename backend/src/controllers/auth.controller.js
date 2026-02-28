import User from "../models/User.js";
import bcrypt from "bcryptjs";

import {ENV} from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    generateToken(newUser._id, res);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(
      newUser.email,
      newUser.fullname,
      ENV.CLIENT_URL
    ).catch(err => {
      console.error("Error sending welcome email:", err);
    });

    return res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.log("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
   
  try{
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
      return res.status(400).json({message:"Invalid email or password"});
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.log("Error in login controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};