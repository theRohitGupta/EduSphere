import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllInstructorCourses, instructorDashboard } from '../../../../services/operations/courseDetailsAPI'
import VisualizeStats from './VisualizeStats'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../../common/Spinner'

function InstructorDashboard() {
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile) 
    const navigate = useNavigate()

    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true)
            const instructorApiData = await instructorDashboard(token)
            // console.log(instructorApiData.data.data)
            const instructorCourses = await getAllInstructorCourses(token)
            // console.log(instructorCourses.data.data)
            setInstructorData(instructorApiData.data.data)
            setCourses(instructorCourses.data.data)
            setLoading(false)
        }
        getCourseDataWithStats()
    },[])

    // console.log(instructorData, courses)
    const totalCourses = courses?.length
    const totalAmount = instructorData?.reduce((acc,curr) => acc + curr.totalAmountGenerated, 0)
    const totalStudents = instructorData?.reduce((acc,curr) => acc + curr.totalStudentsEnrolled, 0)

  return (
    <div className=' relative'>
      {
        loading ? (
          (<div className=' absolute mt-[28%] left-[50%] -translate-x-[50%]'><Spinner/></div>)
        ) : (
          <div className='text-white flex flex-col pb-10 px-14'>
            <div className='w-[80%] flex flex-col gap-2 mb-6'>
              <p className='text-richblack-5 text-3xl font-semibold leading-10'>Hi {user.firstName} 👋</p>
              <p className='text-richblack-400 text-lg font-semibold leading-10'>Let's Start Something New</p>
            </div>
            <div className=' flex gap-4 mb-4'>
              <div className=' w-[75%] bg-richblack-800 p-5 rounded-xl'>
              {
                totalAmount > 0 || totalStudents > 0 ? (
                  <VisualizeStats courses={instructorData}/>
                ) : (
                  <div>
                    <p className='text-richblack-5 text-xl font-semibold leading-10'>Visulaize</p>
                    <p className='text-richblack-5 text-lg font-semibold leading-10'>Not Enough Data To Visualize</p>
                  </div>
                )
              }
              </div>
              <div className=' w-[25%] bg-richblack-800 p-5 flex flex-col gap-3 rounded-md'>
                <p className=' text-lg font-bold text-richblack-5'>Statistics</p>
                <div className=' flex flex-col gap-1'>
                  <p className=' text-lg text-richblack-200'>Total Courses</p>
                  <p className=' text-3xl font-semibold text-yellow-200'>{totalCourses}</p>
                </div>
                <div className=' flex flex-col gap-1'>
                  <p className=' text-lg text-richblack-200'>Total Students</p>
                  <p className=' text-3xl font-semibold text-yellow-200'>{totalStudents}</p>
                </div>
                <div className=' flex flex-col gap-1'>
                  <p className=' text-lg text-richblack-200'>Total Income</p>
                  <p className=' text-3xl font-semibold text-yellow-200'>&#8377;{Intl.NumberFormat("en-US").format(totalAmount)}</p>
                </div>
              </div>
            </div>
            <div className='  bg-richblack-800 p-5 rounded-xl flex flex-col gap-3'>
              <div className=' flex justify-between items-center'>
                <p className=' text-lg font-bold text-richblack-5'>Your Courses</p>
                <button onClick={() => navigate("/dashboard/my-courses")} className=' text-sm text-yellow-50'>View All</button>
              </div>
              <div className=' flex gap-4 justify-between '>
                {
                  !courses.length ? (
                    <div>No Courses Created Till Now</div>
                  ) : (
                    courses.slice(0,3).map((course) => (
                      <Link key={course._id} to={`/courses/${course._id}`} className=' w-1/3'>
                        <div className=' flex flex-col gap-1'>
                          <img src={course.thumbnail} alt={course.courseName} className=' rounded-md object-cover w-full h-[200px]'/>
                          <p className=' text-sm text-richblack-50'>{course.courseName}</p>
                          <div className=' flex gap-2 text-xs text-richblack-300'>
                            <p>{course.studentsEnrolled.length} Students</p>
                            |
                            <p>&#8377;{Intl.NumberFormat("en-US").format(course?.price)}</p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default InstructorDashboard