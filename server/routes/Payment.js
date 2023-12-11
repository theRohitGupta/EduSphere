const express = require("express");
const router = express.Router();

const { capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../controllers/Payments");

const {auth, isStudent } = require("../middlewares/auth");

// ****************************************************************************************************************
//                                                             RAZORPAY ROUTES
// ****************************************************************************************************************

// ROUTE FOR RAZORPAY CAPTURE PAYMENT
router.post("/capturePayment", auth, isStudent, capturePayment);

// ROUTE FOR VERIFYING SIGNATURE
router.post("/verifyPayment",auth, isStudent, verifyPayment);

// SEND PAYMENT SUCCESSFULL MAIL
router.post("/sendPaymentSuccessEmail",auth, isStudent, sendPaymentSuccessEmail)

module.exports = router;