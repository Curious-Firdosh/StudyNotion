import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { Link, useNavigate  } from 'react-router-dom'
import { sendotp, signup } from '../Services/Operations/authApi'

const VerifyEmail = () => {

    const [otp , setOtp] = useState("")
    const {loading , signupData} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(() => {
        if(!signupData){
            navigate("/signup")
        }
    },[])


    const handleOnChange = (e) => {
        e.preventDefault();

        const{
            accountType,
            firstName,
            lastName,
            email,
            Password,
            confirmPassword,
    
        } = signupData
    

         dispatch(signup(accountType,firstName,lastName,email,Password, confirmPassword, otp , navigate));
        
        
   }


return (
    <div className="flex items-center justify-center min-h-screen ]">
            {loading ? (
                <h1 className="spinner">Loading...</h1>
            ) : (
            <div className="flex flex-col gap-6 items-center w-11/12 max-w-[500px] text-center">
               
               <div className='text-left pl-20 flex flex-col gap-3'>
                    <h1 className="text-white text-3xl font-bold ">Verify email</h1>
                    <p className="text-[#AFB2BF] text-[16px] w-[85%] ">
                        A verification code has been sent to you. Enter the code below
                    </p>
                </div>
        
                <form onSubmit={handleOnChange} className="flex flex-col items-center gap-4">
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                    width: "50px",
                    height: "50px",
                    margin: "5px",
                    fontSize: "20px",
                    borderRadius: "8px",
                    border: "1px solid #000",
                    backgroundColor: "#1E2738",
                    color: "white",
                    textAlign: "center",
                    }}
                />
        
                    <button
                        type="submit"
                        className="bg-[#FFD60A] text-black py-3 px-6 rounded-md w-full"
                    >
                        Verify and Register
                    </button>
                </form>

                    <div className='flex gap-36'> 
                        <Link to="/login" className="text-white ">
                        ← Back to login
                        </Link>
            
                        <button
                            onClick={() => dispatch(sendotp(signupData.email, navigate))}
                            className="text-[#00AEEF]  flex items-center gap-1"
                        >
                        🔄 Resend it
                        </button>
                    </div>
                
            </div>
            )}
  </div>
  
    )
}

export default VerifyEmail
