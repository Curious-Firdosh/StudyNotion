import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../Services/Operations/authApi';

const LoginFrom = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formdata , setFormdata] = useState({
        email : "" , password : ""
    });

    const [showPassword , setShowPasword] = useState(false)

    const {email , password} = formdata
    

    const changeHandler = (e) => {
        
        setFormdata((prevdata) => ({
            ...prevdata,
            [e.target.name] : e.target.value

        }))
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(formdata);

        dispatch(login(email,password,navigate))
        
    }

    
  return (
    <form 
        onSubmit={handleOnSubmit}
        className='mt-6 flex w-full flex-col gap-y-4'>

        <label  className="w-full">
            <p  className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
                required 
                type='email'
                value={formdata.email}
                onChange={changeHandler}
                placeholder="Enter Email address"
                name = "email"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
        </label> 

        <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
            </p>
            <input
                required 
                type={showPassword ? ("text") : ("password")}
                value={formdata.password}
                onChange={changeHandler}
                placeholder="Enter Password "
                name = "password"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
            />

            <span   
                onClick={() => setShowPasword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
                {
                    showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) :
                    (  <AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                }
            </span>

            <Link to="/forgot-password">
                <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                    Forgot Password
                </p>
            </Link>
        </label> 

        <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    
    </form>

  )
}

export default LoginFrom
