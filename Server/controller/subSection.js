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

            // create SUBSECTION    
            const subSectionDetails = await SubSection.create({
                title:title,
                // timeDuration : timeDuration,
                desc : desc,
                // videoUrl : UploadVideo.secure_url
            });

            // Update Section By SubSection OBJECT ID
            const updatedSection = await Section.findByIdAndUpdate(
                                                            sectionId,
                                                            {
                                                                $push: {
                                                                subsections: subSectionDetails._id
                                                                }
                                                            },
                                                            { new: true }).populate("subsections");




            // ✅ Get the course and populate deeply
            const course = await Course.findById(updatedSection.courseId)
                                                                    .populate({
                                                                        path: "courseContent",
                                                                        populate: {
                                                                        path: "subsections"
                                                                        }
                                                                    })
                                                                    .exec();


            // Send SuccessFull Response 
            return res.status(200).json({
                success: true,
                message: "SubSection Created Successfully",
                updatedCourseDetails: course
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

     const UpdatedSection = await section.findById(sectionId)
                                                .populate('subsections')
                                                .exec()

     return res.status(200).json({
        success : true ,
        data : UpdatedSection ,
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

            const UpdatedSection  = await section.findById(sectionId)
                                                  .populate("subsections")
            return res.json({
                success: true,
                message: "SubSection deleted successfully",
                data: UpdatedSection,
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
