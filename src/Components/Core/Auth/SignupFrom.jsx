 import React, { useState } from 'react'
 import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constans'
import Tab from '../../Common/Tab'
import toast from 'react-hot-toast'
import { setSignupData } from '../../../Slices/authSlice'
import { sendotp } from '../../../Services/Operations/authApi'

 
 const SignupFrom = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
    
    
    const[formdata , setFormdata] =  useState({
        firstName : "",
        lastName :"" ,
        email : "",
        Password : "",
        confirmPassword : ""
    });

   
    const [showPassword , setShowPasword] = useState(false)
    const [showconfirmPassword, setConfirmPasword] = useState(false)

    const { firstName, lastName, email, Password, confirmPassword } = formdata;




    const changeHandler = (e) => {

        setFormdata((prevdata) => ({
            ...prevdata,
            [e.target.name] : e.target.value

        }))
    };



const handleOnSubmit =  (e) => {
        e.preventDefault()


        if(Password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }

        const signupData = {
            ...formdata,
            accountType
        };
        console.log(signupData);
        

         // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendotp(formdata.email, navigate))

        //reset formdata 
         setFormdata({
                firstName : "",
                lastName :"" ,
                email : "",
                Password : "",
                confirmPassword : ""
            })
            setAccountType("")
 };

   

    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
        {
            id: 3,
            tabName: "Admin",
            type: ACCOUNT_TYPE.ADMIN,
        },
          ]
        




return (

        <div>
                <Tab  tabData={tabData} field = {accountType} setField ={setAccountType} />

                <form  onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-5">

                    <div className="flex w-full flex-col gap-y-4">
                        <label>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                First Name <sup className="text-pink-200">*</sup>
                            </p>
                                    
                                <input
                                        required
                                        type='text'
                                        onChange={changeHandler}
                                        value = {formdata.firstName}
                                        name='firstName'
                                        placeholder='Enter First Name'
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>

                        <label>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Last Name <sup className="text-pink-200">*</sup>
                            </p>
                                    
                                <input
                                        required
                                        type='text'
                                        onChange={changeHandler}
                                        value = {formdata.lastName}
                                        name='lastName'
                                        placeholder='Enter Last Name'
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                    />
                         </label>
                    </div>

                    
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-pink-200">*</sup>
                        </p>
                        
                        <input
                            required
                            type='email'
                            onChange={changeHandler}
                            value = {formdata.email}
                            name='email'
                            placeholder='Enter email Address'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>

                    <div className="flex gap-x-4">
                            
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password  <sup className="text-pink-200">*</sup>
                            </p>
                            
                            <input
                                required
                                type= {showPassword ? "text" :"password"}
                                onChange={changeHandler}
                                value = {formdata.Password}
                                name='Password'
                                placeholder='Create Password'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />

                            <span
                                onClick={() => setShowPasword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showPassword ? 
                                    (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :                
                                    (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                }
                            </span>

                        </label>


                        <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm Password <sup className="text-pink-200">*</sup>
                                </p>
                                
                                <input
                                    required
                                    type= {showconfirmPassword ? "text" :"password"}
                                    onChange={changeHandler}
                                    value = {formdata.confirmPassword}
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                                <span
                                    onClick={() => setConfirmPasword((prev) => !prev)}
                                    className="absolute right-3 top-[38px]  cursor-pointer"
                                >
                                {
                                    showconfirmPassword ? 
                                    (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :                
                                    (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                }
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                        Create Account
                    </button>
                    
                </form>
        </div>
   
   )
 }
 
 export default SignupFrom
 