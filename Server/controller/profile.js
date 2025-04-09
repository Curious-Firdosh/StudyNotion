const profile = require("../model/profile");
const user = require("../model/user")
const {uploadImageCloudinary} = require('../utils/imageUploader')
require('dotenv').config()

// Update Profile 
exports.editProfile  = async (req ,res) => {
    try{
        // featch Data 
         const {gender ,dateOfBirth =""  ,about =" " ,contactNumber , firstName = "", lastName = ""} = req.body;
        // get user id
        const userId = req.user.id;

         // validation
         if(!gender || !contactNumber || !userId  ){
             return res.status(401).json({
                success : false,
                message :  "Fields Are Missing"
            })
         }

         // also update user data 
         const User = await user.findByIdAndUpdate( userId, {
            firstName,
            lastName,
        })

        await User.save();


        // find Profile data 
        const userDetails = await user.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await profile.findById(profileId);

        // Update Profile  
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender ;
        profileDetails.contactNumber = contactNumber;
        // Save THat Object IN DB {second Method TO Save In DB} BECAOUSE if user is created then we have profile and and we created Profile When I SignUp To The WEBSITE
        await profileDetails.save();

        // return response 
        return res.status(200).json({
            success : true,
            DATA : profileDetails,
            message : "Profile Updated SuccessFully"
        });


    }
    catch(err){
        console.log("Error While Editing Profile" , err);

        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To Update Profile"
        })
    }
} 

// Delete Account
exports.deleteAccount = async(req,res) => {
    try{
            // Featch IDS 
            const id = req.user.id;

            // Validation 
            const userDetails = await user.findOne(id);

            if(!userDetails) {
                return res.status(401).json({
                    success : false,
                    message :  "User Not Found"
                })
            }

            // Find profile And Delete
             await profile.findByIdAndDelete({_id :userDetails.additionalDetails});
             // Delete User 
             await user.findByIdAndDelete({_id : id})

            // :TODO: --> Delete Student Enrolled Also
             // Send Response  
             return res.status(200).json({
                success : true,
                DATA : "DELETE Kar Diya To Kya Chahiye Choco",
                message : "Account Deleted SuccessFully"
             })
    }

    catch(err){
        console.log("Error While Deleting Profile" , err);

        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To Delete Profile"
        })
    }
};

//Get all User Additional Details  

exports.getAllUserDetails = async (req,res) => {
    
    try{
            // GET ID 
            const id = req.user.id
            // FETCH ALL DATA AND POPULATE 
            const userDetails = await user.findById(id).populate("additionalDetails").exec();
            // SEND Response 
            return res.status(200).json({
                success : true,
                DATA : userDetails,
                message : " User Data F"
             })
    }
    catch(err){
        console.log("Error While getting user Data" , err);

        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To GetAll User Details"
        })
    }
}

// updateDisplayPicture,
exports.updateDisplayPicture = async (req,res) => {
    
    try{
        // featch userid and display picture from request body 
        const displayPicture = req.files.displayPicture 
        const userId = req.user.id

        console.log("userID ❌❌" , userId);

        console.log("display Picture --<✅✅" , displayPicture);
        
        // Upload The Image In Claudinery 
        const image = await uploadImageCloudinary(
            displayPicture,
            process.env.FOLDER_NAME ,
            1000,
            1000
        );
        console.log("Image" , image);

        // Update The Profile With That Image
        const updatedProfile = await user.findByIdAndUpdate(
            {_id : userId},
            {Image : image.secure_url},
            {new : true}
        );

        // THen Send Response
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          }); 
        
    }
    catch(err){
        console.log("Error While Updating Display Picture" , err);

        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Error While Updating Display Picture "
        })
    }
};

//  getEnrolledCourses,

exports.getEnrolledCourses = async (req,res) => {

    try{

        const userId = req.User.id

        const userDetails = await user.findById({
            _id :userId
        })
        .populate("courses")
        .exec();

        if(!userDetails){
            return res.status(404).json({
                success :false,
                data : `could Not Find UserDetails From id ${userId}`
            })
        }

        return res.status(200).json({
            success : true ,
            data : userDetails.courses
        })
    }
    catch(err) {
        console.log("ERROR WHILE Featching ENROLLED COURSE" , err);
        res.status(500).json({
            success : false,
            data : "No Data Found",
            message : err.message
        })
        
    }
}


//  instructorDashboard,