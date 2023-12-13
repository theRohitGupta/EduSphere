import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { getCourseDetails } from '../services/operations/courseDetailsAPI'
import getAvgRating from '../utils/avgRating'
import RatingStars from '../components/common/RatingStars'
import { PiInfo } from "react-icons/pi";
import { formattedDateNumeric } from '../utils/dateFormatter'
import { MdLanguage, MdOutlineAccessTime } from "react-icons/md";
import IconBtn from '../components/common/IconBtn'
import { TbPointer, TbDeviceMobileCheck } from "react-icons/tb";
import { LuFileCheck } from "react-icons/lu";
import NestedSection from '../components/core/CoursePage/NestedSection'
import { useDispatch, useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../utils/constants'
import { addToCart } from '../slices/cartSlice'
import { buyCourse } from '../services/operations/paymentApi'
import toast from 'react-hot-toast'
import copy from 'copy-to-clipboard'
import Spinner from '../components/common/Spinner'
import { Accordion } from '@chakra-ui/accordion'

function CoursePage() {
    const courseId = useParams()
    const [ loading, setLoading ] = useState(true)
    const [ courseData, setCourseData ] = useState(null)
    const [ avgReviewCount, setAvgReviewCount ] = useState(0)
    const [ totalLectures, setTotalLectures ] = useState(0)
    let collapseAll = []
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const [ purchasedCourse, setPurchasedCourse ] = useState(false)
    // console.log(courseData)
    
    useEffect(() => {
      const courseDetails = async() => {
        setLoading(true)
        try{
          const result = await getCourseDetails(courseId)
          setCourseData(result?.data?.data)
        }catch(err){
          console.log("COURSE DETAILS COULD NOT BE FETCHED",err)
        }
        setLoading(false)
      }
      courseDetails();
    },[courseId,user])

    useEffect(() => {
      if(courseData){
        if(courseData?.studentsEnrolled?.includes(user?._id)) setPurchasedCourse(true)
      }

      const count = getAvgRating(courseData?.ratingsAndReviews)
      setAvgReviewCount(count)
      let lectureCount = 0
      courseData?.courseContent?.forEach((subSection,i) => {
        lectureCount += subSection?.subSection?.length
        collapseAll.push(i)
      })
      setTotalLectures(lectureCount)

    },[courseData, user])

    const handleBuyCourse = () => {
      let courses = []
      courses.push(courseId.courseId)
      if(token){
        buyCourse(token,courses , user, navigate, dispatch)
        return;
      }
    }

    const handleShare = () => {
      copy(window.location.href);
      toast.success("Link Copied to Clipboard")
    } 

    const handleCollapse = () => {
      // console.log("Yes")
    }

  return (
    <div className=' relative'>
    {
      loading ? (
        <div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>
      ) : (
      <div>
        <Navbar backgroundColor={1}/>
        <div className=' pt-[100px] bg-richblack-800'>
          <div className=' flex gap-5 w-10/12 mx-auto relative'>
            <div className=' border-r-2 border-richblack-700 mb-10 mr-10 w-[65%] flex flex-col gap-3'>
              <p className=' text-richblack-300 text-sm left-6 font-normal'>Home / Learning / <span className=' text-yellow-50'>{courseData?.category?.name}</span></p>
              <p className=' text-3xl leading-9 text-richblack-5 font-medium'>{courseData?.courseName}</p>
              <p className=' text-richblack-300 text-sm font-normal'>{courseData?.courseDescription}</p>
              <div className=' flex gap-2 text-richblack-25 text-sm items-center'>
                <span className=' text-yellow-50'>{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount}/>
                <span>({courseData?.ratingsAndReviews?.length} ratings)</span>
                <span>{Intl.NumberFormat("en-US").format(courseData?.studentsEnrolled?.length)} students</span>
              </div>
              <p  className=' text-richblack-25 text-sm'><span className=' text-richblack-400'>Created by</span> {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}</p>
              <div className=' flex gap-3 text-richblack-25 text-sm'>
                <div className=' flex gap-1 items-center'><PiInfo/><p>Created at {formattedDateNumeric(courseData?.createdAt)}</p></div>
                <div className=' flex gap-1 items-center'><MdLanguage/><p>English</p></div>
              </div>
            </div>
            <div className=' w-[30%] absolute top-0 right-0'>
              <img src={courseData?.thumbnail} alt={courseData?.courseName} className=' rounded-t-lg h-[200px] object-cover w-full'/>
              <div className=' flex flex-col gap-4 p-5 bg-richblack-700 rounded-b-lg'>
                {
                  !user && (
                    <p className=' text-center text-richblack-50 text-sm'>You must Login/Signup to purchase a course</p>
                  )
                }
                {
                    user?.accountType === ACCOUNT_TYPE.STUDENT && purchasedCourse === false && (
                      <>
                        <p className=' text-richblack-5 text-2xl font-bold'>&#8377; {Intl.NumberFormat("en-US").format(courseData?.price)}</p>
                        <div className=' flex flex-col gap-2 '>
                          <IconBtn disabled={loading} onclick={() => dispatch(addToCart(courseData))} text={"Add to Cart"}/>
                          <IconBtn disabled={loading} onclick={() => handleBuyCourse()} text={"Buy Now"} color={1}/>
                        </div>
                        <p className=' text-center text-richblack-50 text-sm'>30-Day Money-Back Gurantee</p>
                      </>
                    )
                  }
                {
                  user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                    <p className=' text-center text-richblack-50 text-sm'>You must be a Student to purchase a course</p>
                  )
                }
                {
                  purchasedCourse === true && (
                    <div className=' flex justify-center items-center flex-col gap-2'>
                      <p className=' text-center text-richblack-50 text-sm'>You've Already Purchased The Course</p>
                      <Link to={'/dashboard/enrolled-courses'} className=' text-yellow-50 underline text-sm text-center'>Go To Enrolled Courses</Link>
                    </div>
                  )
                }
                <div className=' flex flex-col gap-1'>
                  <p className=' text-richblack-5 text-base font-medium'>This course includes:</p>
                  <div className=' flex flex-col gap-2 text-caribbeangreen-100 text-sm leading-6 font-normal'>
                    <p className=' flex gap-2 items-center'><MdOutlineAccessTime/> 8 hours on-demand video</p>
                    <p className=' flex gap-2 items-center'><TbPointer/>Full Lifetime access</p>
                    <p className=' flex gap-2 items-center'><TbDeviceMobileCheck/>Access on Mobile, Desktop and TV</p>
                    <p className=' flex gap-2 items-center'><LuFileCheck/>Certificate of Completion</p>
                  </div>
                </div>
                <button className=' flex justify-center items-center gap-1 text-yellow-50 text-sm' onClick={() => handleShare()}>Share</button>
              </div>
            </div>
          </div>

          <div className=' bg-richblack-900 flex-col text-white p-10 pl-0'>
            <div className=' flex flex-col gap-10 w-10/12 mx-auto'>
              <div className=' p-6 border-[1px] border-richblack-600 w-[67%]'>
                <p className=' text-2xl'>What you'll learn</p>
                <p className=' text-richblack-300 text-sm mt-4'>{courseData?.whatYouWillLearn}</p>
              </div>
              <div className=' w-[67%] flex flex-col gap-2'>
                <p className=' text-xl mb-1'>Course Content</p>
                <div className=' flex justify-between items-center'>
                  <div className=' flex gap-2 text-richblack-300 text-sm'>
                    <p>{courseData?.courseContent?.length} sections</p>
                    |
                    <p>{totalLectures} lectures</p>
                    |
                    <p>{courseData?.totalDuration} total length</p>
                  </div>
                  <button className=' text-yellow-50 text-xs' onClick={() => handleCollapse()}>Collapse all Sections</button>
                </div>
                <div className=' border-[1px] border-b-0 border-richblack-600 w-full'>
                  <Accordion allowMultiple defaultIndex={[]} >
                  {
                    courseData?.courseContent?.map((section) => (
                        <NestedSection section={section} key={section._id}/>
                    ))
                  }
                  </Accordion>
                </div>
              </div>
              <div className=' flex gap-2 flex-col w-[67%]'>
                <p className=' text-xl mb-1'>Author</p>
                <div className=' flex gap-3 items-center text-richblack-5'>
                  <img src={courseData?.instructor?.image} alt={`${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`} className=' h-[40px] rounded-full'/>
                  <p>{courseData?.instructor?.firstName} {courseData?.instructor?.lastName}</p>
                </div>
                <p className=' text-richblack-300 text-sm mt-1'>{courseData?.instructor?.additionalDetails?.about}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
      )
    }
  </div>
  )
}

export default CoursePage