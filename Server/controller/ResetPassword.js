
const bcrypt = require("bcrypt")
const User = require("../model/user")
const mailSender = require("../utils/mailSender")
const crypto = require('crypto')


// Reset Password Token

exports.resetPasswordToken = async(req,res) => {
    
    try{
        
        // **get email from req.body
        const {email} = req.body
        
        // ** Cheack User For Email , Also do validation on EMAIL
        const userExist = await User.findOne({email});
        
        if(!userExist){
            return res.status(401).json({
                success : false,
                message : "You Are Not Registerd WIth US"
            })
        };
        // ** Genrate Token
        const token = crypto.randomUUID();

        //@@ Update User By Adding TOKEN AND EXPIRATION TIME
        const updatedDetails = await User.findOneAndUpdate(
                                                        {email : email},
                                                        {
                                                            token : token,
                                                            resetPasswordExpires : Date.now() + 5*60*1000
                                                        },
                                                        {new : true});

              
         // ** Create Url  
         const URL = `http://localhost:3000/update-password/${token}` ;                                           

        // ** Send Email Containing The url
        await mailSender(email , "Password Reset Link" , `Password Reset URL ${URL}`);
        
        // ** Return Response
        return res.status(200).json({
            success : true,
            message : "Email Sent SuccessFully Cheack And Change Password"

        })
        
    }
    catch(err){
        console.log("Error In The Reset Password Token" ,err)
        console.log("ERROR--->" , err)
        
        return res.status(500).json({
            succces: false,
            message : "Failed While Sending ResetPassword MAIL"
        })
    }
};

// Reset Password

exports.updatePassword = async (req,res) => { 
    
    try{
        // get token , password , confirmPassword
        const {password , confirmPassword , token} = req.body;

        // Do Validation
        if(password !== confirmPassword){
            return res.json({
                success : false,
                message : "Password not Matching"
            });
        };
        // Get User Details From DB using Token
        const userDetails = await User.findOne({token : token});

        //if no entry --> Invalid Token 
        if(!userDetails){
            return res.json({
                success : false,
                message : "Invalid Token"
            });
        }
        // Token Time Cheack
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success : false,
                message : " Token Is Expired"
            });
        };
        // Hash Password
        const hashPassword = await bcrypt.hash(password ,10)
        // update Password
        await User.findOneAndUpdate(
            {token : token},
            {password : hashPassword},
            {new:true}
        )
        // SeND Response
        return res.status(200).json({
            success : true,
            message: "Password Reset SuccessFully"
        })

   }
   catch(err){
        console.log("Error In The Reset Password" ,err)
        console.log("ERROR--->" , err)
        
        return res.status(500).json({
            succces: false,
            message : "Failed While Resetting Password"
        })
    }
}