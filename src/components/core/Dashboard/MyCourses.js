import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn'
import { FaPlus } from "react-icons/fa"
import InstructorCoursesTable from './InstructorPages/InstructorCourses/InstructorCoursesTable'
import Spinner from '../../common/Spinner'

function MyCourses() {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [ courses, setCourses ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const fetchCourse = async() => {
        setLoading(true)
        const result = await getAllInstructorCourses(token)
        if(result) setCourses(result.data.data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        fetchCourse();
    },[setCourses])

    // console.log(courses)
  return (
    <div className=' relative'>
        {
            loading ? (
                <div className=' absolute mt-[28%] left-[50%] -translate-x-[50%]'><Spinner/></div>
            ) : (
                <div className=' text-richblack-5 flex flex-col gap-3 mb-8'>
                    <p className=' text-richblack-300 text-sm left-6 font-normal'>Home / Dashboard / <span className=' text-yellow-50'>Courses</span></p>
                    <div className=' flex justify-between items-center mb-6'>
                        <p className=' text-3xl leading-9 text-richblack-5 font-medium'>My Courses</p>
                        <IconBtn text={"Add Course"} onclick={() => navigate("/dashboard/add-course")} customClasses={" flex-row-reverse"}><FaPlus /></IconBtn>
                    </div>
                    <InstructorCoursesTable courses={courses} fetchCourse={fetchCourse}/>
                </div>                
            )
        }
    </div>

  )
}

export default MyCourses