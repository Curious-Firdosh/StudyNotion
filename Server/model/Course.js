// Import the Mongoose library
const mongoose = require("mongoose");

// Define the Course schema using the Mongoose Schema constructor
const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
    },
    courseDescreption : {
        type : String,
    },
    instructer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,                            
    },

    whatYouWillLearn : {
        type : String,
    },

    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section"
        }
    ],

    ratingAndReviews : [
        {
           type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReviews"
        }
    ],

    price : {
        type : String,
    },
    thumbNail : {
        type : String,
    },

    tag: {
		type: [String],
		required: true,
	},

    category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},

     studentEnrolled : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
     }],

     language : {
        type : String,
     },

    instructions: {
		type: [String],
	},

	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    
	createdAt: {
		type:Date,
		default:Date.now
	},
});

module.exports = mongoose.model("Course" ,courseSchema);



