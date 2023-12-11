import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/free-mode';
import CourseCard from './CourseCard';

function Slider({Courses}) {
  return (
    <div>
      {
        Courses?.length ? (
          <Swiper slidesPerView={3} loop={true} spaceBetween={25} autoplay={{delay : 2500, disableOnInteraction: false}} freeMode={true} modules={[Autoplay,FreeMode]} className='mySwiper'> 
            {
              Courses?.map((course, index) => (
                <SwiperSlide key={index}>
                  <CourseCard course={course} Height={"h-[200px]"}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : (<p>No Course Found</p>) 
      }
    </div>
  )
}

export default Slider