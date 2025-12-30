const express = require("express");
const { login, register } = require("../Controllers/userController.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.route("/add_to_activity");
router.route("/get_all_activity");


module.exports = router;
