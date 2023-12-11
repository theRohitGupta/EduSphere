const express = require('express');
const router = express.Router();

const {createCourse,updateCourse, getAllCourses, getCourseDetails, getInstructorCourses, deleteCourse, getFullCourseDetails} = require("../controllers/Courses");
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Categories");
const {addSection, updateSection, deleteSection} = require("../controllers/Sections");
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");
const {createRating, getAverageRating, getAllRatings} = require("../controllers/RatingAndReview");

const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth");
const { updateCourseProgress } = require('../controllers/CourseProgress');

// ************************************************************************************************************************************************************************
//                                                              ALL COURSE RELATED ROUTES
// ************************************************************************************************************************************************************************

// COURSES ROUTE CAN ONLY BE ACCESSED BY INSTRUCTOR
router.post("/createCourse", auth, isInstructor, createCourse);

router.put("/updateCourse", auth, isInstructor, updateCourse);

router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// GET ALL COURSES ROUTE
router.get("/getAllCourses", getAllCourses);

// GET INSTRUCTOR COURSES ROUTE
router.get("/getAllInstructorCourses",auth, isInstructor, getInstructorCourses);

// GET ANY COURSE
router.post("/getCourseDetails", getCourseDetails);

// GET FULL COURSE DETAILS AUTHENTICATED API
router.post("/getFullCourseDetails", auth, getFullCourseDetails)



// ************************************************************************************************************************************************************************
//                                                              ALL SECTION RELATED ROUTES
// ************************************************************************************************************************************************************************

// SECTIONS CAN ONLY BE ADDED BY INSTRUCTOR
router.post("/addSection", auth, isInstructor, addSection);

// UPDATE SECTION
router.put("/updateSection", auth, isInstructor, updateSection);

// DELETE SECTION
router.put("/deleteSection", auth, isInstructor, deleteSection);




// ************************************************************************************************************************************************************************
//                                                              ALL SUBSECTION RELATED ROUTES
// ************************************************************************************************************************************************************************

// SUBSECTION CAN ONLY BE CREATED BY INSTRUCTOR
router.post("/createSubSection", auth, isInstructor, createSubSection);

// UPDATE SUBSECTION
router.put("/updateSubSection", auth, isInstructor, updateSubSection);

// DELETE SUBSECTION
router.put("/deleteSubSection", auth, isInstructor, deleteSubSection);



// ************************************************************************************************************************************************************************
//                                                              ALL CATEGORY RELATED ROUTES
// ************************************************************************************************************************************************************************

// CREATE CATEGORY ROUTE CAN ONLY BE DONE BY ADMIN
router.post('/createCategory', auth, isAdmin, createCategory);

// SHOW ALL CATEGORIES ROUTE
router.get("/showAllCategories", showAllCategories);

// GET CATEGORY PAGE DETAILS
router.post("/categoryPageDetails", categoryPageDetails);




// ************************************************************************************************************************************************************************
//                                                              ALL RATING RELATED ROUTES
// ************************************************************************************************************************************************************************

// CREATE RATING
router.post('/createRating', auth, isStudent, createRating);

// GET AVG RATING
router.get("/getAvgRating", getAverageRating);

// GET ALL RATINGS
router.get("/getAllRatings", getAllRatings);


// ************************************************************************************************************************************************************************
//                                                              COURSE PROGRESS RELATED ROUTES
// ************************************************************************************************************************************************************************

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

module.exports = router;