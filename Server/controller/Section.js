const Section = require("../model/section");
const Course = require("../model/Course");


// Create Section
exports.createSection = async(req,res) => {
    try{
        // Fetch Data   
        const {sectionName , courseId} = req.body;

        // data Validation
        if(!sectionName || !courseId ) {
            return res.status(401).json({
                success : false,
                message : "All Fields Are Requiredl"
            })
        };
        // Create Section
        const newSection = await Section.create({sectionName})

        //update that section in course with object ID
        const updateCourseDetails = await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                        $push : {
                                                            courseContent : newSection._id
                                                        }
                                                    },
                                                    {new : true})
                                                    .populate ({
                                                        path : "courseContent",
                                                        populate : {
                                                          path : "Section"  
                                                        },
                                                    })
                                                    .exec()
        // Return Response
        return res.status(200).json({
            success : true,
            message : "Section Created SuccessFully ",
            updateCourseDetails
        })

    }
    catch(err) {
        console.log("Error Wihile Creating Section" ,err )

        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To  Create Section"
        })
    }
};


// Update Section 

exports.updateSection = async(req,res) => {
    try{
            //data fetch
            const {sectionName , sectionId} = req.body
            // Validation
            if(!sectionName ||  !sectionId){
                
                return res.status(401).json({
                    success : false,
                    message : "All Fields Are Requiredl"
                })
            }

            // Update Section 
             const updateSectionDetails = await Section.findByIdAndUpdate(
                                                             sectionId,
                                                             {sectionName},
                                                             {new:true}
             );
             // Send Response
             return res.status(200).json({
                success : true,
                message : "Section Updated SuccessFully ",
                updateSectionDetails
            })

     }
          
    catch(err) {
        console.log("Error Wihile Updating Section" ,err )

        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To  Update Section"
        })
    }
    
};

// Delete Section

exports.deleteSection = async(req , res) => {
    try{
         // feTCH Data
         const{sectionId}  = req.body;

         // find And Delete 
         const deleteSection = await Section.findByIdAndDelete(sectionId);
         // update thre course with updated section 
         
         // Send Response
         return res.status(200).json({
            success : true,
            message : "Section Deleted SuccessFully ",
            // updateSectionDetails
        })

    }
    catch(err) {
        console.log("Error While Deleting Section" , err);
        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To Delete  Section"
        })
    }
};