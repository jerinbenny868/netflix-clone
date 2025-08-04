import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    // Check if the user already exists
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({
      username: username,
    });

    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      image,
    });

    // Generate a token and set it in a cookie

    generateTokenAndSetCookie(newUser._id, res);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: "",
      },
    });

    // Send the response
  } catch (error) {
    console.log("Error on Sign Up Controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    // Check if the user already exists
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token and set it in a cookie

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error on Login Controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error on Logout Controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function authCheck(req, res) {
  try {
    console.log("req.user", req.user);

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("Error on Auth Check Controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
