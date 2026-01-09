import httpStatus from "http-status";
import  User  from "../models/UserSchema.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/messaging.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid username or password" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({ token });
  } catch (error) {
    console.log("register error",error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

const register = async (req, res) => {
  console.log("register now",req.body);
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username:username });

    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name:name,
       username:username,
       email:`${username}@example.com`,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  }  catch (error) {
  console.log("REGISTER ERROR:", error);

  if (error.code === 11000) {
    return res
      .status(httpStatus.CONFLICT)
      .json({ message: "Username already exists" });
  }

  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong" });
}

};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Token is required" });
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid token" });
    }

    const meetings = await Meeting.find({
      user_id: user.username,
    });

    return res.status(httpStatus.OK).json(meetings);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  if (!token || !meeting_code) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Token and meeting code are required" });
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid token" });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    return res
      .status(httpStatus.CREATED)
      .json({ message: "Meeting added to history" });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export { login, register, getUserHistory, addToHistory };
