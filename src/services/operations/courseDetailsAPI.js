import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { categories, courseEndpoints, profileEndpoints } from "../apis"

const {
    CREATE_COURSE_API,
    UPDATE_COURSE_API,
    DELETE_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    COURSE_DETAILS_API,
    GET_FULL_COURSE_DETAILS_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API
} = courseEndpoints

const {
    CATEGORIES_API
} = categories

const {
    INSTRUCTOR_DASHBOARD_API
} = profileEndpoints
export const createCourse = async (token, formData) => {
    let response = null
    const toastId = toast.loading("Creating Course...")
    try{
        response = await apiConnector("POST", CREATE_COURSE_API, formData,
            {
                "Content-Type" : "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )
        // console.log("CREATE COURSE RESPONSE...",response.data)
        // console.log(response.data.success)

        if(!response.data.success) throw new Error(response.data.message)
        
        toast.success("Course Created Successfully")
    }catch(err){
        console.log("COURSE COULD NOT BE CREATED")
        toast.error("Course Creation Failed")
    }
    toast.dismiss(toastId)
    return response
}

export const updateCourseDetails = async (token, formData) => {
    let response = null
    const toastId = toast.loading("Updating Course...")
    try{
        response = await apiConnector("PUT", UPDATE_COURSE_API, formData,
            {
                "Content-Type" : "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )
        // console.log("CREATE COURSE RESPONSE...",response.data)
        // console.log(response.data.success)

        if(!response.data.success) throw new Error(response.data.message)
        
        toast.success("Course Updated Successfully")
    }catch(err){
        console.log("COURSE COULD NOT BE CREATED")
        toast.error("Course Updation Failed")
    }
    toast.dismiss(toastId)
    return response
}

export const deleteCourse = async (data, token) => {
    let response = null
    const toastId = toast.loading("Deleting...")
    try{
        response = await apiConnector("DELETE", DELETE_COURSE_API, data,
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("DELETE COURSE RESPONSE...", response)

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("Course Deleted Successfully")
    }catch(err){
        console.log("COURSE COULD NOT BE DELETED")
        toast.error("Course Deletion Failed")
    }
    toast.dismiss(toastId)
    return response
}

export const createSection = async (data, token) => {
    let response = null
    const toastId = toast.loading("Creating Section...")
    try{
        response = await apiConnector("POST", CREATE_SECTION_API, data, 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("CREATE SECTION RESPONSE...", response)

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("Section Created Successfully")
    }catch(err){
        console.log("SECTION COULD NOT BE CREATED")
        toast.error("Section Creation Failed")
    }
    toast.dismiss(toastId)
    return response
}

export const updateSection = async (data, token) => {
    let response = null
    const toastId = toast.loading("Updating Section...")
    try{
        response = await apiConnector("PUT", UPDATE_SECTION_API, data, 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("UPDATE SECTION RESPONSE...", response.data)
        // console.log(response.data.success)

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("Section Updated Successfully")
    }catch(err){
        console.log("SECTION COULD NOT BE UPDATED")
        toast.error("Section Updation Failed")
    }
    toast.dismiss(toastId)
    return response
}

export const deleteSection = async (data, token) => {
    let response = null
    const toastId = toast.loading("Deleting Section...")
    try{
        response = await apiConnector("PUT", DELETE_SECTION_API, data, 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("DELETE SECTION RESPONSE...", response)
        // console.log(response.data.success)

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("Section Deleted Successfully")
    }catch(err){
        console.log("SECTION COULD NOT BE DELETED")
        toast.error("Section Deletion Failed")
    }
    toast.dismiss(toastId)
    return response
}

export const createSubSection = async (data, token) => {
    let response = null
    const toastId = toast.loading("Creating SubSection...")
    try{
        response = await apiConnector("POST", CREATE_SUBSECTION_API, data, 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("CREATE SUBSECTION RESPONSE...", response)
        // console.log(response.data.success)

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("SubSection Created Successfully")
    }catch(err){
        console.log("SUBSECTION COULD NOT BE CREATED")
        toast.error("Sub Section Creation Failed")
    }
    toast.dismiss(toastId)
    return response
}

export const updateSubSection = async (data, token) => {
    let response = null
    const toastId = toast.loading("Updating Subsection...")
    try{
        response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data,
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("UPDATE SUBSECTION RESPONSE...", response)

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("SubSection Updated Successfully")
    }catch(err){
        console.log("SUBSECTION COULD NOT BE UPDATED")
        toast.error("Sub Section Updation Failed");
    }
    toast.dismiss(toastId)
    return response
}

export const deleteSubSection = async (data, token) => {
    let response = null
    const toastId = toast.loading("Deleting Subsection...")
    try{
        response = await apiConnector("PUT", DELETE_SUBSECTION_API, data,
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("DELETE SUBSECTION RESPONSE...", response)

        if(!response.data.success) throw new Error(response.data.message)

        toast.success("SubSection Deleted Successfully")
    }catch(err){
        console.log("SUBSECTION COULD NOT BE DELETED")
        toast.error("Sub Section Deletion Failed");
    }
    toast.dismiss(toastId)
    return response
}

export const getAllInstructorCourses = async (token) => {
    let response = null
    // const toastId = toast.loading("Loading...")
    try{
        response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API,null, 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("ALL INSTRUCTOR COURSES RESPONSE...", response)

        if(!response.data.success) throw new Error(response.data.message)
    }catch(err){
        console.log("INSTRUCTOR DETAILS CANT BE FETCHED")
    }
    // toast.dismiss(toastId)
    return response
}

export const getCourseDetails = async (courseId) => {
    let response = null
    // const toastId = toast.loading("Loading...")
    try{
        response = await apiConnector("POST", COURSE_DETAILS_API, courseId)
        // console.log("COURSE RESPONSE...", response)
        if(!response.data.success) throw new Error(response.data.message)
    }catch(err){
        console.log("COURSE DETAILS CANT BE FETCHED")
        console.log(err)
    }
    // toast.dismiss(toastId)
    return response
}

export const getFullCourseDetails = async (courseId, token) => {
    let response = null
    // const toastId = toast.loading("Loading...")
    try{
        response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_API, {courseId},
            {
                Authorization : `Bearer ${token}`
            }
        )
        // console.log(response)
        if(!response.data.success) throw new Error(response.data.message)
    }catch(err){
        console.log("COURSE FULL DETAILS CANT BE FETCHED")
        console.log(err)
    }
    // toast.dismiss(toastId)
    return response
}

export const fetchCourseCategories = async () => {
    let result = []
    try{
        const response = await apiConnector("GET", CATEGORIES_API)
        // console.log("COURSE CATEGORIES API RESPONSE...", result)
        if(!response?.data?.success) throw new Error("Could Not Fetch Course Categories")
        result = response?.data?.allCategorys
    }catch(err){
        console.log("COURSE CATEGORY API ERROR...", err)
        toast.error(err.message)
    }
    return result
}

export const createRating = async(data, token) => {
    const toastId = toast.loading("Creating...")
    try{
        const response = await apiConnector("POST", CREATE_RATING_API, data, 
        {
            Authorization : `Bearer ${token}`
        });
        if(!response.data.success) throw new Error(response.data.message)
        toast.success("Rating Posted")
    }catch(err){
        toast.error("COURSE RATING FAILED")
        console.log("COURSE RATING CANT BE CREATED")
        console.log(err)
    }
    toast.dismiss(toastId)
}

export const markLectureAsComplete = async(data, token) => {
    let result = null
    const toastId = toast.loading("Marking...")
    try{
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data,
        {
            Authorization : `Bearer ${token}`
        })
        if(!response.data.success) throw new Error(response.data.message)
        toast.success("Lecture Marked Completed")
        result = true
    }catch(err){
        console.log("LECTURE COMPLETION FAILED", err)
        toast.error("Lecture Couldn't be marked completed")
    }
    toast.dismiss(toastId)
    return result
}

export const instructorDashboard = async(token) => {
    // const toastId = toast.loading("Loading...")
    let response = []
    try{
        response = await apiConnector("GET", INSTRUCTOR_DASHBOARD_API, null, 
            {
              Authorization : `Bearer ${token}`
            })
        if(!response.data.success) throw new Error(response.data.message)
    }catch(err){
        toast.error("Instuctor Dashboard Details Fetch Failed")
        console.error("Instuctor Dashboard Details Fetch Failed",err)
    }
    // toast.dismiss(toastId)
    return response
}