import React from 'react'
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/CTAButton'
import { GoArrowRight } from "react-icons/go"
import TimelineSection from './TimelineSection'
import LearningLanguageSection from './LearningLanguageSection'

function HomePageSection2() {
  return (
    <div className=' bg-pure-greys-5 text-richblack-700'>
        <div className=' homepage_bg h-[300px]'>
            <div className='h-[150px]'></div>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                <div className='flex gap-7 text-white'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className=' flex items-center gap-1'>
                            Explore Full Catalog
                            <GoArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>
        </div>

        <div className='mx-auto w-10/12 max-w-maxContent flex flex-col items-center gap-5 mt-[80px]'>
            <div className='flex gap-10 mb-10 justify-between'>
                <div className='text-4xl font-semibold'>
                    Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                </div>
                <div className=' flex flex-col gap-7 items-start'>
                    <p className=' text-base text-richblack-800'>The modern EduSPhere is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>

            <TimelineSection/>

            <LearningLanguageSection/>
        </div>
    </div>
  )
}

export default HomePageSection2