import React from 'react'
import InstructorSection from './InstructorSection'
import ReviewSlider from '../../common/ReviewSlider'

function HomePageSection3() {
  return (
    <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mb-[50px]'>
        <InstructorSection/>

        <div className=' w-full flex flex-col gap-8'>
          <h2 className='text-center text-3xl font-semibold mt-[100px]'>Review from Other Learners</h2>
          <div className=' w-full'>
            <ReviewSlider/>
          </div>
        </div>
    </div>
  )
}

export default HomePageSection3