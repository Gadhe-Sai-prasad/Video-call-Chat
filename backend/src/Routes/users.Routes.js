 import express from "express";
import { login, register } from "../Controllers/userController.js";

const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/add_to_activity",(req,res) => {
    res.json({message:"route not implemented yet"});
});
router.get("/get_all_activity", (req,res) => {
    res.json({message:"route not implemented yet"});
});

export default router;
