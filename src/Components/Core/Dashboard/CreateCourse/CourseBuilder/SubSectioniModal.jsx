
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../Services/Operations/courseDetailsAPI';
import { setCourse } from '../../../../../Slices/courseSlice';
import { RxCross1 } from "react-icons/rx";

import toast from 'react-hot-toast';
import IconButton from '../../../../Common/IconButton';

const SubSectioniModal = ({ modaldata,setModalData, add = false,  View = false,  edit = false  }) => {


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors}
    } = useForm();


    const dispatch = useDispatch()

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    console.log("ModalData" , modaldata);
    
    
    

    // We WANT in First Render When  iGO tO View OR Edit Subsection That Values Meet Me Filled
    useEffect(()=>{

      if(View || edit){
    
          setValue("lectureTitle" , modaldata.title)
          setValue("lectureDescription" , modaldata.desc)
          // setValue("lectureVideo" , modaldata.videoUrl)
      }
    },[])



    const isFormUpdated = () => {
        const currentValue = getValues()

        if(
            currentValue.lectureTitle !== modaldata.title ||
            currentValue.lectureDescription !== modaldata.desc 
            // currentValue.lectureVideo !== modaldata.videoUrl
        )
        { return true; }
       
        else {
          return false;
        }
    };



  const handleEditSubsection = async() => {

      const currentValue = getValues()

      const formdata = new FormData()
  
     formdata.append("sectionId", modaldata.sectionId);
     formdata.append("subSectionId", modaldata._id);

      if(currentValue.lectureTitle !== modaldata.title)
      {
         formdata.append("title", currentValue.lectureTitle);
      }
      if(currentValue.lectureDescription !== modaldata.desc)
      {
         formdata.append("description", currentValue.lectureDescription);
      }
      
      // if(currentValue.lectureVideo !== modaldata.videoUrl)
      // {
      //   formdata.append("videoUrl" ,currentValue.lectureVideo )
      // }

      //! Do Api Call
      const result = await updateSubSection(formdata , token)

      
      if(result){

        // const updatedCourseContent = course?.courseContent.map((section) => section._id === modaldata.sectionId  ? result : section)
        // const updatedCourse = {...course , courseContent:updatedCourseContent}


        dispatch(setCourse(result))
      }

      setModalData(null)
  }





  const onSubmit = async(data) => {
        
      if(View) 
            return;
      
      if(edit) {
          if(!isFormUpdated()){
              toast.error("No Changes Made To The Form")
          }
          else{
              //edit karo 
             handleEditSubsection()
          }
          return
      }
      
      
      const formdata = new FormData()

      formdata.append("sectionId" , modaldata)
      formdata.append("title" ,data.lectureTitle )
      formdata.append("desc" ,data.lectureDescription)
      // formdata.append("videoUrl" , data.lectureVideo)

      // DO api Call 

      const result = await createSubSection(formdata , token)
      console.log(result);
      

      if(result){
          dispatch(setCourse(result))
      }

      setModalData(null)
  }




  return (
    <div className='bg-richblack-300'>

        <div>
            <h1>{View && "Viewing" } {edit && "Editing" } {add && "Adding"} Lectures</h1>
            <RxCross1 onClick={() => setModalData(null)}/>
        </div>

        <form 
        className=''
        onSubmit={handleSubmit(onSubmit)}>
              
              <div>
                    <div>
                      <label htmlFor='lectureTitle'>Course Title *</label>
                      <input
                        placeholder='Enter Lecture Name'
                        id = "lectureTitle"
                        {...register("lectureTitle" , {required:true})}
                        className='w-full bg-richblack-800 text-white outline-none p-1'
                      />
                      {
                        errors.lectureTitle && (
                          <span>Enter Your Lecture Name</span>
                        )
                      }
                    </div>

                    <div>
                        <label htmlFor='lectureDescription'>Course Description *</label>
                        <textarea
                          placeholder='Enter Lecture Description'
                          id = "lectureDescription"
                          {...register("lectureDescription" , {required:true})}
                          className='w-full min-h-[130px] bg-richblack-800 text-white outline-none p-1'
                        />
                        { 
                          errors.lectureDescription && (
                          <span>Enter Your Lecture Description</span>
                        )
                      }
                    </div>
              </div>

              {
                !View && (
                  <IconButton
                      type={"submit"}
                      text={edit ? "Save Changes" : "Save"}
                  />
                )
              }

        </form>
    </div>
  )
}

export default SubSectioniModal
