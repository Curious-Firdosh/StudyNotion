import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCourseCategories} from "../../../../Services/Operations/courseDetailsAPI"

const CourseInformationform = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors}
    }= useForm()

    const dispatch = useDispatch()
    const {course , editCourse} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    const [courseCategory , SetCourseCategory] = useState([])

    
    useEffect(() => {

        const getAllCategories = async() => {


             const categories = await fetchCourseCategories()
             
             if(categories.length > 0){
                SetCourseCategory(categories)
             }

        }

         // if form is in edit mode
        if (editCourse) {
            // console.log("data populated", editCourse)
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
    

        getAllCategories()

    } , [])

  return (
        <form
            className='rounded-md text-white   border-richblack-700 bg-richblack-800  w-full p-6  space-y-4'
        >

            <div>
                <lable >Course Title <sup>*</sup></lable>
                <input
                    placeholder='Enter Course Title'
                    id='courseTitle'
                    {...register("courseTitle" ,  {required:true } )}
                    className='w-full'
                />
                {
                    errors.courseTitle && (
                        <span>Course Title Is Required</span>
                    )
                }
            </div>

            <div>
                <lable>Course Description <sup>*</sup></lable>
                <textarea
                    placeholder='Enter Course Description'
                    id='courseShortDesc'
                    {...register("courseShortDesc" ,  {required:true } )}
                    className='min-h-[120px] w-full '
                />
                {
                    errors.courseShortDesc && (
                        <span>Course Description Is Required</span>
                    )
                }
            </div>

             <div>
                <lable>Course Description <sup>*</sup></lable>
                <textarea
                    placeholder='Enter Course Description'
                    id='courseShortDesc'
                    {...register("courseShortDesc" ,  {required:true } )}
                    className='min-h-[140px] w-full '
                />
                {
                    errors.courseShortDesc && (
                        <span>Course Description Is Required</span>
                    )
                }
            </div>

            
        </form>
  )
}

export default CourseInformationform
