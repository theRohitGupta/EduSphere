import React from 'react'
import instructorImage from "../../../assets/Images/Instructor.png"
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/CTAButton'
import { FaArrowRight } from 'react-icons/fa'

function InstructorSection() {
  return (
    <div className='w-11/12'>
        <div className='flex items-center mt-16 justify-between'>
            <div className='w-[45%]'>
                <img src={instructorImage} className=' instructor-shadow' alt="Instructor" />
            </div>
            <div className='flex flex-col gap-10 p-10 w-[50%]'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an
                    <HighlightText text={"Instructor"}/>
                </div>
                <p className=' text-base w-[90%] text-richblack-300'>
                Instructors from around the world teach millions of students on EduSphere. We provide the tools and skills to teach what you love.
                </p>
                <div className=' w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection