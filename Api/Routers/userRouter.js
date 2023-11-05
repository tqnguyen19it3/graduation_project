const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

// Middleware
const auth = require('../middlewares/authMiddleware');

router.post("/singup", authController.signUp);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.get("/user-profile", [auth.isAuthentication], userController.userProfile);
router.put("/change-password", [auth.isAuthentication], userController.changePassword);
router.put("/change-profile-info", [auth.isAuthentication], userController.changeProfileInfo);

module.exports = router;