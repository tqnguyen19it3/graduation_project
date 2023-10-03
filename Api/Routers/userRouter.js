const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/singup", authController.signUp);
router.route("/login", authController.login);

module.exports = router;