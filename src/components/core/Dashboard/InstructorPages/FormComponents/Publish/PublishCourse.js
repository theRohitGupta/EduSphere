import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../../common/IconBtn'
import { GoChevronRight } from 'react-icons/go'
import { resetCourseState, setCourse, setStep } from '../../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { updateCourseDetails } from '../../../../../../services/operations/courseDetailsAPI'

function PublishCourse() {
    const { register, handleSubmit, setValue, getValues} = useForm()
    const [ loading, setLoading ] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
        }
    },[])

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async (data) => {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            // NO UPDATION IN FORM
            goToCourses()
            return
        }
        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)

        setLoading(true)

        const result = await updateCourseDetails(token,formData);

        if(result){
            goToCourses();
        }
        setLoading(false)
    } 

    const onSubmit = async (data) => {
        handleCoursePublish(data);
    }

    const goBack = () => {
        dispatch(setStep(2));
    }

  return (
    <div className=' p-6 rounded-lg border-[1px] border-richblack-700 bg-richblack-800 h-fit mt-8 flex flex-col gap-7'>
      <p className=' text-lg font-semibold'>Publish Settings</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=' flex gap-3 items-center'>
                <input type='checkbox' id='public' {...register("public")} className=' h-4 w-4 '/>
                <label htmlFor='public'>Make this course as <span className=' text-pink-600'>Public</span></label>
            </div>
            <div className=' flex gap-2 justify-end'>
                <IconBtn disabled={loading} text={"Back"} color={0} onclick={goBack}/>
                <IconBtn disabled={loading} text={"Save Changes"} customClasses={"flex-row-reverse"} />
            </div>
        </form>
    </div>
  )
}

export default PublishCourse