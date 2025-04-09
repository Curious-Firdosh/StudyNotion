import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiFillEyeInvisible, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { resetPassword } from '../Services/Operations/authApi'

const ResetPassword = () => {

    const location  = useLocation()    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading} = useSelector((state) => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    
    
    const [formdata , setFormdata] = useState({
        password : "",
        confirmPassword : ""
    })

    const { password , confirmPassword} = formdata

    const changeHandler = (e) => {
        
        setFormdata((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value 
        }))
    };
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1)
        console.log(token);
        
        dispatch(resetPassword(password,confirmPassword, token , navigate))
    }

  return (
    <div>

        {
            loading ? (
                <div className='spinner'>
                 </div>
            ) : (
                <div className='text-white'>
                    <h1>Choose New Password</h1>
                    <p>Almost done. Enter your new password and youre all set.</p>

                    <form onSubmit={handleOnSubmit}>
                        
                        <label  className='text-black'>
                            <p>New password <sup className='bg-pink-500'>*</sup></p>
                            <input
                                type= {showPassword ? "text" : "password"}
                                required
                                value={formdata.password}
                                name='password'
                                placeholder='Enter New Password '
                                onChange={changeHandler}
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                
                            >
                                {
                                   showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiOutlineEye fontSize={24}/> 
                                }
                            </span>

                        </label>

                        <label className='text-black'>
                            <p> Confirm New password <sup className='bg-pink-500'>*</sup></p>
                            <input
                                type= {showConfirmPassword ? "text" : "password"}
                                required
                                value={formdata.confirmPassword}
                                name='confirmPassword'
                                placeholder='Confirm New Password '
                                onChange={changeHandler}
                            />
                             <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                
                            >
                                {
                                   showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiOutlineEye fontSize={24}/> 
                                }
                            </span>

                        </label>

                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>

                        <Link to = "/login">
                            <div>
                                <p>Back To Login</p>
                            </div>
                        </Link>
                </div>
                 
            )
        }

    </div>
  )
}

export default ResetPassword
