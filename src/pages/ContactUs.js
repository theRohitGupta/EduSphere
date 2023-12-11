import React from 'react'
import Navbar from '../components/common/Navbar'
import ContactForm from '../components/common/ContactForm' 
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { GiEarthAmerica } from "react-icons/gi"
import { BsFillTelephoneFill } from "react-icons/bs"
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

function ContactUs() {
    const contactInfo = [
        {
            icon : <HiChatBubbleLeftRight className='w-[24px] h-[24px]'/>,
            heading : "Chat on us",
            subheading : <p>Our friendly team is here to help.<br/><a href='mailto:itsmerohit.work@gmail.com'>@itsmerohit.work@gmail.com</a></p>
        },
        {
            icon : <GiEarthAmerica className='w-[24px] h-[24px]'/>,
            heading : "Visit us",
            subheading : <p>Come and say hello at our office HQ.<br/>HNO 28A Radhakunj Bhopal, Madhya Pradesh, PIN: 462022</p>
        },
        {
            icon : <BsFillTelephoneFill className='w-[24px] h-[24px]'/>,
            heading : "Chat on us",
            subheading : <p>Mon - Fri From 8AM to 5PM<br/><a href='tel:7049761589'>+91 - 70497 61589</a></p>
        },
    ]
  return (
    <div>
        <Navbar backgroundColor={0}/>
        <div className='mt-[30px] px-[120px] py-[90px] flex justify-between gap-[50px] font-inter'>
            <div className=' bg-richblack-800 h-fit p-6 items-start rounded-xl flex flex-col gap-6 w-[60%]'>
                {
                    contactInfo.map((element,index) => (
                        <div key={index} className=' flex gap-[9px] p-3'>
                            <div className=' text-richblack-100'>{element.icon}</div>
                            <div>
                                <p className=' text-richblack-5 self-stretch text-[18px] font-semibold leading-6 '>{element.heading}</p>
                                <div className=' text-richblack-200 self-stretch text-sm font-normal leading-6'>{element.subheading}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className=' p-[20px] rounded-xl border-[1px] border-richblack-600'>
                <div className=' self-stretch px-8 pt-4'>
                    <p className=' text-4xl font-semibold leading-[44px] text-richblack-5 tracking-[-0.72px]'>Got a Idea? We’ve got the skills. Let’s team up</p>
                    <p className=' text-base font-medium mt-[12px] leading-6 text-richblack-300'>Tell us more about yourself and what you’re got in mind.</p>
                </div>
                <ContactForm/>
            </div>
        </div>
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mb-[50px]'>
            <div className=' w-full flex gap-8 flex-col'>
              <h2 className='text-center text-3xl font-semibold'>Review from Other Learners</h2>
              <div className=' w-full'>
                <ReviewSlider/>
              </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ContactUs