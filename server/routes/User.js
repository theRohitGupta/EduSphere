const express = require('express');
const router = express.Router();

const {sendOTP , signUp, login, changePassword} = require('../controllers/Auth');

const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth");

const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

// ROUTES FOR LOGIN, SIGNUP, AND AUTHENTICATION


// ****************************************************************************************************************
//                                                              AUTHENTICATION ROUTES
// ****************************************************************************************************************

// ROUTE FOR USER LOGIN
router.post("/login", login);

// ROUTE FOR USER SIGNUP
router.post("/signup", signUp);

// ROUTER FOR SENDING OTP TO USER EMAIL
router.post("/sendotp", sendOTP);

// ROUTER FOR CHANGING THE PASSWORD
router.post("/changepassword",auth, changePassword);


// ****************************************************************************************************************
//                                                              RESET PASSWORD
// ****************************************************************************************************************

// ROUTE FOR GENERATING A RESET PASSWORD TOKEN
router.post("/reset-password-token", resetPasswordToken);

// ROUTE FOR RESETTING USER PASSWORD AFTER VERIFICATION
router.post("/reset-password", resetPassword);


// EXPORT ROUTER FOR USE
module.exports = router;
