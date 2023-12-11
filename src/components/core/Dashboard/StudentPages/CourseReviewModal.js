import React, { useEffect } from 'react'
import IconBtn from '../../../common/IconBtn'
import SupStar from '../../../common/SupStar'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-stars'
import { createRating } from '../../../../services/operations/courseDetailsAPI'
import toast from 'react-hot-toast'

function CourseReviewModal({setReviewModal}) {
  const { user } = useSelector((state) => state.profile)
  const { register, handleSubmit, setValue, formState:{errors}} = useForm()
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courserating", 0)
  },[])

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async(data) => {
    if(!data.courseRating){
      toast.error("Please Add a Rating!")
      return
    }
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      }, token
    )
    setReviewModal(false)
  }
  return (
    <div className=' fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm'>
      <div className='w-11/12 max-w-[550px] text-richblack-5 bg-richblack-800 rounded-lg'>
          <div className=' flex flex-col gap-3'>
            <div className=' flex justify-between items-center bg-richblack-900 p-4 rounded-t-lg'>
              <p>Add Review</p>
              <p className=' cursor-pointer hover:text-pink-300 duration-200' onClick={() => setReviewModal(false)}>X</p>
            </div>
            <div className=' flex gap-2 justify-center items-center'>
              <div>
                <img src={user.image} alt={user.firstName} className=' rounded-full object-cover w-[50px] aspect-square h-[50px]'/>
              </div>
              <div>
                <p className='text-richblack-5 font-semibold'>{user.firstName} {user.lastName}</p>
                <p className=' text-sm text-richblack-400'>Posting Publicly</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col p-4'>
              <div className=' flex justify-center items-center'>
                <ReactStars count={5} onChange={ratingChange} size={24} activeColor="#ffd700"/>
              </div>
              <label className=' relative'>
                <p className=' form-field-title'>Add Your Experience <SupStar/></p>
                <textarea placeholder='Add Your Experience' id='courseExperience' {...register("courseExperience", {required: true})} className=' form-field min-h-[80px] w-full'/>
                {
                  errors.courseExperience && (
                    <span className=' form-error left-0 -bottom-3'>
                        Please Add Your Experience
                    </span>
                  )
                }
              </label>
              <div className=' flex gap-2 items-center justify-end'>
                <IconBtn text={"Cancel"} color={0} onclick={() => setReviewModal(false)}/>
                <IconBtn text={"Save"} type={"submit"}/>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default CourseReviewModal