import React from 'react'
import HighlightText from './HighlightText.jsx'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation'


const Codeblock = ({
  position , heading ,  subheading , ctabtn1, ctabtn2 , bgGradient , codeColor , codeBlock
}) => {
  return (
    <div className= {` flex ${position} my-20 justify-between gap-10 `}>

        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
              {heading}
             
             <div className=' text-richblack-300 font-bold '>
                  {subheading}
             </div>

             <div className='flex flex-row gap-7 mt-7'>

                  <CTAButton  active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-5 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                  </CTAButton>

                  <CTAButton  active={ctabtn2.active} linkto={ctabtn2.linkto}>                  
                            {ctabtn2.btnText}               
                  </CTAButton>
             </div>


        </div>

        {/* Section 2 CodeBlock  */}
    
        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
          {bgGradient}
            <div className=' text-center flex  flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                 <p>1</p>
                 <p>2</p>
                 <p>3</p>
                 <p>4</p>
                 <p>5</p>
                 <p>6</p>
                 <p>7</p>
                 <p>8</p>
                 <p>9</p>
                 <p>10</p>
                 <p>11</p>
            </div>

            <div className= {`w-[90%] flex flex-col font-bold font-mono pr-2 gap-1 ${codeColor}`}> 
                  <TypeAnimation
                     sequence={[codeBlock , 1000, ""]}
                     repeat={Infinity}
                     cursor = {true}
                     style={
                      {
                        whiteSpace : "pre-line",
                        display : "block"

                      }
                     }
                    omitDeletionAnimation = {true}
                  />
            </div>
        
        </div>
    
    
    </div>
  )
}

export default Codeblock
