
import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../Components/Core/HomePage/HighlightText.jsx';
import CTAButton from '../Components/Core/HomePage/CTAButton.jsx'
import Banner from '../assets/Images/banner.mp4'
import Codeblock from '../Components/Core/HomePage/Codeblock.jsx';
import TimelineSection from '../Components/Core/HomePage/TimelineSection.jsx';
import LearningLanguage from '../Components/Core/HomePage/LearningLanguage.jsx';
import InstructorSection from '../Components/Core/HomePage/InstructorSection.jsx';
import Footer from '../Components/Common/Footer.js';
import ExploreMore from '../Components/Core/HomePage/ExploreMore.jsx';




const Home = () => {
  return (
    <div>

       {/* Section-1 */}
       <div className=' relative mx-auto flex flex-col w-11/12 text-white items-center justify-between max-w-maxContent'>
           
            {/* Become a Instructor Button */}
            <Link to ={"/signup"} >
              <div className='group mt-16 p-2 items-center rounded-full bg-richblack-800 font-bold text-richblack-200  
              transition-all duration-200 hover:scale-95 w-fit '>
                  <div className=' flex flex-row items-center text-sm  gap-2 px-10 py-[4px] rounded-full group-hover:bg-richblack-900  '>
                      <p>Become an Instructor</p>  
                       <FaArrowRight/>
                  </div>
              </div>
            </Link>

            <div className='text-center  text-4xl  font-semibold mt-7  '>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[90%] text-center font-bold text-lg text-richblack-300  mt-7 '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8 '>
                  
                  <CTAButton active={true} linkto={"/signup"}>
                      Learn More
                  </CTAButton>

                  <CTAButton active={false} linkto={"/login"}>
                      Book A Demo 
                  </CTAButton>
                  
                  
            </div>

            <div className=' mx-3 my-7 shadow-[10px_-5px_50px_-5px]  shadow-blue-200  '>
                <video 
                  muted
                  autoPlay 
                  loop 
                  className="shadow-[20px_20px_rgba(255,255,255)]">
                    <source src={Banner}  type='video/mp4'></source>
                </video>
            </div>

            {/* {Code Section 1} */}
            <div>
              <Codeblock
                  position={ 'lg:flex-row'}
                  heading={
                          <div className='text-4xl font-semibold'> Unlock your 
                              <HighlightText text={"Coding Potential "}/> 
                              with our online courses.'
                          </div>
                  }
                  subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                  
                  ctabtn1={
                     {
                       btnText : "Try It Youself",
                       linkto : "/signup",
                       active : true ,
                     }
                  }

                  ctabtn2={
                     {
                       btnText : "Learn More",
                       linkto : "/login",
                       active : false ,
                     }
                  }
                  codeBlock={`<<!DOCTYPE html>>
                        <html>
                        <head><title>Example</title><linkrel="stylesheet"href="styles.css">
                        </head>
                        <body>
                        <h1><a href="/">Header</a></h1>`}

                  codeColor={`text-yellow-25`}
                  bgGradient={<div className="codeblock1 absolute"></div>}

              />
            </div>
            
             {/* {Code Section 2} */}
            <div>
              <Codeblock
                  position={ 'lg:flex-row-reverse'}
                  heading={
                          <div className='text-4xl font-semibold'> Start
                              <HighlightText text={"coding in seconds "}/> 
                            
                          </div>
                  }
                  subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                  
                  ctabtn1={
                     {
                       btnText : "Continue Lesson",
                       linkto : "/signup",
                       active : true ,
                     }
                  }

                  ctabtn2={
                     {
                       btnText : "Learn More",
                       linkto : "/login",
                       active : false ,
                     }
                  }
                  codeBlock={`import React from "react";
                          import CTAButton from "./Button";
                          import TypeAnimation from "react-type";
                          import { FaArrowRight } from "react-icons/fa";
                          
                          const Home = () => {
                          return (
                          <div>Home</div>
                          )
                          }
                          export default Home;`}

                  codeColor={`text-yellow-25`}
                  bgGradient={<div className="codeblock1 absolute"></div>}


              />
            </div>

            <ExploreMore/>
       </div>

       
       {/* Section-2 */}

        <div className=' bg-pure-greys-5 text-richblack-700'>
            
            {/* {Part 1} */}
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col gap-5 mx-auto items-center justify-center '>

                  <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white '>
                          
                          <CTAButton active={true}  linkto = {'/signup'} >
                                <div className='flex flex-row items-center text-sm  gap-2 rounded-full'>
                                    Explore Full Catalog
                                    <FaArrowRight/>

                                </div>
                          </CTAButton>
                          
                          
                          <CTAButton active={false }  linkto = {'/signup'}>
                                Learn More
                          </CTAButton>

                    </div>
                     
                </div>
            
            </div>

            {/* {Part-2} */}
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col 
              items-center gap-5 justify-between  '>

                <div className='flex flex-row gap-1 mb-10 mt-[95px] ml-16'>
                    
                    <div className='text-4xl font-semibold w-[55%] '>
                        Get The Skills You Need For a 
                        <HighlightText text={"Job That is In Demand"}/>
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start ml-4'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>

                        <CTAButton active={true} linkto={'/signup'}>
                              Learn More
                        </CTAButton>

                    </div>

                </div>

                <TimelineSection/>
                <LearningLanguage/>

            </div>

        </div>

       {/* Section-3 */}

       <div className='mx-auto flex flex-col w-11/12  items-center max-w-maxContent
          gap-8 bg-richblack-900 text-white '>
            
            <InstructorSection/>    
            <h2 className='font-bold text-center mt-10 text-xl '>Review  From Other Learners</h2>

            {/* Review Slider  */}
      
       </div>

        <Footer/>

       {/* Section-4 */}

        
    </div>
  );
}

export default Home
