import React, { useEffect, useState } from 'react'
import VideoDetailsSidebar from '../components/core/Dashboard/StudentPages/VideoDetailsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/Dashboard/StudentPages/CourseReviewModal'
import { useDispatch, useSelector } from 'react-redux'
import { getFullCourseDetails } from '../services/operations/courseDetailsAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import Navbar from '../components/common/Navbar'

function ViewCourse() {
    const [ reviewModal, setReviewModal ] = useState(false)
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
      const setCourseSpecificDetails = async() => {
        const courseData = await getFullCourseDetails(courseId, token)
        // console.log(courseData)
        dispatch(setCourseSectionData(courseData.data.data.courseDetails.courseContent))
        dispatch(setEntireCourseData(courseData.data.data.courseDetails))
        dispatch(setCompletedLectures(courseData.data.data.completedVideos))
        let lectures = 0
        courseData?.data?.data?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures))
      }
      setCourseSpecificDetails();
    })
  return (
    <div className=' h-full text-white'>
      <Navbar backgroundColor={1}/>
      <div className=' relative flex pt-[50px]'>
          <VideoDetailsSidebar setReviewModal={setReviewModal}/>
          <div className=' w-[80%] pt-[50px]'>
              <div className=' mx-auto w-11/12'>
                  <Outlet/>
              </div>
          </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>} 
    </div>
  )
}

export default ViewCourse