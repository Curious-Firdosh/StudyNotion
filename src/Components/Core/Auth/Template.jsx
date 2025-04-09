import React from 'react'
import SignupFrom from './SignupFrom'
import LoginFrom from './LoginFrom'

import frameImg from "../../../assets/Images/frame.png"


const Template = ({title, description1, description2, image, formType}) => {
  
return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
         
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-10 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                    
                    <h2  className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {title}
                    </h2>

                    <span className="text-richblack-100">{description1}</span>{" "}
                    <span className="font-edu-sa font-bold italic text-blue-100">
                        {description2}
                    </span>
                        
                        {formType === "signup" 
                        ? (<SignupFrom/>)
                        : (<LoginFrom/>) 
                        }
                </div>

                <div>
                    <div></div>
                    <p>OR</p>
                    <div></div>
                </div>

                <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>

        </div>

    </div>
  )
}

export default Template
