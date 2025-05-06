import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'

const tabName  = [
    'Free' ,
    'New to coding',
    'Most popular',
    'Skills paths',
    'Career paths',
]

const ExploreMore = () => {

    const[currentTab , setCurrentTab] = useState(tabName[0])
    const[courses , setcourses] = useState(HomePageExplore[0].courses)
    const[currentCard , setCurrentcard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value)
        const result  = HomePageExplore.filter((course) => course.tag === value)
        console.log(result);
        
        setcourses(result[0].courses)
        
        setCurrentcard(result[0].courses[0].heading)
    }

  return (
    <div className='flex flex-col  items-center relative  w-10/12'>

        <div className='text-4xl font-semibold text-center'>
            Unlock The 
            <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-sm font-inter mt-4'>Learn to build anything you can imagine</p>

        <div className='flex w-9/12 bg-richblack-800 rounded-full lg:mb-[250px] mt-4 lg:pl-16 p-2 '>
             {
                tabName.map((ele ,index) => {
                    return (
                        <div
                        className= {`text-[16px] flex lg:flex-row md:flex-col  justify-center items-center gap-2
                        ${currentTab === ele ? "bg-richblack-700 text-richblack-5 font-medium" 
                        : "text-richblack-200 "} rounded-full  transition-all duration-200 cursor-pointer
                        hover:bg-richblack-900 hover:text-richblack-5 px-6 py-2`}
                        key={index}
                        onClick={() => setMyCards(ele)}
                        > 
                            {ele}
                        </div>
                    )
                })
             }
        </div>

        <div className=''></div>

        <div className='flex absolute gap-8 top-[50%] '>
            {
                courses.map((ele ,index) => {
                    return (
                        <CourseCard
                            key = {index}
                            cardData = {ele}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentcard}
                        />
                    )
                })
            }
        </div>
    
    
    </div>
  )
}

export default ExploreMore
