import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    GET_USER_ENROLLED_COURSES_API,
    UNENROLL_COURSE
} = profileEndpoints

export const getUserEnrolledCourses = async(token) => {
    let response = null
    try{
        response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API,null,
        {
            Authorization : `Bearer ${token}`
        })

        if(!response.data.success) throw new Error(response.data.message)
    }catch(err){
        // console.log("Fetch User Enrolled Courses Failed")
        toast.error("COULD NOT FETCH ENROLLED COURSES")
    }
    return response
}

export const unEnrollCourse = async(token, courseId) => {
    let response = null
    try{
        response = await apiConnector("POST", UNENROLL_COURSE,{courseId},
        {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        if(!response.data.success) throw new Error(response.data.message)
        toast.success("Un-Enrolled Sucessfully")
    }catch(err){
        // console.log("UnEnroll Course Failed")
        toast.error("Un-Enrolling Failed")
    }
    return response
}