import mongoose from "mongoose";
import validator from "validator";




const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,

    },
    username: {
        type:String,
        trim:true,
        required:true,
        unique:true

    },
    email: {
        type:String,
        trim:true,
        uniqure:true,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:"please provide a valid email address"

        }

    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
})
const User = mongoose.model("User",userSchema);
export default User;