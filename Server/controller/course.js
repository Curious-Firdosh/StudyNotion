const Course = require('../model/Course');
const User = require("../model/user");
const Category = require("../model/Category");
const {uploadImageCloudinary} = require("../utils/imageUploader");
const { findById } = require('../model/section');
const { json } = require('express');
require("dotenv").config();


// Create Course Handler 
exports.createCourse = async (req,res) => {
    
    try{
        // Featch Data 
        const {courseName ,courseDescreption , whatYouWillLearn , price , tag ,language , category} = req.body;

        // const thumbNail = req.files.thumbNail;

        console.log("details" , courseName ,courseDescreption ,whatYouWillLearn , price , tag ,language , category );
        

        //Do Validation With Featched Data
        if( !courseName || !price  || !category || !tag ){
            
            return res.status(401).json({
                success : false,
                message : "All Field Are Required",
            });
            
        };

        // Cheack For Instructer
        const userId = req.User.id;

        const instructerDetails = await User.findById(userId , {
            accountType: "Instructer",
        });
        console.log("instructerDetails" , instructerDetails);

        if(!instructerDetails){
            
            return res.status(404).json({
                success : false,
                message : "Instructer Details Not Found "
            });

        };

     // Cheack CATEGORY Is Valid Or Not
     const categoryDetails = await Category.findById(category);
     
     if(!categoryDetails){
            
        return res.status(404).json({
            success : false,
            message : "categoryDetails Not Found "
        });

    };

    // Upload Image in Cloudinery
    // const thumbnailImage = await uploadImageCloudinary(thumbNail , process.env.FOLDER_NAME);

    // Creat Entry fOR New Course
    const newCourse = await Course.create({
        courseName,
        courseDescreption,
        instructer:  instructerDetails._id,
        whatYouWillLearn :  whatYouWillLearn  , 
        price : price ,
        language  : language, 
        category: categoryDetails._id,
        // thumbNail : thumbnailImage.secure_url,
        tag : tag
    });

    // update User [instructer] add the new course to the instructer 
    await User.findByIdAndUpdate(
        {_id : instructerDetails._id},
        {
            $push : {
                courses : newCourse._id,
            }
        },
        {new : true}
    );

    // Update The Category Schema
    await Category.findByIdAndUpdate(
        {_id : category},
        {
            $push : {
                courses : newCourse._id,
            }
        },
        {new : true}
    );

    // Send Response 
    return res.status(200).json({
        success : true,
        message : "Course Created SuccesssFully",
        data : newCourse
    })

   }
    catch(err) {
        console.log("Error While Creating Course -->", err)
        res.status(500).json({
            success: false,
            message : `Course Creation Failed ❌❌ ${err}`
            
        })
    }
};

//Show All Course // get all course list 

exports.showAllCourses = async (req,res) => {
    
    try{
        const allCourses = await Course.find({},  {  courseName : true ,
                                                     instructer : true ,
                                                     price : true ,
                                                     ratingAndReviews :true ,
                                                     thumbNail :true ,
                                                     studentEnrolled : true
                                                  }).populate("instructer")
                                                    .exec();

        return res.status(200).json({
            success : true,
            message : "All Course Featchd SuccessFully",
            Deatails : allCourses
        });
    }
    catch(err) {
        console.log("Error While Featching All Course -->", err)
        res.status(500).json({
            success: false,
            message : "Something Went Wrong To Featch All Course ❌❌",
            data : err.message
        })
    }
}

// GET A Course Details all section subcetion 
exports.getCourseDetails = async (req,res) => {
    try{
            // Get Course Id 
            const {courseId} = req.body;

            const courseDetails = await Course.find( {_id : courseId})
                                                .populate(
                                                    {
                                                        path : "instructer",
                                                        populate : {
                                                            path : "additionalDetails",
                                                        },
                                                    }
                                                )
                                                .populate("category")
                                                // .populate("ratingAndReviews")
                                                .populate({
                                                     path : "courseContent",
                                                     populate : {
                                                        path : "subsections"
                                                     }
                                                }).exec();

            // Validation
            if(!courseDetails){
                return res.status(404).json({
                    success : false ,
                    message : `Could not Find The Course with ${courseId}`
                });
            }

            // Return The Response 
            return res.status(200).json({
                success : true ,
                Data : courseDetails,
                message :  "CourseDetails Finded SuccessFully"
            })
                                            
   
    }
    
    catch(err) {
        console.error("Error While Featching CourseDetails " , err)
        return res.status(404).json({
            success : false,
            message : err.message,
        });
    }
}

// get a list of course for a given instructer 
exports.getInstructerCourses = async(req,res) => {
    try {
        const instructerId = req.user.id 

        const InstructerCourses = await Course.find(
            {instructer : instructerId} )
            .sort({created : -1})
            // .populate("courses")
         
        return  res.status(200).json({
            success : true ,
            data : InstructerCourses,
         })
    }
    catch(err) {
        console.error("Error While Featching Instructer Course Details " , err)
        return res.status(404).json({
            success : false,
            message : err.message,
        });
    }
};

// Delete Course 

// Edit Course Deatails

exports.editCourse = async(req,res) => {
    try{

         const updates = req.body  // Data From Frontend Tha tIS IN the form we mad ein object 
         const {courseId} = req.body

         const course = await Course.findById(courseId)

         if(!course){
            return res.status(404).json({
                success: false,
                massege : "No Course Found"
            })
         }

         if(req.files){
              console.log("thumbnail update")
              const thumbnail = req.files.thumbNail
              const thumbnailImage = await uploadImageCloudinary(
                thumbnail ,
                process.env.FOLDER_NAME
              )
            Course.thumbNail = thumbnailImage.secure_url 
         }

        // Update only the fields that are present in the request body 
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    try {
                        if (typeof updates[key] === "string") {
                            course[key] = JSON.parse(updates[key]);
                        } else {
                            course[key] = updates[key]; // already an array/object
                        }
                    } catch (err) {
                        console.error(`Failed to parse ${key}:`, err);
                        return res.status(400).json({
                            success: false,
                            message: `Invalid format for ${key}. It should be a valid JSON array.`,
                        });
                    }
                } else {
                    course[key] = updates[key];
                }
            }
        }


          await course.save(); 

        const updatedCourse = await Course.findOne({
            _id: courseId,
        }).populate({
            path: "instructer",
            populate: {
                path: "additionalDetails",
            },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

      
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        }) 



    }
   catch (error) {
        console.error(error)
         res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
     }
}


