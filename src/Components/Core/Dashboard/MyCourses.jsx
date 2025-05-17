import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses} from "../../../Services/Operations/courseDetailsAPI"
import IconButton from '../../Common/IconButton'
import CoursesTable from './InstructerCourses/CoursesTable'

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses , setCourses] = useState([])

    useEffect(() => {
        const featchCourses = async() => {
            
            const result = await  fetchInstructorCourses(token)
            if(result){
                console.log(result);
                setCourses(result)
            }
        };

        featchCourses();
    },[])


  return (
    <div>
        <div>
             <h1 className='text-white'>My Courses</h1>
             <IconButton
                text={"Add Course"}
                onclick={() => navigate("/dashboard/add-course")}
             >
             </IconButton>
        </div>

        <div>
            {
                courses && <CoursesTable courses = {courses} setCourses = {setCourses}/>
            }
        </div>
    </div>
  )
}

export default MyCourses
