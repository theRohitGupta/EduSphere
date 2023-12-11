import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from '../../common/HighlightText';
import CourseCard from './CourseCard';

const tabsname = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsname[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className=' flex flex-col justify-between gap-16'>
        <div>
            <div className='text-4xl font-semibold text-center text-white'>
                Unlock the
                <HighlightText text={"Power of Code"}/>
            </div>

            <p className='text-center homepage-text mt-3'>
                Learn to Build anything you can imagine
            </p>
        </div>

        <div className=' flex flex-col gap-2'>
            <div className='flex bg-richblack-800 rounded-full border-richblack-800 px-1 py-1 w-fit gap-2 mx-auto'>
                {
                    tabsname.map((element, index) => {
                        return (
                            <div 
                            className={`text-base flex items-center gap-2 
                            ${currentTab === element ? 
                            "bg-richblack-900 text-richblack-5 font-medium" 
                            : "text-richblack-200 "} 
                            rounded-full duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 `} 
                            key={index}
                            onClick = {() => setMyCards(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>
                
            <div className=' h-[30px]'></div>
            <div className='flex justify-between h-[300px] gap-10'>
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ExploreMore