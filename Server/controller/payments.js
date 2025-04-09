// const {instance} = require("../config/razorpay");
// const Course = require("../model/Course");
// const User = require("../model/user");
// const mailsender = require("../utils/mailSender");
// const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
// const { default: mongoose } = require("mongoose");
// const crypto= require("crypto");
// const { default: webhooks } = require("razorpay/dist/types/webhooks");
// const user = require("../model/user");

// // Capture The Payment And Initiate The Payment 
// exports.capturePayment = async(req , res) => {
 
//             // get courseId And UserId  
//             const {course_Id} = req.body;
//             const userId = req.user.id;

//             // validation on courseId And Userid
//             if(!course_Id ){
//                 return res.status(404).json({
//                     success : false,
//                     message : "Plzzzz Provide Valid CourseId"
//                 });
//             }

//             // Validate CourseDetails
//             let course;
//             try{
//                 course = await Course.findById({course_Id});
                
//                 if(!course){
//                     return res.status(404).json({
//                         success : false,
//                         message : "Could Not Find Course"
//                     })
//                 };

//                 // Cheack User Already Not Payed For ThE  Same Course
//                 const uid = new mongoose.Types.ObjectId(userId);
//                 if(course.studentEnrolled.includes(uid)){
//                     return res.status(200).json({
//                         success : false,
//                         message : "Student Is Already Enrolled"
//                     })
//                 }

//             }
//             catch(err){
//                 console.error("Error While Validating Course Details", err)
//                 return res.status(404).json({
//                     success : false,
//                     message : err.message,
//                 });
//             };

//             // 1.Create Order 
//             const amount = course.price;
//             const currency = "INR";

//             const options = {
//                 amount : amount * 100,
//                 currency ,
//                 receipt : Math.random(Date.now()).toString(),
//                 notes : {
//                     courseId : course_Id,
//                     userId,
//                 }
//             };

//          // 2.Payment Initiated BY If ErrOR nOT occured
//                 try{
//                      //*initiate Payment Using RazorPay 
//                      const paymentResponse = await instance.orders.create(options); 
//                      console.log(paymentResponse);

//                      return res.status(200).json({
//                         success : true,
//                         courseName : course.courseName,
//                         courseDescreption : course.courseDescreption,
//                         Thumbnail : course.thumbNail,
//                         orderId : paymentResponse.id,
//                         currency : paymentResponse.currency,
//                         amount :  paymentResponse.amount,
//                         message : "Payment SuccessFull ✅✅ "
//                      })
//                 }
//                 catch(Err){
//                     console.error("Could'nt Initiate Payment" , Err);
//                     return res.status(501).json({
//                         success : false,
//                         message : Err.message,
//                     });
//                 }
    
// };


// // Verify Signature of RazorPay and server 

// exports.verifySignature = async (req,res) => {
//     // Send WebHook Secret  
//     const WebHookSecret = "897672";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256" ,WebHookSecret )
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     // Validation  if Matched 
//     if(signature === digest) {
//         console.log("Payment Is Authorised")

//         const {courseId , userId } = req.body.payload.payment.entity.notes;

//         try{

//                 // find THe COurse And Enroll THe Student On It
//                 const  enrolledCourse = await Course.findByIdAndUpdate(
//                                                                 {_id : courseId},
//                                                                 {$push : {studentEnrolled : courseId} },
//                                                                 {new : true}
//                 )

//                 if(!enrolledCourse){
//                     return res.status(404).json({
//                         success : false ,
//                         message : "Course Not Found"
//                     })
//                 };

//                 console.log( " enrolledCourse --> " ,enrolledCourse);

//                 // Find The students and the courses  and update there list of enrolled courses
//                 const enrolledStudent = await User.findOneAndUpdate(
//                                                     {_id : userId},
//                                                     {$push : {
//                                                         courses : courseId
//                                                     }},
//                                                     {new : true}
//                 );

//                 console.log( "  enrolledStudent --> " , enrolledStudent);

//                 if(!enrolledStudent){
//                     return res.status(404).json({
//                         success : false ,
//                         message : "Student/USER Not Found"
//                     })
//                 };


//                 // MAIL SEND KARDO CONFIRMATION KA 
//                 const  emailResponse = await mailsender(
//                         enrolledStudent.email ,
//                         "The Message From The CEO Firdosh Khan ",
//                         "Congratulations 🎉🎊🍾 , you are onboarded into new CodeHelp Web Development Course"
//                 );
//                 console.log('emailResponse -->',emailResponse)

//                 return res.status(200).json({
//                     success : true ,
//                     message : "Signature Verified And Course ADDED 😊😊😊"
//                 })

//         }
//         catch(err){
//             console.error("Student Not Enrolled After Payment Also Done" , err);

//             return res.status(500).json({
//                 success : false ,
//                 message : "UnAble TO add Student"
//             })
//         }

//     } // If Not Matched 
    
//     else{
//         return res.status(400).json({
//             success : false,
//             message : "Invalid Request"
//         })
//     }
    
// }


