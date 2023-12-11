import React from 'react'
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/CTAButton'

function AboutSection3() {
    const stats = [
        {
            header : <p className='text-3xl'>World-Class Learning for <br/><HighlightText text={"Anyone, Anywhere"}/></p>,
            footer : <>
                        <p className='self-stretch text-sm text-richblack-300 font-inter font-normal leading-6 mt-2'>EduSphere partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                        <div className='mt-[28px] w-fit'><CTAButton active={true} linkto={'/'}>Learn More</CTAButton></div>
                    </>,
        },
        {
            header : "Curriculum Based on Industry Needs",
            footer : "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            header : "Our Learning Methods",
            footer : "The learning process uses the namely online and offline.",
        },
        {
            header : "",
            footer : "",
        },
        {
            header : "Certification",
            footer : "You will get a certificate that can be used as a certification during job hunting.",
        },
        {
            header : "Rating 'Auto-grading'",
            footer : "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
        },
        {
            header : "Ready to Work",
            footer : "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
        },
    ]
  return (
    <div>
        <div className=' grid grid-cols-4 px-[120px] py-[90px] text-white'>
        {
            stats.map((element,index) => (
                <div key={index} className={` ${index === 0 ? " col-span-2 pr-[52px]":" p-8"} h-[240px] font-inter ${[2,5].includes(index) ? " bg-richblack-800" : [1,4,6].includes(index) ? " bg-richblack-700" : " bg-transparent"}`}>
                    <div className='text-xl font-semibold leading-[26px] text-richblack-5'>{element.header}</div>
                    <div className={`${index === 0 ? "":" mt-[24px] self-stretch text-xs text-richblack-100 font-inter font-normal leading-5"}`}>{element.footer}</div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default AboutSection3