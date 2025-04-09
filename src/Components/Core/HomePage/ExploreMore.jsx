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
        setcourses(result[0].courses)
        setCurrentTab(result[0].courses[0].heading)
    }

  return (
    <div>

        <div className='text-4xl font-semibold text-center'>
            Unlock The 
            <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-sm font-inter mt-4'>Learn to build anything you can imagine</p>

        <div className='flex bg-richblack-800 rounded-full mb-6 mt-4 px-3 py-1'>
             {
                tabName.map((ele ,index) => {
                    return (
                        <div
                        className= {`text-[16px] flex flex-row items-center gap-2
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

        <div className='flex gap-8 '>
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
