import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {getPasswordResetToken} from "../Services/Operations/authApi"
import { FaArrowLeftLong } from "react-icons/fa6";



const ForgotPassword = () => {
  
  const dispatch = useDispatch()

  const [emailSent , setEmailSent] = useState(false)
  const [email , setEmail] = useState("")
  const {loading} = useSelector((state) => state.auth)

  const submitHandler = (e) => {    
    e.preventDefault();
    dispatch(getPasswordResetToken(email , setEmailSent))

  }



  return (
    <div className='text-white flex flex-col justify-center items-center  min-h-screen '>
          
          <div >
              {
                loading ? (
                  <h1 className='spinner'>Loading...</h1>
                ) : (
                  <div className='flex flex-col items-center justify-center gap-5 w-11/12 max-w-[500px] '> 
                      
                    <div className='text-left flex flex-col gap-3 pl-16'>
                      <h1 className='text-3xl font-semibold '>
                            {
                              !emailSent ? "Reset your password" : "Check email"
                            }
                      </h1>

                        <p className='text-richblack-400 text-inter text-md'>
                            {
                              !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                              : `We have sent the reset email to ${email}`
                            }
                        </p>
                      </div>

                        <form onSubmit={submitHandler}
                          className='pl-4'
                        >
                            {
                              !emailSent && (
                                  <label>
                                      <p>Email Address</p>
                                      <input
                                        type='email'
                                        required
                                        name = "email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter You Email Address'
                                        className='bg-richblack-800 w-full p-3 rounded-md mt-3 outline-none shadow-sm shadow-white'
                                      />
                                  </label>
                              )
                            }

                            <button 
                              type='submit'
                              className='bg-[#FFD60A] text-black w-[400px]  rounded-md mt-6 mb-2 p-2'
                            >
                                  {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                  }
                            </button>
                        </form> 

                        <Link to = "/login">
                            <div className='flex justify-center items-center gap-3 '>
                              <FaArrowLeftLong  />
                                <p> Back To Login</p>
                                
                            </div>
                        </Link>
                   </div>
                  )
              }
          </div>
    </div>
  )
}

export default ForgotPassword
