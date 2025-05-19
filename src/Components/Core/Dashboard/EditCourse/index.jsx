import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../CreateCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../Services/Operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../Slices/courseSlice";



export default function EditCourse () {

    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)


    console.log(course);

    useEffect(() => {

        const getFullCourseDetails = async () => {

            const result = await   getFullDetailsOfCourse(courseId ,token)

            if(result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result.courseDetails))
            }
        } ;
        
        getFullCourseDetails()

    },[])
    



    return (
        <div>
            <h1 className="text-2xl ">Edit Course</h1>
            
            <div>
                {
                    course ? (<RenderSteps/>) : <p> Course Not Found </p>
                }
            </div>
        </div>
    )
}