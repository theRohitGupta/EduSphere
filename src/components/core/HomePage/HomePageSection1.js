import React from 'react'
import Banner from "../../../assets/Images/banner.mp4"
import CodeBlocks from './CodeBlocks'
import ExploreMore from './ExploreMore'
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/CTAButton'
import { Link } from 'react-router-dom'
import { FiArrowRight } from "react-icons/fi"
import Ellipse1 from "../../../assets/ShadowSvgs/Ellipse 1.svg"

function HomePageSection1() {
  return (
    <div className=' relative mx-auto flex flex-col w-11/12 md:items-center text-white md:justify-between mt-[100px]'>
        <Link to={"/signup"}>
            <div className=' p-1 md:mx-auto group rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit btn-shadow'>
                <div className='flex items-center gap-1 rounded-full px-2 py-[2px] md:px-5 md:py-[5px] text-sm md:text-base'>
                    <p>Become an Instructor</p>
                    <FiArrowRight/>
                </div>
            </div>
        </Link>
        <div className=' md:text-center text-2xl md:text-4xl font-semibold mt-6 md:mt-8'>
            Empower Your Future with 
            <HighlightText text="Coding Skills"/>
        </div>

        <div className='md:w-[70%] mx-auto md:text-center mt-4 md:mt-8 text-sm homepage-text'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className=' flex px-1 gap-5 md:gap-7 mt-8 z-10'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div>

        <div className=' md:mx-3 mt-8 md:mt-16 md:mb-8 md:w-[90%] video-shadow-sm md:video-shadow-md lg:video-shadow-lg relative'>
            <img src={Ellipse1} className=' absolute -top-8 md:-top-24 md:-left-20' alt=""/>
            <video muted loop autoPlay className=' z-50 relative'>
                <source src={Banner} type='video/mp4'/>
            </video>
        </div>

        <div className=' md:w-[80%] mx-auto md:my-6 flex flex-col'>
            {/* CODEBLOCKS SECTION 1 */}
            <CodeBlocks 
            position={' flex-col md:flex-row'} 
            heading={
                <div className=' text-2xl md:text-4xl font-semibold'>
                    Unlock Your <HighlightText text={"Coding Potential"}/> with our Online Courses
                </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
                {
                    btnText : "Try it Yourself",
                    linkto : "/signup",
                    active : true
                }
            }
            ctabtn2={
                {
                    btnText : "Learn More",
                    linkto : "/login",
                    active : false
                }
            }

            codeblock={
                `<!DOCTYPE html>
                <html><head>
                <title>Example</title>
                <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                <h1><a href="/" >Header</a></h1>
                <nav> <a href="one/">One</a> <a href="two/">Two</a> <a href="three/">Three</a> </nav>
                </html>`
            }
            codeColor={"text-yellow-25"}
            backgroundGradient={"codeblock1-gradient"}
            />

            {/* CODEBLOCKS SECTION 2 */}
            <CodeBlocks 
            position={' flex-row-reverse'} 
            heading={
                <div className='text-4xl font-semibold'>
                    Start <HighlightText text={"Coding in Seconds"}/>
                </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
                {
                    btnText : "Continue Lesson",
                    linkto : "/signup",
                    active : true
                }
            }
            ctabtn2={
                {
                    btnText : "Learn More",
                    linkto : "/login",
                    active : false
                }
            }

            codeblock={
                `<!DOCTYPE html>
                <html><head>
                <title>Example</title>
                <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                <h1><a href="/">Header</a></h1>
                <nav> <a href="one/">One</a> <a href="two/">Two</a> <a href="three/">Three</a> </nav>
                </html>`
            }
            codeColor={"text-white"}
            backgroundGradient={"codeblock2-gradient"}
            />
        </div>
        
        <div className=' h-[450px]'></div>
        <div className=' w-10/12 absolute -bottom-20'>
            <ExploreMore/>
        </div>
    </div>
  )
}

export default HomePageSection1