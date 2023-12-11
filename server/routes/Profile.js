const express = require("express");
const router = express.Router();

const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth");

const {updateProfile, deleteProfile, getUserDetails, updateDisplayPicture, getEnrolledCourses, updatePassword, unEnrollCourse, instructorDashboard} = require("../controllers/Profile");

// ****************************************************************************************************************
//                                                              PROFILE ROUTES
// ****************************************************************************************************************

// ROUTE FOR UPDATING USER PROFILE
router.put("/updateProfile", auth, updateProfile)

// ROUTE FOR DELETE USER ACCOUNT
router.delete("/deleteProfile",auth, deleteProfile);

// ROUTE FOR UNENROLLING COURSE
router.post("/unEnrollCourse", auth, isStudent, unEnrollCourse);

// ROUTE FOR GETTING ALL USER DETAILS
router.get("/getUserDetails", auth, getUserDetails);

// ROUTE FOR UPDATING PROFILE PICTURE
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// ROUTE FOR GETTING ENROLLED COURSES
router.get("/getEnrolledCourses", auth,isStudent, getEnrolledCourses);

// ROUTE FOR UPDATING PASSWORD
router.put("/updatePassword",auth, updatePassword);

// ************************************************************************************************************************************************************************
//                                                              COURSE PROGRESS RELATED ROUTES
// ************************************************************************************************************************************************************************

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router;