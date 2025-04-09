
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../APIs"
import { setLoading } from "../../Slices/profileSlice"
import toast from "react-hot-toast"
import { set } from "react-hook-form"

const {
    GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints

export const getEnrolledCourses = (token) => async () => {
    
    const toastId = toast.loading("Loading.....)")
    setLoading(true)
    let result = [];
    try{
      
        const response = await apiConnector("GET" , 
                                            GET_USER_ENROLLED_COURSES_API ,
                                            null,
                                            {
                                                Authorization: `Bearer ${token}`  // Attach token
                                            }
                                        );
        console.log(response);

        if(!response.data.success){
            throw new Error(response.data.message);
            
        }
        result  = response.data.data
    }
    catch(err){
        console.log("ERROR WHILE FEATCHING API AT profilApi" , err);
        toast.error("Courses Could Not Found")
    }
    setLoading(false)
    toast.dismiss(toastId)
}
