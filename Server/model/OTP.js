const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
       type : String,
       required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },

});

// a Function  To Seding Otp Fro VERIFICATION  [We Are Writing Pre Save Middilware ]

async function sendingVerificationMail (email,otp) {

    try{
        const mailResponse = await mailSender(
            email , 
            "VeriFication Email From LerningWorld" , 
            emailTemplate(otp)
        );

       console.log("Email Sent SuccessFully"  , mailResponse);
    }
    catch(ErroR){
        console.error("The Error is ==>" , ErroR)
        console.warn("The Error Is In OTP model ❌❌❌" , ErroR )
    };
};

OTPSchema.pre("save" , async function(next) {
    await sendingVerificationMail(this.email , this.otp);
    next();
})



module.exports = mongoose.model("OTP" ,OTPSchema);