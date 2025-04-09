
const OTP = require ("../model/OTP");
const otpGenerator = require("otp-generator");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const Profile = require("../model/profile");

const JWT = require("jsonwebtoken")
require("dotenv").config();

// sendOtp
exports.sendOtp = async(req,res) => {
    try{
        // Featch Email From Request Ki Body 
        const {email} = req.body;
        // Cheak If User Allready Exist YEHA PE EMAIL cHEAK karna hai db main
        const userExist = await user.findOne({email});
        
        

        if(userExist){
            return res.status(401).json({
                success : true,
                massege : "User Already Registered"
            }) 
        };

        // Generate OTP 
        var otp = otpGenerator.generate(6, {
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false
        });
        console.log(("generated OTP line 32 auth.js" , otp));
         

        //!! That Code We ARE using IS nOT fOR industry
        // MAKE Sure That OTP iS unique 
        var result  = await OTP.findOne({otp : otp});
        
        // Check Karo jabtak db main same otp nahi milta tabtal new otp genrate karo
        while(result){
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets : false,
                upperCaseAlphabets : false,
                specialChars : false
            });
            result  = await OTP.findOne({otp : otp});
        };

        // making otppayLoad
        const otpPayload = {email , otp};
        console.log("Payload- --> " , otpPayload);
        

        // making entry in Db For Otp
        const otpBody = await OTP.create(otpPayload)
        console.log("Saved at Otp Database line 53" ,otpBody);
        
        // Sending Response SuccessFully
        res.status(200).json({
            success : true,
            massege : " OTP sent Successfully",
            otp
        })
        
    }
    catch(error) {
        console.log("Error While Genrating OTP" , error);
        const err = console.error("ERROR --->",error);
        
        return res.status(500).json({
            success : false,
            massege : err
        })
    }
};

// SignUp
exports.signUp = async(req,res) => {
    
    try{
        // DATA featch from Request Body
        const { 
          email ,
          firstName ,
          lastName ,
          password,
          confirmPassword,
          accountType,
          contactNumber,
          otp       }  = req.body;

        // Validate Karo
        if(!email || !firstName ||
             !lastName || !password ||  !otp || !confirmPassword){

                return res.status(403).json({
                    success:false,
                    massege : "All Fields Are Required"
                });
            };
        
        // 2 password Match Karo 
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                massege : "Password And ConfirmPassword Is Not Same, Plzz TRY Again"
            });
        };
        // Cheak userExit Or not 
        const existingUser = await user.findOne({email});

        if(existingUser){
            res.json({
                success:false,
                massege : "User Already Registered "
            })
        };

        // fIND MOST RecentOTP FROM tHE User
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("RECENT OTP -->", recentOtp );
        
        // Validate otp // COMPARE DB.OTP == INPUTotp
        if(recentOtp.length == 0){
            //OTP NOT FOUND
            return res.status(400).json({
                success : false,
                massege : "Otp Not Found"
            });
        } else if(otp !== recentOtp[0].otp){
            // Invalid Otp
            return res.status(400).json({
                success : false,
                massege : "Invalid Otp"
            });
        };

        // HASH Password 
        const hashPassword = await bcrypt.hash(password , 10);

        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null
        });

        //creat EnTRY iN db
        const userEntry = await user.create({
            firstName ,
            lastName ,
            email ,
            password : hashPassword,
            confirmPassword : hashPassword , 
            accountType,
            contactNumber, 
            additionalDetails : profileDetails._id,
            Image : `https://api.dicebear.com/9.x/initials/svg?seed= ${firstName}${lastName}`
        })
        // return SUCCESSfULLY RESPONSE
        res.status(200).json({
            success : true,
            massege : "User Registerd SuccessFully",
            User : userEntry

        })


    }
    catch(err){
        console.log("Error While Signup To App" , err)
        console.error("ERRO --->" , err)

        return res.status(500).json({
            success : false,
            massege : "User Cannot Be Registerd PLZZ.... Try Again"
        })
    }
};

// login
exports.logIn = async (req,res) => {
    
    try{

        // Featch Data from request data
        const {email , password} = req.body;

        // Validation Data
        if(!email || !password){
            return res.status(400).json({
                success : false,
                massege : "All Field Are Required"
            });
        }

        // User Cheak Exist Or Not || populate is optional
        const  User = await user.findOne({email}).populate("additionalDetails");
        
        if(!User){
            return res.status(400).json({
                success : false,
                massege : "User Dosent Exist Plzzz SingUp First"
            });
        };


        // Genrate JWT tOken after pasword Match if YES
        if(await bcrypt.compare(password , User.password)) {

            const payload = {
                email : User.email,
                id : User._id,
                accountType : User.accountType
            };


            const token = JWT.sign(payload , process.env.JWT_SECRET , {
                expiresIn:"2h"
            });
            User.token = token;
            User.password = undefined;

            const options =   {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true
            }
 
            // Create COOKIE and send response
            res.cookie("token" , token , options).status(200).json({
                success:true,
                token,
                User,
                massege : "Logged In SuccessFully"
            })

        }
          // ELSE IF NOT MATCHED PASSWORD
        else {
            return res.status(401).json({
                success : false,
                mssege : "Password Is INCORRECT"
            })
        };
    


    }   
    catch(error){
        cosnole.log("Error While Login To App" , err)
        console.error("ERRO --->" , err)

        return res.status(500).json({
            success : false,
            massege : "Login Failure , plzz Try Again"
        })
    }
};

// Chanage Password
 exports.changePassword = async(req,res) => {

    try{
        //Get User Details  From Request Body 
        const userdetails = await user.findById(req.user.id)

        // Get Old Password amd NewPassword and Confirm Password 
        const {oldPassword , newPassword ,confirmPassword} = req.body

        //Validation 
        const isPasswordMatch = await bcrypt.compare(
            oldPassword ,
            userdetails.password
        );
        // if passwqord Not Matched Then Return Response 
        if(!isPasswordMatch){
            return res.status(403).json({
                success : true,
                message : "Password Not Matched Plzz Try Again"
            })
        };
    
        // update Password In Db
        const encryptedPassword = await bcrypt.hash(newPassword , 10 )
        const updatePasssword = await user.findByIdAndUpdate(
            req.user.id ,
            {password : encryptedPassword},
            {new : true}
        );

        // Send Mail Password Updated 
        

        // Return Response 
    }
    catch(err){

    }
 };
