import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectioniModal from './SubSectioniModal';
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../Services/Operations/courseDetailsAPI';
import { setCourse } from '../../../../../Slices/courseSlice';



const NestedView = ({handleChangeEditSection}) => {

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const [addSubsection, setaddSubsection] = useState(null)
    const [viewSubsection, setViewSubsection] = useState(null)
    const [editSubsection, seteditSubsection] = useState(null)

    const [confirmationModal , setConfirmationModal] = useState(null)

    console.log("Section UpdatedCourse" , course.courseContent)

    const handleDeleteSection = async(sectionId) => {
      const result = await deleteSection({
        sectionId ,
        courseId : course._id,
        token
      })

      if(result) {
        dispatch(setCourse(result))
      }

      setConfirmationModal(null)
      
    }

    const handleDeleteSubSection = async(subsectionId , sectionId) => {
      
      const result = await deleteSubSection({
        
        subsectionId,
        sectionId,
        token
      })

      if(result){
        dispatch(setCourse(result))
      }
      setConfirmationModal(null)
    }

  return (
    <div>
        <div className='rounded-sm bg-richblack-700  mt-5 '>
            {
               course?.courseContent.map((section) => (

                <details key={section._id} open className='border-b-2  border-white pl-5   '>
                      <summary className='mt-10 text-white flex items-center justify-between  gap-x-3 p-3'>

                            <div className='flex items-center  gap-3 '>
                                <RxDropdownMenu/>
                                {section.sectionName}
                            </div>

                          <div className='flex items-center  gap-x-3'>
                                 <button
                              onClick={() => handleChangeEditSection(section._id , section.sectionName)}
                            >
                                <MdModeEdit/>
                            </button>

                            <button
                                onClick={ () => {
                                  setConfirmationModal({
                                    text1:"Delete The Section ",
                                    text2 : "All Lectures In The Section Will Be Deleted",
                                    btnText: "Delete",
                                    btn2Text: "Cancel",
                                    btnHandler : () => handleDeleteSection(section._id),
                                    btnHandler2 : () => setConfirmationModal(null)
                                  })
                                }}
                            >
                                  <RiDeleteBin6Line />
                
                            </button>

                            <span>|</span>

                            <button>
                                  <TiArrowSortedDown/>
                            </button>
                          </div>
                          
                      </summary>

                      <div>
                          {
                            section?.subsections.map((subsection) => (
                                <div 
                                  key={subsection?._id}
                                  onClick={() => {
                                    setViewSubsection(subsection)
                                  }}
                                  className='flex items-center justify-between gap-x-3 border-2 '
                                >

                                        <div className='flex  items-center gap-x-3 ' > 
                                            <RxDropdownMenu/>
                                            <p>{subsection.title}</p>
                                        </div>

                                        <div className='flex items-center  gap-x-3'>
                                            
                                              <button
                                                onClick={() => seteditSubsection({...subsection , sectionId : section._id})}
                                              >
                                                  <MdModeEdit/>
                                              </button>

                                            <button
                                                onClick={ () => {
                                                  setConfirmationModal({
                                                    text1:"Delete This  SubSection ",
                                                    text2 : "Lectures in SubSection Will Be Deleted",
                                                    btnText: "Delete",
                                                    btn2Text: "Cancel",
                                                    btnHandler : () => handleDeleteSubSection(subsection._id , section._id),
                                                    btnHandler2 : () => setConfirmationModal(null)
                                                  })
                                                }}
                                            >
                                                  <RiDeleteBin6Line />
                                
                                            </button>
                                        </div>

                                 </div>
                            ))
                        }

                        <button 
                          onClick={() => setaddSubsection(section._id)}
                          className='flex items-center font-semibold p-1 text-yellow-50 mb-2'>
                                <AiOutlinePlus className='font-semibold'/>
                                  Add Lectures
                        </button>
                    
                    </div>
                </details>
               ))
            }
        </div>

        {
          addSubsection ? <SubSectioniModal 
            modaldata = {addSubsection}
            setModalData = {setaddSubsection}
            add =  {true}
          /> 
          : viewSubsection ? <SubSectioniModal
              modaldata = {viewSubsection}
              setModalData = {setViewSubsection}
              View =  {true}
          /> 
          : editSubsection ? <SubSectioniModal
               modaldata = {editSubsection}
               setModalData = {seteditSubsection}
               edit =  {true}
          />
          : <div> </div>

        }

        {
          confirmationModal ? (
            <ConfirmationModal modalData={confirmationModal}/>
          ) :
          (
            <div> </div>
          )
        }


    </div>
  )
}

export default NestedView
