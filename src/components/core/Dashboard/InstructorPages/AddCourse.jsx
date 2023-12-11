import React from 'react'
import RenderSteps from './FormComponents/RenderSteps'
 import { BsLightningChargeFill } from "react-icons/bs"
import { setEditCourse } from '../../../../slices/courseSlice'

function AddCourse() {
  return (
    <div className='text-white flex gap-6 pb-32 px-14'>
        <div className='w-[85%]'>
            <h1 className='text-richblack-5 text-3xl font-semibold leading-10 mb-8'>Add Course</h1>
            <RenderSteps/>
        </div>
        <div className=' p-6 rounded-lg border-[1px] border-richblack-700 bg-richblack-800 flex flex-col gap-6 items-start h-fit aspect-square'>
          <p className=' flex place-items-center  font-boldest font-inter leading-6 text-richblack-5 gap-1'><BsLightningChargeFill className=' text-yellow-50'/>Course Upload Tips</p>
          <ul className=' flex flex-col justify-around items-start h-full text-sm leading-5 font-inter list-disc pl-4 gap-1 text-richblack-5 font-normal'>
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024x576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create & organize a course.</li>
              <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
              <li>Information from the Additional Data section shows up on the course single page.</li>
              <li>Make Announcements to notify any important</li>
              <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
    </div>
  )
}

export default AddCourse