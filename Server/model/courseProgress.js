const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      
    compleatedVideos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubSection",
        }
    ]
});

module.exports = mongoose.model("CourseProgress" ,progressSchema);