import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../Services/Operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { apiConnector } from '../../../../../Services/apiConnector';
import { categories } from '../../../../../Services/APIs';
import TagInput from './TagInput';
import UploadThumbNail from './UploadThumbNail';
import RequireMentField from './RequireMentField';
import IconButton from '../../../../Common/IconButton';
import { setCourse, setStep } from '../../../../../Slices/courseSlice';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constans';




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
                setValue("courseShortDesc", course.courseDescreption)
                setValue("coursePrice", course.price)
                setValue("courseTags", course.tag)
                setValue("courseBenefits", course.whatYouWillLearn)
                setValue("courseCategory", course.category)
                setValue("courseRequirements", course.instructions)
                // setValue("courseImage", course.thumbnail)
            }


        getAllCategories()

    } , [])

    const isFormUpdated = () => {
        
        const currentValue = getValues()

     if (
            currentValue.courseTitle !== course.courseName ||
            currentValue.courseShortDesc !== course.courseDescription ||
            currentValue.coursePrice !== course.price ||
            currentValue.courseBenefits !== course.whatYouWillLearn || 
            currentValue.courseTags.toString() !== course.tag.toString() ||
            currentValue.courseCategory._id !== course.category._id ||
            currentValue.courseRequirements.toString() !== course.instructions.toString()
            // currentValue.courseImage !==  course.thumbnail
        ) 
        return true  ;
    else 
        return false;

    }

    // Hnadels Next Butoon 
    const onSubmit= async(data) => {

        if(editCourse) {

            if(isFormUpdated()){
                
                const currentValue = getValues();
                const formdata = new FormData();

                formdata.append("courseId" , course._id)

                if(currentValue.courseTitle !== course.courseName){
                    formdata.append("courseName" ,data.courseTitle )
                }
                if(currentValue.courseShortDesc !== course.courseDescription){
                    formdata.append("courseDescription" ,data.courseShortDesc )
                }
                if( currentValue.coursePrice !== course.price){
                    formdata.append("price" ,data.coursePrice )
                }
                if( currentValue.courseBenefits !== course.whatYouWillLearn){
                    formdata.append("whatYouWillLearn" ,data.courseBenefits )
                }
                if(currentValue.courseCategory._id !== course.category._id){
                    formdata.append("category" ,data.courseCategory )
                }
                if(  currentValue.courseRequirements.toString() !== course.instructions.toString()){
                    formdata.append("instructions" ,JSON.stringify(data.courseRequirements) )
                }
                
                if(currentValue.courseTags.toString() !== course.tag.toString()){
                    formdata.append("courseTags" ,JSON.stringify(data.courseTags) )
                }

                console.log("HelloJI  ")

                setLoading(true)
                const result = await editCourseDetails(formdata , token)
                setLoading(false)
                if(result) {
                    setStep(2)
                    dispatch(setCourse(result))
                }
            }
            else {
                toast.error("No Changes Made On The Form")
            }
            return;
        }

        // If User Is Came To Make New Course First Time 
        const formdata = new FormData();
        formdata.append("courseName" ,data.courseTitle )
        formdata.append("courseDescription" ,data.courseShortDesc )
        formdata.append("price" ,data.coursePrice )
        formdata.append("whatYouWillLearn" ,data.courseBenefits )
        formdata.append("category" ,data.courseCategory )
        formdata.append("tag" , JSON.stringify(data.courseTags))
        formdata.append("instructions" ,JSON.stringify(data.courseRequirements) )
        formdata.append("status" , COURSE_STATUS.DRAFT)

        setLoading(true)
        const result = await addCourseDetails(formdata , token)
        
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }

        setLoading(false)
        console.log("Formdata" , formdata);
        console.log("result",  result);
        

    }

    

  return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md text-white   border-richblack-700 bg-richblack-800  w-full p-6  space-y-4'
        >

            <div>
                <label htmlFor= "courseTitle" >Course Title <sup>*</sup></label>
                <input
                    placeholder='Enter Course Title'
                    id='courseTitle'
                    {...register("courseTitle" ,  {required:true } )}
                    className='w-full text-richblack-700'
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
                    className='min-h-[120px] w-full text-richblack-700 '
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
                    className=' w-full bg-richblack-700 p-2 pl-10 '
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
                            <option key={index}  value={item._id} className='text-richblack-700'>
                                    {item.name}
                            </option>
                        ))
                    }
                </select>
            </div>


            {/* // Creat A Tag Input For Handeling Tag Input */}
            <TagInput
                label = "Tags"
                name = "courseTags"
                placeholder = "Write And Enter The Tag"
                register = {register}
                errors = {errors}
                setValue = {setValue}
                getValues = {getValues}
            />

            {/* Creaate and Show Image or thumnail  */}
            <UploadThumbNail
                label = "Thumbnail"
                name = "courseImage"
                register = {register}
                errors = {errors}
                setValue = {setValue}
                getValues = {getValues}
            />

            {/* Benifits Of COurse */}

            <div>
                <label htmlFor='courseBenefits'>Benifits Of Course</label>
                <textarea
                    id='courseBenefits'
                    placeholder='Benifits Of Course'
                    {...register("courseBenefits", {required: true})}
                    className=' min-h-[120px] w-full text-richblack-700'
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

            
            <div>
                {
                    editCourse  && (
                       <button
                        onClick={() => dispatch(setStep(2))}
                        type='button'
                        className='flex items-center  gap-x-2 bg-richblack-300 font-semibold text-black'
                        
                       >
                       Continue Without Saving
                    </button>
                    )
                }

                <IconButton
                    disabled={loading}
                    text = {!editCourse  ? "Next" : "Save Changes"}
                />
            </div>
        </form>
  )
}

export default CourseInformationform
