const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();

router.post("/singup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;