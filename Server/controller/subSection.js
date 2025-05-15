const section = require("../model/section");
const Section = require("../model/section");
const subSection = require("../model/subSection");
const SubSection = require("../model/subSection");
const {uploadImageCloudinary} =require("../utils/imageUploader")
const Course = require('../model/Course')

require("dotenv").config()
// Create SubSection 

exports.createSubsection = async(req,res) => {
    try{
            // data Fetch From Subsection FoR Input 
            const { title  , desc ,sectionId } = req.body;

            //EXTARCT Video FroM Files
            // const video = req.files.videoFile;

            // data Validation also add //video || !timeDuration
            if( !title || !desc  ||!sectionId) {
                return res.status(401).json({
                    success : false,
                    message : "All Fields Are Requiredl"
                })
            };
            // upload Video TO Cloudinary and then give URL
            // const UploadVideo = await uploadImageCloudinary(video ,process.env.FOLDER_NAME);

            // Step 1: Update the section
            const subsectionDetails = await SubSection.create({
                title : title,
                desc : desc
            })

            await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: { subsections: subsectionDetails._id }
            },
            { new: true }
            );


            const section = await Section.findById(sectionId)
            
            if (!section) {
                return res.status(404).json({
                    success: false,
                    message: "Section Not Found",
                });
            }
            const sectionCourseId = section.course

            const UpdatedCourse = await Course.findById(sectionCourseId)
                                                        .populate({
                                                            path : "courseContent",
                                                            populate : {
                                                                path : "subsections"
                                                            }
                                                        }).exec()

            // Send SuccessFull Response 
             return res.status(200).json({
                success: true,
                message: "SubSection Created Successfully",
                data: UpdatedCourse
            });

           

    }
    catch(err) {
        console.log("Error While Creating SUBSection" , err);
        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To Create SUBSection"
        })
    }
};

// Update SubSection
exports.updateSubsection = async(req,res) => {
    try{
        const { sectionId, subSectionId, title, description } = req.body

        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
          }
      
        if (description !== undefined) {
            subSection.desc = description
        }

        // if(req.files && req.files.videoFile !== undefined) {
        //     const video = req.files.video
        //     const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        //     subSection.videoUrl = uploadDetails.secure_url ,
        //     subSection.timeDuration = `${uploadDetails.duration}`
        // }

        
     await subSection.save();

     const UpdatedSection = await Section.findById(sectionId)
                                                .populate('subsections')
                                                .exec()

     const sectioncourseId = UpdatedSection.course 
     console.log(sectioncourseId )
     const UpdatedCourse = await Course.findById(sectioncourseId)
                                        .populate({
                                                path : "courseContent",
                                                populate : {
                                                path : "subsections"
                                                }
                                            }).exec()

     return res.status(200).json({
        success : true ,
        data : UpdatedCourse,
        message: "Section updated successfully",
     })
}
    catch(err) {
        console.log("Error While Updating SubSection" , err);
        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Unable To Update SUBSection"
        })
    }
    
}
// Delete SubSECTION

exports.deletesubSection = async (req,res) => {

    try{
            const {subSectionId , sectionId} = req.body

            await Section.findByIdAndUpdate({ _id: sectionId } , {$pull : {subsections : subSectionId}} , {new : true})

            const deleteSubSection = await SubSection.findByIdAndDelete({_id : subSectionId})

            if (!deleteSubSection) {
                return res
                  .status(404)
                  .json({ success: false, message: "SubSection not found" })
              }

            const UpdatedSection  = await Section.findById(sectionId)
                                                  .populate("subsections")


             const sectioncourseId = UpdatedSection.course 
            const UpdatedCourse = await Course.findById(sectioncourseId)
                                        .populate({
                                                path : "courseContent",
                                                populate : {
                                                path : "subsections"
                                                }
                                            }).exec()
            return res.json({
                success: true,
                message: "SubSection deleted successfully",
                data: UpdatedCourse,
              })
    }
    catch(err) {
        console.log("Error While Deleting SubSection" , err);
        return res.status(500).json({
            success : false,
            data : err.message,
            message : "Error Occured While Deleting SUBSection"
        })
    }
    
}
