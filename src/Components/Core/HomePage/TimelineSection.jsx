import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import image from "../../../assets/Images/TimelineImage.png"

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];

const TimelineSection = () => {
  return (
    <div className='flex flex-row w-11/12 items-center'>

        {/* Left Box */}
        <div className='flex flex-col w-[45%] gap-5'>

            {
                TimeLine.map( (element , index) => {
                    return(
                        <div className='flex flex-row gap-5' key={index}>
                        
                            <div className='w-[50px] h-[50px]  bg-white flex items-center'> 
                                <img alt= {'/'} src={element.Logo}/>
                             </div>

                             <div> 
                                   <h2 className='font-bold text-xl '>{element.Heading} </h2>
                                   <div className='text-base'> {element.Description} </div>
                             </div>

                             
                        </div>
                    )
                })
            }
        </div>
        
        {/* Right Box */}
        <div className='realtive shadow-blue-200'>
            
            <img alt='/' src={image}
                className='bg-white object-cover h-fit'
            /> 

            <div className='absolute bg-caribbeangreen-700  rounded-sm flex flex-row text-white uppercase px-3  py-6
             left-[50%] translate-y-[-50%]'>
                
                <div className='flex flex-row items-center gap-5 border-caribbeangreen-200 border-r ml-2'>
                    <p className='font-bold text-3xl'> 10 </p>
                    <p className='font-base text-caribbeangreen-300 text-sm mr-5'> Years experiences </p>
                </div>

                <div className='flex flex-row items-center gap-5 px-6  '>
                    <p className='font-bold text-3xl'>250 </p>
                    <p className='font-base text-caribbeangreen-300 text-sm'>Types of courses</p>
                </div>

                 
            </div>

        </div>
        

    </div>
  )
}

export default TimelineSection
