import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses, unEnrollCourse } from '../../../../services/operations/userDetails';
import { HiOutlineDotsVertical } from "react-icons/hi";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import Spinner from '../../../common/Spinner';

function EnrolledCourses() {
  const [ allPendingCompleted, setAllPendingCompleted] = useState("all");
  const [ allEnrolledCourses, setAllEnrolledCourses] = useState([])
  const [ enrolledCourses, setEnrolledCourses ] = useState([])
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [ confirmationModal, setConfirmationModal ] = useState(null);
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  const unEnrollUserCourse = async(courseId) => {
    setLoading(true)
    try{
      const result = await unEnrollCourse(token, courseId)
      setEnrolledCourses(result.data.data.courses)
      setAllEnrolledCourses(result.data.data.courses)
      setConfirmationModal(null)
    }catch(err){
      // console.log("UNENROLL COURSE FAILED")
      // console.error(err)
    }
    setLoading(false)
  }
 
  useEffect(() => {
    const fetchEnrolledCourses = async() => {
      setLoading(true)
      try{
        const result = await getUserEnrolledCourses(token);
        // console.log(result)
        setEnrolledCourses(result?.data?.EnrolledCourses)
        setAllEnrolledCourses(result?.data?.EnrolledCourses)
      }catch(err){
        // console.log("FETCH ENROLLED COURSES FAILED")
        // console.error(err)
      }
      setLoading(false)
    }
    fetchEnrolledCourses();
  },[user])

  useEffect(() => {
    // console.log(allEnrolledCourses)
    if(allEnrolledCourses.length){
      // console.log(allPendingCompleted)
      if(allPendingCompleted === "completed") setEnrolledCourses(allEnrolledCourses.filter((courses) => courses.progressPercentage === 100))
      else if(allPendingCompleted === "pending") setEnrolledCourses(allEnrolledCourses.filter((courses) => courses.progressPercentage !== 100))
      else setEnrolledCourses(allEnrolledCourses)
    }
  }, [allPendingCompleted])
  
  return (
    <div className=' relative no-scrollbar'>
    {
      loading ? (
        <div className=' absolute mt-[28%] left-[50%] -translate-x-[50%]'><Spinner/></div>
        ) : ( 
        <div className=' pb-14 h-full'>
          <div className=' flex flex-col gap-3'>
            <p className=' text-richblack-300 text-sm left-6 font-normal'>Home / Dashboard / <span className=' text-yellow-50'>Enrolled Courses</span></p>
            <p className=' text-3xl leading-9 text-richblack-5 font-medium'>Enrolled Courses</p>
          </div>
          {
            allEnrolledCourses?.length ? (
              <div className=' flex flex-col gap-10'>
              <div className={`flex flex-wrap gap-x-2 bg-richblack-800 border-b-[1px] border-richblack-100 w-fit px-[4px] py-[4px] rounded-3xl mt-9 text-richblack-100 `}>
                  <button className={'py-[6px] px-[20px] rounded-full transition-all duration-400'+`${allPendingCompleted === "all" ? " bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}`} onClick={() => setAllPendingCompleted("all")}>
                      All
                  </button>
                  <button className={'py-[6px] px-[20px] rounded-full transition-all duration-400'+`${allPendingCompleted === "pending" ? " bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}`} onClick={() => setAllPendingCompleted("pending")}>
                      Pending
                  </button>
                  <button className={'py-[6px] px-[20px] rounded-full transition-all duration-400'+`${allPendingCompleted === "completed" ? " bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}`} onClick={() => setAllPendingCompleted("completed")}>
                      Completed
                  </button>
              </div>
              {
                enrolledCourses?.length ? (
                <div>
                <div className="border-[1px] border-richblack-700 rounded-lg">
                      <div className=" bg-richblack-700 rounded-t-lg">
                          <div className=" flex px-6 py-4 text-richblack-100 text-sm text-center">
                              <div className=" font-light w-[50%] text-left">COURSE NAME</div>
                              <div className=" font-light w-[10%]">DURATION</div>
                              <div className=" font-light w-[35%]">PROGRESS</div>
                              <div className=" font-light w-[5%]"></div>
                          </div>
                      </div>
                      <div>
                          {
                              enrolledCourses?.map((course) => (
                                  <div key={course._id} className=" flex p-4 cursor-pointer text-richblack-100 text-sm border-b-[1px] border-richblack-700"
                                  onClick={() => navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                      <div className=" flex gap-x-4 w-[50%]">
                                          <img src={course?.thumbnail} className=' h-[100px] aspect-video rounded-lg object-cover' alt={course?.coursename}/>
                                          <div className=' flex flex-col gap-3 justify-center'>
                                              <p className=' text-lg text-richblack-5 font-semibold'>{course.courseName}</p>
                                              <p className='line-clamp-2'>{course?.courseDescription}</p>
                                          </div>
                                      </div>
                                      <div className="w-[10%] flex items-center justify-center">
                                          {course?.totalDuration}
                                      </div>
                                      <div className="w-[35%] flex items-center justify-center flex-col gap-2">
                                          <p>Progress: {course.progressPercentage || 0}%</p>
                                          <div className=' w-[40%]'>
                                            <ProgressBar completed={course.progressPercentage || 0} height='12px' isLabelVisible={false}/>
                                          </div>
                                      </div>
                                      <div className="w-[5%] flex items-center justify-center text-xl gap-3">
                                        <div className=' group relative' onClick={(e) => e.stopPropagation()}>
                                          <HiOutlineDotsVertical/>
                                          <div className='invisible absolute -left-[50%] top-[60%] z-[1000] flex w-[150px] translate-x-[-50%] translate-y-[3em] flex-col gap-1 rounded-lg bg-richblack-700 p-2 text-richblack-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 text-sm'>
                                            <div className="absolute left-[42%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-700"></div>
                                            <button>
                                              <p className='rounded-lg bg-transparent hover:bg-richblack-600 hover:text-yellow-50 p-1' >
                                                  Mark as Completed
                                              </p>
                                            </button>
                                            <button onClick={() => { setConfirmationModal({
                                                                                            text1: "Are You Sure?",
                                                                                            text2: "You want to UnEnroll From This Course. This may be a Paid Courses. UnEnrolling from your any Course is permanent and will remove all the content associated with it.",
                                                                                            btn1Text : "Delete Course",
                                                                                            btn2Text : "Cancel",
                                                                                            btn1Handler : () => unEnrollUserCourse(course._id),
                                                                                            btn2Handler : () => setConfirmationModal(null),
                                                                                                  })}}>
                                              <p className='rounded-lg bg-transparent hover:text-pink-100 hover:bg-richblack-600 p-1' >
                                                  Delete
                                              </p>
                                            </button>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                              )) 
                          }
                      </div>
                  </div>
                </div>
                ) : (
                  <div className=' text-xl leading-9 text-richblack-100 font-medium flex items-center justify-center h-full capitalize'>No {allPendingCompleted} Courses</div>
                )
              }

            </div>
            ) : (
              <div className=' text-xl leading-9 text-richblack-100 font-medium flex items-center justify-center mt-[25%]'>No Enrolled Courses</div>
            )
          }
          {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
        )
    }
    </div>
  )
}

export default EnrolledCourses