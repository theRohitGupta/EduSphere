import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/free-mode';
import { apiConnector } from '../../services/apiConnector';
import { ratingsEndpoints } from '../../services/apis';
import ReactStars from 'react-stars';

function ReviewSlider() {
    const [ reviews, setReviews ] = useState([])

    useEffect(() => {
        const fetchAllReviews = async() => {
            const allReviews = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            if(allReviews.data.success) setReviews(allReviews.data.data)
        }
        fetchAllReviews()
    },[])

    // console.log(reviews)
  return (
    <div>
        <Swiper slidesPerView={4} loop={true} spaceBetween={25} autoplay={{delay : 2500, disableOnInteraction: false}} freeMode={true} modules={[Autoplay,FreeMode]} className='mySwiper' >
            {
                reviews.map((review,i) => (
                    <SwiperSlide key={i} className=' p-5 bg-richblack-800'>
                        <div className=' flex flex-col gap-2'>
                            <div className=' flex gap-3'>
                                <img src={review.user.image} className=' rounded-full object-cover h-[50px] w-[50px] aspect-square'/>
                                <div className=' flex justify-around flex-col'>
                                    <p className='text-richblack-5 font-semibold'>{review.user.firstName} {review.user.lastName}</p>
                                    <p className=' text-sm text-richblack-400 line-clamp-1'>{review.course.courseName}</p>
                                </div>
                            </div>
                            <p className=' line-clamp-1 text-richblack-100'>{review.review}</p>
                            <div className=' flex gap-2 items-center text-yellow-200 font-bold'>
                                <p>{review.rating}</p>
                                <ReactStars value={review.rating} count={5} edit={false} size={24} activeColor="#ffd700"/>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

export default ReviewSlider