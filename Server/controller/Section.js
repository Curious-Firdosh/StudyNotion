const Section = require("../model/section");
const Course = require("../model/Course");
const SubSection = require("../model/subSection")


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
                                                          path : "subsections"  
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
            const {sectionName , sectionId , courseId} = req.body
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

             // UPdate The Course With Section
             const course = await Section.findByIdAndUpdate(courseId).
                                                            populate({
                                                                path : "courseContent",
                                                                populate :{
                                                                    path: "subsections"
                                                                },
                                                            })
                                                            .exec();
             // Send Response
             return res.status(200).json({
                success : true,
                message : `"Section Updated SuccessFully " ${updateSectionDetails}`,
                data : course
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
         const{sectionId ,courseId}  = req.body;

         await Course.findByIdAndUpdate(courseId , 
            {
                $pull : {
                    courseContent : sectionId
                }
            }
         )

         const section = await Section.findById(sectionId)
         console.log(sectionId , courseId);

         if(!section) {
            return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
         }

         	//delete sub section
		    await SubSection.deleteMany({_id: {$in: section.subsections}});

         

         // find And Delete 
         const deleteSection = await Section.findByIdAndDelete(sectionId);
         // update thre course with updated section 
         
         const course = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {
                path: "subsections"
            }
         })
         .exec()
         
         // Send Response
         return res.status(200).json({
            success : true,
            message : "Section Deleted SuccessFully ",
            data : course
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