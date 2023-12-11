import React from 'react'
import HighlightText from '../../common/HighlightText'
import knowYourProgressImage from "../../../assets/Images/Know_your_progress.png"
import compareWithOthersImage from "../../../assets/Images/Compare_with_others.png"
import planYourLessonsImage from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from '../../common/CTAButton'

function LearningLanguageSection() {
  return (
    <div className='my-[100px]'>
        <div className=' flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for
                <HighlightText text={"learning any language"}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto text-base mt-3 w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className=' flex items-center justify-center mt-5'>
                <img className=' -mr-32' src={knowYourProgressImage} alt="know your progress" />
                <img src={compareWithOthersImage} alt="know your progress" />
                <img className=' -ml-36' src={planYourLessonsImage} alt="know your progress" />
            </div>

            <div className=' w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection