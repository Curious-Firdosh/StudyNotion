import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseCategories } from "../../../../Services/Operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { apiConnector } from '../../../../Services/apiConnector';
import { categories } from '../../../../Services/APIs';
import TagInput from './CourseInfoTemp/TagInput';
import UploadThumbNail from './CourseInfoTemp/UploadThumbNail';
import RequireMentField from './CourseInfoTemp/RequireMentField';



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
    const [loading , setLoading] = useState(false)

    const [courseCategory , SetCourseCategory] = useState([])

    
    useEffect(() => {

        const getAllCategories = async() => {

            //  const categories = await fetchCourseCategories()
            try{
                
                const response =  await apiConnector("GET" ,categories.CATEGORIES_API )
                
                const categorie = response?.data?.allCategorys
                
                if(categorie.length > 0){
                    SetCourseCategory(categorie)
                }

                
            }
            catch(err) {
                console.log("Error While Featching Api Categreis" , err);
                
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
                <label htmlFor= "courseTitle" >Course Title <sup>*</sup></label>
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
                <label htmlFor= "courseShortDesc">Course Description <sup>*</sup></label>
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

             <div className='relative  '>
                <label htmlFor= "coursePrice">Course Price <sup>*</sup></label>
                <input
                    placeholder='Enter Course Price'
                    id='coursePrice'
                    {...register("coursePrice" ,  {required:true } )}
                    className=' w-full bg-richblack-700 p-2 '
                />
                    <HiOutlineCurrencyRupee className='absolute top-7 text-3xl  text-richblack-900'/>
                {
                    errors.coursePrice && (
                        <span>Course Price Is Required</span>
                    )
                }
            </div>

            <div className=''>
                <label htmlFor= "courseCategory">Course Categorie <sup>*</sup></label>
                <select
                    id='courseCategory'
                    defaultValue=""
                    {...register("courseCategory")} // require true 
                    className='text-richblack-600'
                >
                    
                    <option value= "" disabled >Choose a Categorie</option>
                    {
                         courseCategory.map((item , index) => (
                            <option key={index}  value={item.id} className='text-richblack-700'>
                                    {item.name}
                            </option>
                        ))
                    }
                </select>
            </div>


            {/* // Creat A Tag Input For Handeling Tag Input */}
            <TagInput
            />

            {/* Creaate and Show Image or thumnail  */}
            <UploadThumbNail/>

            {/* Benifits Of COurse */}

            <div>
                <label htmlFor='courseBenefits'>Benifits Of Course</label>
                <textarea
                    id='courseBenefits'
                    placeholder='Benifits Of Course'
                    {...register("courseBenefits", {required: true})}
                    className=' min-h-[120px] w-full '
                />
            </div>

            <RequireMentField
                name = "courseRequirements"
                label = "Requirements/Instruction"
                register = {register}
                errors = {errors}
                setValue = {setValue}
                getValues = {getValues}

            />
        </form>
  )
}

export default CourseInformationform
