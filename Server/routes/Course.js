const express = require('express')
const router = express.Router();

// !!  Import the Controllers 

// Course Controllers Import
const {
    createCourse,
    showAllCourses,
    getCourseDetails
} = require("../controller/course")

// Categories Controllers Import 

const {
    createCategory ,
    showAllCategories ,
    categoryPageDetails
} = require("../controller/Category")

// Sections Controllers Import 

const {
    createSection ,
    updateSection,
    deleteSection
} = require("../controller/Section")

// Sub-Sections Controllers Import 

const {
    createSubsection,
    updateSubsection,
    deletesubSection
} = require("../controller/subSection")


// Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating,
  } = require('../controller/Rating&review')

// // Course Progress
//   const {
//     updateCourseProgress
//   } = require("../controllers/courseProgress");

// Importing Middlewares 
const { auth, isInstructer, isStudent, isAdmin } = require("../middileWare/authorization")


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructer, createCourse)

//Add a Section to a Course
router.post("/addSection", auth, isInstructer, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructer, updateSection)

// Delete a Section
router.post("/deleteSection", auth, isInstructer, deleteSection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructer, updateSubsection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructer, deletesubSection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructer, createSubsection) 

// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)

// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// *!!! That is not implemetned yet 

// ********************************************************************************************************
    // // Get Details for a Specific Courses
    // router.post("/getFullCourseDetails", auth, getFullCourseDetails)
    // // Edit Course routes
    // router.post("/editCourse", auth, isInstructor, editCourse)
    // // Get all Courses Under a Specific Instructor
    // router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
    // // Delete a Course
    // router.delete("/deleteCourse", deleteCourse)

    // router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router
