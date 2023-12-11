import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
import getAvgRating from '../../../utils/avgRating'

function CourseCard({course,Height}) {
  const [ avgReviewCount, setAvgReviewCount ] = useState(0)
  useEffect(() => {
    const count = getAvgRating(course?.ratingsAndReviews)
    setAvgReviewCount(count)
  })
  return (
    <div>
      <Link to={`/courses/${course._id}`}>
        <div className=' flex flex-col gap-3'>
          <div>
            <img src={course?.thumbnail} alt={course?.name} className={`${Height} w-full rounded-lg object-cover`}/>
          </div>
          <div className=' flex flex-col gap-1'>
            <p className=' text-sm text-richblack-5 leading-6'>{course?.courseName}</p>
            <p className=' text-xs text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className=' flex gap-2 text-richblack-25 text-sm items-center'>
              <span className=' text-yellow-50'>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount}/>
              <span>({course?.ratingsAndReviews?.length} ratings)</span>
            </div>
            <p className=' text-richblack-5 text-md'>&#8377; {Intl.NumberFormat("en-US").format(course?.price)}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard