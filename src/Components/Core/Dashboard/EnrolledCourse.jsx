import ProgressBar from '@ramonak/react-progress-bar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEnrolledCourses} from '../../../Services/Operations/profileApi'
import toast from 'react-hot-toast'
const EnrolledCourse = () => {

    const {token} = useSelector((state) => state.auth)

    const [enrolledCourse , setEnrolledCourse] = useState([])


    const EnrolledCoursApiCall = async() => {
        try{
            const response =  await getEnrolledCourses(token)();
            setEnrolledCourse(response)
        }
        catch(err){
            console.log("Unable To Featch ErolledCourse");
            
        }
    };

    useEffect(() => {
        EnrolledCoursApiCall()
    },[])

  return (
    <div className='text-white'     >
        
        <h1 className='text-white text-4xl'>Enrolled Courses</h1>

        {
            enrolledCourse === null || enrolledCourse === undefined ? ( <div>Loading..... </div>)
            
            : !enrolledCourse.length  ? (<p>You have Not Enrolled Any Course Yet</p>)
            :(
                <div> 
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {/* Yaha Se Cards Shuru Hote Hai */}

                    {
                        enrolledCourse.map((course ,index) => (
                            <div  key={index}> 
                                <div>
                                     <img
                                        src={course.thumbNail}
                                     />

                                    <div> 
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>

                                    <div>
                                        <p>{course.toatalDuration}</p>
                                    </div>

                                    <div>
                                        <p> Progres : {course.progressPercentage  || 0} %</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible = {false}
                                        />
                                    </div>
                                     
                                </div>
                            </div>
                        ))
                    }
                </div>
            )

        }
    </div>
  )
}

export default EnrolledCourse
