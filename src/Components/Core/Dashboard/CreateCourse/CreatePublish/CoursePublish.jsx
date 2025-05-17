import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {resetCourseState, setStep} from "../../../../../Slices/courseSlice"
import IconButton from "../../../../Common/IconButton"
import {COURSE_STATUS} from "../../../../../utils/constans"
import {editCourseDetails} from "../../../../../Services/Operations/courseDetailsAPI"
import { LoaderIcon } from 'react-hot-toast'

const PublishCourse = () => {

    const {register , setValue , getValues , handleSubmit} = useForm()
    const dispatch = useDispatch()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading , setLoading] = useState(false)

    console.log("Course" , course);



    useEffect (() => {
       if(course?.status === COURSE_STATUS.PUBLISHED){
          setValue("public" , true)
       }
    },[])

    const goToBack = () => {
        dispatch(setStep(2))
    }
    
    const goToCourses = (data) => {
      dispatch(resetCourseState())
    
      
    }
    


    const handleCoursePublic = async() => {
       
      if(course?.status === COURSE_STATUS.PUBLISHED &&  getValues("public") === true  || 
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {

        // no updation Into Form 
        //No Need To Make API cALL 
        goToCourses();
        return;
      }
      // If From Is Upldated
      const formData = new FormData
      formData.append("courseId" , course._id)
      const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
      formData.append("status" , courseStatus)

      const result = await editCourseDetails(formData , token)
      if(result) {
          goToCourses()
      }
    }

    const onSubmit = () => {
        handleCoursePublic()
        
    }



  return (
    <div className='rounded-md border-[1px] text-white   bg-richblack-800 border-richblack-700 p-4 '>

        <h1 className='font-semibold text-3xl p-5'>Publish Course</h1> 

        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='ml-4 '>
                <label htmlFor='public'>

                    <input
                        type='checkbox'
                        id='public'
                        {...register("public")}
                        className='rounded h-4 w-4 '
                    />
                
                    <span className='text-richblack-500 ml-4 '>Make This Course As Public</span>
                </label>
                
            </div>

            <div className='flex justify-end items-center gap-x-3  mt-10 mb-2'>
                <button 
                    type='button'
                    onClick={goToBack}
                    className='py-2  px-3  bg-richblack-600 rounded-md '>
                    Back
                </button>

               <button 
                    disabled ={loading}
                    className='py-2  px-3 font- font-semibold bg-yellow-50 text-black font bold rounded-md    '>
                  Save Changes
                </button>
            </div>
 
        </form>

    </div>
  )
}

export default PublishCourse

