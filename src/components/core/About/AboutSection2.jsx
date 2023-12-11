import React from 'react'
import HighlightText from '../../common/HighlightText'
import FoundingStory from "../../../assets/Images/FoundingStory.png"
import Quote from './Quote'

function AboutSection2() {
    const stats = [
        {count: "5K", label: "Active Students"},
        {count: "10+", label: "Courses"},
        {count: "200+", label: "Mentors"},
        {count: "50+", label: "Awards"},
    ]
  return (
    <div>
        <div className='text-white'>
            <Quote/>
        </div>
        <div className='flex py-[90px] px-[150px] gap-[98px] justify-between'>
        {/* FOUNDING STORY LEFT BOX */}
            <div className='w-[40%]'>
                <p className='text-3xl'><HighlightText text={"Our Founding Story"} colorTheme={"red"}/></p>
                <p className=' mt-6 text-richblack-300 self-stretch font-inter text-base font-medium leading-6'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                <p className=' mt-4 text-richblack-300 self-stretch font-inter text-base font-medium leading-6'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
        {/* FOUNDING STORY RIGHT BOX */}
            <div className=' p-[32px] relative'>
                <div className='absolute w-[60%] -top-[1px] -left-1 h-[80%] rounded-full aboutFounding-story'></div>
                <img src={FoundingStory} className=' z-50 relative h-[278px]' alt="" />
            </div>
        </div>
        <div className='flex py-[90px] px-[150px] gap-[98px] justify-between'>
        {/* FOUNDING STORY LEFT BOX */}
            <div className='w-[40%]'>
                <p className='text-3xl'><HighlightText text={"Our Vision"} colorTheme={"orange"}/></p>
                <p className=' mt-6 text-richblack-300 self-stretch font-inter text-base font-medium leading-6'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
        {/* FOUNDING STORY RIGHT BOX */}
            <div className='w-[45%]'>
                <p className='text-3xl'><HighlightText text={"Our Mission"}/></p>
                <p className=' mt-6 text-richblack-300 self-stretch font-inter text-base font-medium leading-6'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </div>
        <div className='text-white flex justify-around items-center bg-richblack-800 px-[120px] py-[90px] gap-[10px]'>
        {
            stats.map((element,index) => (
                <div key={index} className='flex flex-col items-center justify-center gap-3'>
                    <p className=' text-richblack-5 font-inter text-[30px] font-bold leading-[38px]'>{element.count}</p>
                    <p className=' text-richblack-500 font-inter font-medium leading-6 text-[16px]'>{element.label}</p>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default AboutSection2