const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
    },
    confirmPassword : {
        type : String,
        required : true,
        
    },
    accountType : {
        type : String ,
        enum : [ "Admin" , "Student" , "Instructer"],
        required : true,
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "Profile",
    },

    courses : [
        {
            type :mongoose.Schema.Types.ObjectId,
            ref : "Course",
        }
    ],
    token : {
        type : String
    },
    resetPasswordExpires :{
        type : Date
    },
    Image : {
        type : String ,
        required : true
    },

    active: {
        type: Boolean,
        default: true,
    },

    approved: {
        type: Boolean,
        default: true,
    },

    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'CourseProgress'
        }
    ],

  },
  // Add timestamps for when the document is created and last modified
  { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User" , userSchema);