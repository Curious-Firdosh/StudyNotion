import React from 'react'
import instructerImage from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-14'>
        
        <div className='flex flex-row items-center gap-28'>
            
            <div className='w-[40%] ml-10 '>
                <img
                    src={instructerImage}
                    alt='/'
                    className='shadow-white shadow-lg'
                />
            </div>

            <div className=' w-[50%] flex flex-col    '>

                    <div className='text-3xl text-start  font-semibold w-[50%]'> 
                        Become an <HighlightText text={"Instructer"}/>
                    </div>

                    <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of 
                    students on StudyNotion. We provide the tools and skills to teach what you love.</p>


                    <div className='mt-20 w-fit '>
                        
                        <div>
                            <CTAButton active={true} linkto={'/singup'}>
                               <div className='flex flex-row gap-5 items-center text-sm px-2   '>
                                Start Teaching Today
                                <FaArrowRight/>
                               </div>
                            </CTAButton>
                       </div>

                
                     </div>
            
            
            </div>

            

        </div>
    </div>
  )
}

export default InstructorSection
