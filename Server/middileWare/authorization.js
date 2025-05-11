// Means Instructer, student , Or Admin
const JWT = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user");


// authoRization We Are VERIFYING Token
exports.auth = async(req,res,next ) => {
    
    try{
        const token = req.cookies.token || req.body.token 
                                        || req.header("Authorization")?.replace("Bearer ", "").trim();  

        // If TOken Missing Then Return Response
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token Is Missing"

            });
        };
        // Verify The Token
        try{

            const decode = JWT.verify(token , process.env.JWT_SECRET) 
            console.log("decode" , decode); 
            req.User = decode;
            console.log(req.User);
            
            
        }
        catch(err){
            return res.status(400).json({
                success : false,
                message : "Token is InValid"
                
            })
        };
        next();

    }
    catch(error){
        console.log("Error while Validating The Token " , err)
        console.error("ERROR --->" , err)

        return res.status(401).json({
            success : false,
            massege : "Something Went Wrong while Validating The Token "
        })
    };
}


// IsStudent
exports.isStudent = async(req,res,next) =>{
    try{
        console.log("User"  , req.User.accountType);
        
        if(req.User.accountType !== "Student"){
            return res.status(401).json({
                success : false,
                massege : "This Route Is Protected For Student "
            });
            
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success : false,
            massege : "User Role Cant Be Verified Plzzz Try Again "
        })
    }
}

// IsInstructer
exports.isInstructer = async(req,res,next) => {
    
    try{
        
        
        console.log("UserDetails" , req.User.accountType);
        
        if( req.User.accountType !== "Instructer"){
            return res.status(401).json({
                success : false,
                massege : "This Route Is Protected For Instructer "
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            massege :  `User Role Cant Be Verified Plzzz Try Again ${err}`
            
        })
    }
}

// isAdmin
exports.isAdmin = async(req,res,next) => {
    
    try{


        if(req.User.accountType !== "Admin"){
            return res.status(401).json({
                success : false,
                massege : "This Route Is Protected For Admin "
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            massege : `User Role Cant Be Verified Plzzz Try Again ${err}`
        })
    };
}