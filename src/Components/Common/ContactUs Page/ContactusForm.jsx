import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CountryCode from "../../../data/countrycode.json"

const ContactusForm = () => {

  const [loading , setLoading] = useState(false)
  
  const {
     register,
     handleSubmit,
     reset ,
     formState : {errors , isSubmitSuccessFull}
  } = useForm();

  useEffect(() => {
      
    if(isSubmitSuccessFull){
         reset({
            email : "",
            firstName : "",
            lastName :"",
            phoneNo : "",
            message : "",
         })
      }
  },[reset,isSubmitSuccessFull])

  const submitContactForm = async(data) => {
    console.log("Login Data Of Form" , data);
      try{
          setLoading(true);
          const response = {status : "OOK"}
          console.log("Contact Us Api Response" , response);
          toast.success("Thank You For Connect With Us 🎊🎉😉")
          reset()
          setLoading(false)
      } 
      catch(err) {
         console.log("Error File Featching Contact Us Api --->" , err)
         toast.error("Cant Send AnyThing")
      }
      setLoading(false)
  };

  
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

        {/* Name */}
        <div className='text-white flex gap-7 lg:mt-[50px] '>
            {/* FirstnName */}
            <div className='flex flex-col gap-2 w-[45%] '>
                <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        className='text-white bg-[#161D29]  rounded-md p-4'
                        placeholder='Enter You First Name'
                        {...register ("firstName" , {required:true})}

                    />
                    {
                       errors.firstName && (
                          <span>
                            Please Enter Your Name
                          </span>
                       )
                    }
              
            </div>
            
            {/* LastName */}
            <div className='flex flex-col gap-2  w-[50%]'>
                <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter You Last Name'
                        className='text-white bg-[#161D29] rounded-md  p-4'
                        {...register ("lastName")}

                    />
              
            </div>
        </div>
        
        {/* Email */}
        <div className='flex flex-col gap-2 mt-5'>
                <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter Your Email Address'
                        className='text-white bg-[#161D29] rounded-md  p-4'
                        {...register ("email" , {required : true})}
                    />
                    {
                      errors.email && (
                         <span>Please Enter Your Email</span>
                      )
                    }
              
        </div>
        
        {/* Phone Number */}
        <div className='flex flex-col gap-2 mt-5'>
            
            <label htmlFor='phoneNo'>Phone Number</label>
            
            <div className='flex row gap-2 items-center'> 
                
                <div className='flex flex-col w-[80px]'>
                    <select
                        name='dropdown'
                        id='dropdown'
                        className='text-white text-sm bg-[#161D29] rounded-md outline-none p-4 '
                        {...register("countrycode" , {required:true})}

                    >
                        {
                          CountryCode.map((element , index) => {
                             return (
                                <option key={index} value={element.code}>
                                    {element.code}
                                </option>
                             )
                          })
                        }
                    </select>
                </div>
                
                <div className='flex w-[90%] flex-col gap-2 '>
                    <input
                      type='text'
                      name='phoneNo'
                      id='phoneNo'
                      placeholder='123 45 67'
                      {...register("phoneNo" , 
                      {   
                          required : true,
                          maxLength : {value : 10 , message : "Invalid Phone Number 😒"},
                          minLength : {value : 8 ,  message : "Invalid Phone Number 😒" }
                      })}
                      className='text-white bg-[#161D29] rounded-md outline-none  p-[14px]  '

                    />
                </div>

            </div>
        </div>
        
        {/* message */}
        <div className='flex flex-col gap-2 mt-5'>
                <label htmlFor='message'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols={30}
                        rows={7}
                        placeholder='Write Something'
                        className='text-white bg-[#161D29] rounded-md  p-4'
                        {...register ("message" )}
                    />
                    {
                      errors.message && (
                         <span>Enter Your Message Kindly....</span>
                      )
                    }
              
        </div>

        {/* {button} */}

        <div className='mt-10 '>
          <button 
              type='submit'
              className='bg-[#FFD60A] w-full text-black p-2 font-semibold text-sm rounded-md '>
            Send Message
          </button>
        </div>
        

    </form>
  )
}

export default ContactusForm
