const express = require("express");
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");
const router = express.Router();

router.post("/singup", authController.signUp);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.get("/user-profile/:id", userController.userProfile);
router.put("/change-password/:id", userController.changePassword);
router.put("/change-profile-info/:id", userController.changeProfileInfo);

module.exports = router;