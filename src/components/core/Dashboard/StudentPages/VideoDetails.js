import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../../services/operations/courseDetailsAPI'
import { updateCompletedLectures } from '../../../../slices/viewCourseSlice'
import { BigPlayButton, Player } from 'video-react'
import IconBtn from '../../../common/IconBtn'
import "video-react/dist/video-react.css"

function VideoDetails() {

  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playerRef = useRef()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)
  const [videoData, setVideoData] = useState([])
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const setVideoSpecificDetails = async() => {
      if(!courseSectionData.length) return
      if(!courseId && !sectionId && !subSectionId) navigate("/dashboard/enrolled-courses")
      else {
        // console.log(courseSectionData)
        // console.log(sectionId)
        const filteredData = courseSectionData.filter((course) => course._id === sectionId)
        // console.log(filteredData)
        const filteredVideoData = filteredData?.[0]?.subSection.filter((video) => video._id === subSectionId)
        // console.log(filteredVideoData)
        setVideoData(filteredVideoData[0])
        setVideoEnded(false)
      }
    }
    setVideoSpecificDetails()
  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) return true
    return false
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1) return true
    return false
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
    if(currentSubSectionIndex !== noOfSubSections - 1){
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }else{
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => subSection._id === subSectionId)
    if(currentSubSectionIndex !== 0){
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }else{
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete({courseId, subSectionId}, token)
    if(res) dispatch(updateCompletedLectures(subSectionId))
    setLoading(false)
  }

  return (
    <div>
      {
        !videoData ? (
          <div>
            No Data Found
          </div>
        ) : (
          <div className=' relative flex flex-col gap-2'>
            <Player ref={playerRef} aspectRatio='16:9' onEnded={() => setVideoEnded(true)} playsInline src={videoData.videoUrl}>
              { !videoEnded && <BigPlayButton position="center" />}
              {
                videoEnded &&
                (
                  <div className=' absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 flex justify-between gap-4 items-center'>
                      {
                        !isFirstVideo() && (
                          <IconBtn text={"Prev"} onclick={() => goToPrevVideo()}/>
                        )
                      }
                      <IconBtn customWidth={"w-fit"} disabled={loading} onclick={() => {
                      if(playerRef?.current){
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                      }
                      }} text={"Rewatch"}/>
                      {
                        !isLastVideo() && (
                          <IconBtn text={"Next"} onclick={() => goToNextVideo()}/>
                        )
                      }
                    </div>
                )
              }
              <div className=' absolute right-0'>
              {
                videoEnded && (
                  !completedLectures.includes(subSectionId) && (
                    <IconBtn disabled={loading} onclick={() => handleLectureCompletion()} customWidth={"w-fit"} text={!loading ? "Mark as Completed" : "Loading..."}/>
                  )
                )
              }
              </div>
            </Player>
            <div>
              <p className=' text-lg text-richblack-5 font-semibold'>{videoData.title}</p>
              <p className=' text-sm text-richblack-200'>{videoData.description}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VideoDetails