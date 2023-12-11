import React from 'react'
import { BsFillPeopleFill } from "react-icons/bs"
import { RiOrganizationChart } from "react-icons/ri"

function CourseCard({cardData, currentCard, setCurrentCard}) {
  return (
    <div className={`flex flex-col justify-between ${currentCard === cardData.heading ? (" bg-richblack-5 exploreCard-shadow") : (" bg-richblack-800")} transition-all duration-200 cursor-pointer`} onClick={() => setCurrentCard(cardData.heading)}>
      <div className='flex flex-col gap-6 p-6'>
        <p className={`homepage-text font-semibold text-lg ${currentCard === cardData.heading ? (" text-richblack-900") : (" text-richblack-5")}`}>{cardData.heading}</p>
        <p className={`homepage-text ${currentCard === cardData.heading ? (" text-richblack-600") : (" text-richblack-400")}`}>{cardData.description}</p>
      </div>
      <div>
        <div className={`flex justify-between py-4 px-6 border-t-2 ${currentCard === cardData.heading ? (" border-richblack-50") : (" border-richblack-600")} border-dashed`}>
          <div className={`flex gap-2 items-center ${currentCard === cardData.heading ? (" text-blue-500") : (" homepage-text")} font-medium`}>
            <BsFillPeopleFill/>
            <p>{cardData.level}</p>
          </div>
          <div className={`flex gap-2 items-center ${currentCard === cardData.heading ? (" text-blue-500") : (" homepage-text")} font-medium`}>
            <RiOrganizationChart/>
            <p>{cardData.lessionNumber} lessons</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard