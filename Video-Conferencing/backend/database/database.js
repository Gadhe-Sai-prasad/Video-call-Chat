import mongoose from "mongoose";

const mongourl = "mongodb://localhost:27017/saipp";

export const ConnectDb = async () => {
  try {
   
    await mongoose.connect(mongourl);
    console.log("connected to Database");
  } catch (err) {
    console.log("unable to connect to database", err.message);
  }
};
