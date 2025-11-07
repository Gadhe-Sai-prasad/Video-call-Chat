const {User} = require('../models/UserSchema')
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const crypto = require("crypto");



const login = async (req, res) => {
  const { userName, password } = req.body;
   if (!userName || !password) {
      throw new Error("Please enter valid details ");
    }
  try {
   
    const UserExisting = await User.findOne({ userName });
    if(!UserExisting){
        return res.status(404).json({message:"user not found"})
    }
    if(bcrypt.compare(password,UserExisting.password)) {
        let token = crypto.randomBytes.toString('hex');

        UserExisting.token= token;
        await UserExisting.save();
        return res.status(httpStatus.OK).json({token:token})
    }
  } catch (err) {}
};

const register = async (req, res) => {
  const { name, userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne(  { email });
    if (existingUser) {
      res.status(httpStatus.FOUND).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(httpStatus.CREATED).json({ message: "user Registered" });
  } catch (err) {
    res.json({ message: `Something went wrong ${err}` });
  }
};
module.exports= {login,register};
