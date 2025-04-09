import React from 'react'
import HighlightText from "../HomePage/HighlightText"
import know_You_Image from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planyourLesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../../Core/HomePage/CTAButton"

const LearningLanguage = () => {
  return (
    <div className='mt-[130px]'>
        
        <div className='flex flex-col items-center gap-5  '>

              <div className='text-3xl font-bold  text-black text-center '>
                  Your swiss knife for <HighlightText text={"Learning any language"}/>
              </div>

              <div className='text-base text-richblack-600 text-center mx-auto  font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
              </div>

              <div className=' flex flex-row items-center justify-center mt-5 gap-3  '>

                    <img
                      alt='/'
                      src= {know_You_Image}
                      className=' object-contain w-[350px] -mr-8'
                    />

                    <img
                      alt='/'
                      src= {compareWithOthers}
                      className=' object-contain w-[350px] -mr-8'
                    />

                    <img
                      alt='/'
                      src= {planyourLesson}
                      className=' object-contain w-[350px]'
                    />
              </div>

              <div className='mb-7'>
                 <CTAButton active={true} linkto={"/signup"} >
                       <div  className = {" px-6"}>Learn More </div>
                  </CTAButton>
               </div>
    
    </div>

        

    </div>
  )
}

export default LearningLanguage
