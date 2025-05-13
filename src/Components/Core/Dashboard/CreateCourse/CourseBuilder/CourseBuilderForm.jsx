import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../Common/IconButton'
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import {setCourse, setEditCourse, setStep} from "../../../../../Slices/courseSlice"
import { IoIosArrowForward } from "react-icons/io";
import {toast} from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../Services/Operations/courseDetailsAPI';


const CourseBuilderForm = () => {

  const {register , handleSubmit , setValue , formState:{errors}} = useForm()

  const {course} = useSelector((state) => state.course);
  const step = useSelector((state) => state.course.step)
  const {token} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  console.log("Course" , course) 

  const [editSectionName , SeteditSectionName] = useState(null)
  const [loading , setLoading] = useState(false)

  const cancleEdit = () => {
      SeteditSectionName (null)
      setValue("sectionName" , "")
  }

  const goToNext = () => {
      if(course.courseContent.length === 0 ){
          toast.error("Please Add Atleast One Section")
          return;
      }
      if(course.courseContent.some((section) => section.subSection.length === 0 )){
         toast.error("Please Add Atleast One Lecture in Each Section")
         return;
      }
      dispatch(setStep(3))
      console.log("SJJSIDJF");
      
  }


  const handleChangeEditSection = (sectionId , sectionName) => {

    if(editSectionName === sectionId){
      cancleEdit()
    }

    SeteditSectionName(sectionId)
    setValue("sectionName" , sectionName)
  }

  const onSubmit = async (data) => {
       
    setLoading(true)
       let result;
      
        if(editSectionName){
          // We Are Editing The Section Name
          result = await updateSection({
              sectionName : data.sectionName,
              sectionId : editSectionName,
              courseId : course._id
          } , token)
          console.log("resultSection" , result);

        }
        else{
           result = await createSection({
              sectionName: data.sectionName,
              courseId : course._id,
           } , token)
           console.log("resultSection" , result);
           
        }

        // Update Values 

        if(result){
            dispatch(setCourse(result))
            SeteditSectionName(null)
            setValue("sectionName" , "")
        }

        console.log("edit" , result);
        

        setLoading(false)
  }

  const goBack =  () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }


  return (
    <div className='bg-richblack-800 p-5 rounded-sm '>
        
        <p  className='font-semibold  text-white text-2xl '>Course Builder</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-white'>
                
                <label htmlFor='sectionName'>Section Name <sup>*</sup></label>
                <input
                  id='sectionName'
                  placeholder='Add Section Name'
                  {...register("sectionName" , {required: true})}
                  className='w-full text-black rounded-sm bg-richblack-600 p-2 outline-none'
                />
                {
                  errors.sectionName && (
                    <span>Section Name is Required</span>
                  )
                }
            </div>

            <div className='mt-5 flex items-center gap-6 '>
                <IconButton
                    type="Submit"
                    text={editSectionName ? "Edit Secton Name" : "Create Section"}
                    outline = {true}
                    customClasses={"text-white"}
                > 
                    <FaPlus  size={20}  className='text-yellow-50'/>
                </IconButton>
                
                {
                  editSectionName && (
                      <button
                        type='button'
                        onClick={cancleEdit}
                        className='text-sm underline text-richblack-300 '
                      >
                          Cancel Edit
                      </button>
                  )
                }
                

            </div>
        </form>

        
        {
          course.courseContent.length > 0 && (
            <NestedView handleChangeEditSection = {handleChangeEditSection}/>
          )
        }

        <div className='flex justify-end gap-x-3 mt-10 '>
        
            <button 
              onClick={goBack}
              className='text-sm bg-richblack-300 p-2'>
              Back
            </button>
            
            <IconButton
              text={"Next"}
              onClick = {goToNext}
            >
              <IoIosArrowForward/>
            </IconButton>

        </div>


    </div>
  )
}

export default CourseBuilderForm
