import React from 'react'
import Navbar from '../components/common/Navbar'
import AboutSection1 from '../components/core/About/AboutSection1'
import AboutSection2 from '../components/core/About/AboutSection2'
import AboutSection3 from '../components/core/About/AboutSection3'
import ContactForm from '../components/common/ContactForm'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

function About() {
  return (
    <div>
        {/* <Navbar/> */}
        <Navbar backgroundColor={0}/>

        {/* SECTION 1 */}
        <AboutSection1/>

        {/* SECTION 2 */}
        <AboutSection2/>

        {/* SECTION 3 */}
        <AboutSection3/>

        {/* CONTACT FORM */}
        <div className=' px-[420px] py-[90px]'>
          <div className=' self-stretch text-center pb-[32px]'>
            <p className=' text-4xl font-semibold leading-[44px] text-richblack-5 tracking-[-0.72px]'>Get in Touch</p>
            <p className=' text-base font-medium mt-[12px] leading-6 text-richblack-300'>We’d love to here for you, Please fill out this form.</p>
          </div>
          <ContactForm/>
        </div>

        {/* REVIEWS */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mb-[50px]'>
            <div className=' w-full flex gap-8 flex-col'>
              <h2 className='text-center text-3xl font-semibold'>Review from Other Learners</h2>
              <div className=' w-full'>
                <ReviewSlider/>
              </div>
            </div>
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default About