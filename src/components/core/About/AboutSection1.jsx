import React from 'react'
import HighlightText from '../../common/HighlightText'
import BannerImage1 from "../../../assets/Images/aboutus1.webp"
import BannerImage2 from "../../../assets/Images/aboutus2.webp"
import BannerImage3 from "../../../assets/Images/aboutus3.webp"

function AboutSection1() {
  return (
    <div className='pt-[114px] bg-richblack-800 relative pb-[300px]'>
      <p className=' text-richblack-200 text-center text-base'>About us</p>
      <header className=' w-7/12 mx-auto mt-[38px] px-[52px]'>
          <h1 className='text-richblack-5 text-4xl text-center font-semibold font-inter leading-[44px] -tracking-[0.72px]'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/></h1> 
          <p className=' mt-4 font-inter text-base font-medium leading-6 text-center text-richblack-300'>EduSphere is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
      </header>
      <div className=' absolute left-[50%] translate-x-[-50%]'>
        <div className='flex mt-[52px] justify-center items-center gap-6 relative'>
          <div className='absolute w-[30%] left-[50%] -top-3 h-[20%] translate-x-[-50%] rounded-md aboutBanner-gradient'></div>
          <img src={BannerImage1} alt="Banner" className='w-[384px] h-[311px] z-10'/>
          <img src={BannerImage2} alt="Banner" className='w-[384px] h-[311px] z-10 relative '/>
          <img src={BannerImage3} alt="Banner" className='w-[384px] h-[311px] z-10'/>
        </div>
      </div>
    </div>
  )
}

export default AboutSection1