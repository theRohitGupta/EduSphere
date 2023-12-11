import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
import Ellipse1 from "../../../assets/ShadowSvgs/Ellipse 1.svg"

const timeline = [
    {
        logo : Logo1,
        heading : "Leadership",
        description : "Fully committed to success company"
    },
    {
        logo : Logo2,
        heading : "Responsibility",
        description : "Students will always be our top priority"
    },
    {
        logo : Logo3,
        heading : "Flexibility",
        description : "The ability to switch is an important skills"
    },
    {
        logo : Logo4,
        heading : "Solve the problem",
        description : "Code your way to a solution"
    },
]

function TimelineSection() {
  return (
    <div>
        <div className='flex gap-14 items-center'>
            <div className=' w-[45%] flex flex-col gap-1'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div className=' flex flex-col gap-1' key={index}>
                                <div className='flex gap-6'>
                                    <div className=' w-[50px] h-[50px] bg-white rounded-full grid place-items-center shadow-md'>
                                        <img src={element.logo} alt='timeline'/>
                                    </div>
                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-sm homepage-text'>{element.description}</p>
                                    </div>
                                </div>
                                <div className={` ${element.heading === timeline[3].heading ? (" invisible") : ("border-l-[1.5px] mx-6 border-dotted h-[30px] border-richblack-200")}`}></div>
                            </div>
                        )
                    })
                }
            </div>

            <div className=' relative shadow-blue-200'>
                <img src={Ellipse1} className=' absolute -left-24 h-full' alt=""/>
                <img src={Ellipse1} className=' absolute -right-24 h-full' alt=""/>
                <img src={timelineImage} className='timeline-shadow relative z-40' alt="Timeline"/>
                <div className=' absolute bg-caribbeangreen-700 flex uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%] z-50'>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold text-white'>10</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold text-white'>250</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Types of Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection