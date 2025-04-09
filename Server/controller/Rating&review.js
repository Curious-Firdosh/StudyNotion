const ratingAndreviews = require("../model/ratingAndReview")
const course = require("../model/Course");
const Course = require("../model/Course");
const { default: mongoose } = require("mongoose");

// Create Rating
exports.createRating = async(req , res)=> {
        
    try{
                //get user id 
            const userId = req.user.id
            // featch user data from body 
            const { rating , review , courseId } = req.body;

            // cheak if user enrolled in course or not 
            const courseDetails = await course.findOne(
                                                {_id : courseId,
                                                studentEnrolled : {$elemMatch : {$eq : userId} }
                                                }
            );

            if(!courseDetails){
                return res.status(404).json({
                    success : false ,
                    message : `Student Is Not Enrolled In This Course`
                });
            };
            // cheack user already reviewd the course 
            const alreadyReviewd = await ratingAndreviews.findOne({
                                                    userId : userId,
                                                    courseId : courseId
            });

            if(alreadyReviewd){
                return res.status(403).json({
                    success : false ,
                    message : `Course Is Already Reviewd By User `
                });
            };
            // create Rating and Reviews 
            const ratingReview = await  ratingAndreviews.create({
                                                    rating,
                                                    review ,
                                                    Course : courseId,
                                                    ratingUser : userId
            });
            // update That IN coURSE With Rating aND rEVIEWS 
            const updateCourse = await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                        $push : {
                                                            ratingAndReviews : ratingReview._id,
                                                        }
                                                    }, 
                                                    {new : true});                 
                                                    
            // RETURN RESPONSE 
            return res.status(200).json({
                success : true,
                Data : ratingReview,
                message : "Rating And Review SuccessFully"
            })

    }
    catch(err){
            console.error("Error While Creating Review " , err)
                return res.status(500).json({
                success : false,
                message : err.message,
            });
        }

}
// get Average Rating 
exports.getAverageRating = async(req,res) => {
        
    try{
             // get CourseId
             const courseId = req.body.courseId
             // Calculate Average Rating 
             const result = await ratingAndreviews.aggregate([
                {
                    $match : {
                        course : new mongoose.Types.ObjectId(courseId)
                        //AISI ID FINOUT KARO JO KI IS COURSE ID KE EQUAL HO  
                    },
                },

                {
                     $group : {
                        _id : null, // ISKA M ATLAB HAMAIN NAHI PATAH KI GROUP KIS BASIS PE KARE TO HUMLOG AB JITNI BHI ENTRY AAYI HAI COURSE KI US HISAAB SE GROUP KARENGE
                        averageRating : {$avg  : "$rating"} // AND THEN WE EXTRACT AVERAGE OF THAT ALL COURSE ID RATING 
                    }
                } 
             
            ])
             // Return Rating
             if(result.length() > 0) {

                    return res.status(200).json({
                        success : true,
                        averageRating : result[0].averageRating
                })
             };

             // If No  Rating Review Exist 
             return  res.status(200).json({
                success : true ,
                averageRating : 0,
                massege : "Average Rating Is 0  , No Rating Given Till Now"

             })
       }
        catch(err){
            console.error("Average Review Review " , err)
                return res.status(500).json({
                success : false,
                message : err.message,
            });
        }
}

//getALL rATING and reviews 

exports.getAllRating = async(req,res) => {

    try{
        const allReveiw = await ratingAndreviews.find({})
                                                .sort({rating : "desc"}) // SORT KARO DESCENDING ORDER MAIN 
                                                .populate ({
                                                    path : "user" ,// YahA Error Ho Sakta hai 
                                                    select: "firstName lastName email Image "
                                                })
                                                .populate ({
                                                    path : 'course',
                                                    select : "courseName"
                                                })
                                                .exec();
            return res.status(200).json({
                success : true,
                massege : "All Reviews featched SuccessFully"
            })
    }

    catch(err){
        console.error("Getting All Review " , err)
            return res.status(500).json({
            success : false,
            message : err.message,
        });
    }
    
}


