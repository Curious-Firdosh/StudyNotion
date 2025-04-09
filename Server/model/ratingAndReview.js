const mongoose = require("mongoose")

const RatingSchema = new mongoose.Schema({
    // Yhaa Error AAA sAKTA HAI 
    user : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    ],

    rating : {
        type : Number,
        required : true
     },

    review : {
        type: String,
        required : true
    },

    course : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "Course",
        index : true
    },

});

module.exports = mongoose.model("RatingAndReviews" , RatingSchema);