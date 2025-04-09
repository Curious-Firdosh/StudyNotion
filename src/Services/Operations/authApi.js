import {toast} from  "react-hot-toast"

import { setToken , setLoading } from "../../Slices/authSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../APIs"
import { setUser } from "../../Slices/profileSlice"


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints
// Send Otp Api Request 
export const sendotp = (email,  navigate) => async(dispatch , getState) => {
        const toastId = toast.loading("Loading...")

        dispatch(setLoading(true));

        try{
            const result = await apiConnector("POST" , SENDOTP_API, {
                email ,
                userExist : true,
            })
            console.log("SENDOTP API RESPONSE............", result)
            console.log(result.data.success)

            if(!result.data.success) {
                throw new Error(result.data.message)
            }

            toast.success("OTP Sent SuccessFully ✅")
            navigate("/verify-email")

        }
        catch(error){
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)

};

// SignUp api Request
export const signup = (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
    ) => async(dispatch , getState) => {
        
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));

        try{
            console.log("getState" , getState());
            
            const response = await apiConnector("POST" , SIGNUP_API , {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE............", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
            
        }
        catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

// Login 
export const login = (email,  password , navigate) => async(dispatch ,getState) => {
        dispatch(setLoading(true));
    try{
         const response = await apiConnector("POST" , LOGIN_API , {
                email ,
                password
            })
            console.log("LOGIN API RESPONSE -->" ,  response);
            
            if(!response.data.success){
                throw new Error (response.data.message)
            }

            const user = response.data.User
            const Image = user.Image
            const Token = response.data.token
            
            
            toast.success("Login SuccessFully 🎉🎉 ")
            
            dispatch(setToken(Token))
            
            dispatch(setUser({...user , image : Image}))
            
            localStorage.setItem("token" , JSON.stringify(Token));
            localStorage.setItem("user" , JSON.stringify(user));

            navigate("/dashboard/my-profile")
            
        }
        catch(Error){
            console.log("ERROR WHILE FEATCHING API RESPONSE OF LOGIN --->" ,Error);
            toast.error("Login Failed ❌❌")
        }
        dispatch(setLoading(false));
       
        
}

// logOut 
export const logOut = (navigate) => (dispatch, getState) => {
    
    dispatch(setToken(null))
    dispatch(setUser(null))
    console.log(getState())
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Log Out SucessFully")
    navigate("/")
}

// Forgot Password Token
export const getPasswordResetToken = (email, setEmailSent) => async(dispatch , getState) => {
    
    dispatch(setLoading(true))

    try{
         const result = await apiConnector("POST" , RESETPASSTOKEN_API,  {email} )
         console.log(console.log("RESET PASSWORD TOKEN RESPONSE....", result));

         if(!result.data.success) {
            throw new Error(result.data.message)
         }
         toast.success("Reset Email Sent SuccessFully")
         setEmailSent(true)  
        }
    catch(error){
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
}
// Update Password Ui 
export const resetPassword = (password , confirmPassword , token , navigate) => async(dispatch) =>{
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST" , RESETPASSWORD_API , {
            password ,
            confirmPassword,
            token
        })
        console.log("RESET PASSWORD API RESPONSE --->" , response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if(password !== confirmPassword){
            toast.error("Password Does'nt Matched! ❌");
        }
        toast.success("Password has been  Updated SuccesFully")
        
        navigate("/login")
        
    }
    catch(error) {
        console.log("Error While Updating Password" , error);
        toast.error("Unable To Reset Password")
    }
    dispatch(setLoading(false))
}