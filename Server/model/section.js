const mongoose = require("mongoose");

const  SectionSchema = new mongoose.Schema({
    
    sectionName : {
        type : String,
    },
    subsections : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubSection",
            required : true
        }
    ],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
  
});

module.exports = mongoose.model("Section" , SectionSchema)