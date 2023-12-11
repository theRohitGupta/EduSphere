import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './Publish/PublishCourse'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function RenderSteps() {
  const { step, course, editCourse } = useSelector((state) => state.course)
  const navigate = useNavigate()
  useEffect(() => {
    if(editCourse){
      navigate(`/dashboard/edit-course/${course._id}`)
    }
  }, [])

  const steps = [
    {
      id : 1,
      title : "Course Information"
    },
    {
      id : 2,
      title : "Course Builder"
    },
    {
      id : 3,
      title : "Publish"
    }
  ]
  return (
    <div>
      <div className=' flex justify-center items-center'>
        {
          steps.map((item) => (
            <div key={item.id} className={` flex flex-col gap-2 ${item.id !== 3 ? " w-[200px]" : ""} relative`}>
              <div className={`flex items-center ${item.id !== 1 ? " justify-start": " justify-end"}`}>
                <div className={``}>
                  <div className={`${step >= item.id ? step > item.id ? "bg-yellow-50 border-yellow-50 text-richblack-900" :"bg-yellow-900 border-yellow-50 text-yellow-50" : " border-richblack-700 bg-richblack-800 text-richblack-300"} flex place-items-center place-content-center w-10 aspect-square p-2 rounded-full border-[1px]`}>
                  {
                    step > item.id ? (<FaCheck  className=' h-5 w-5'/>) : (item.id)
                  }
                  </div>
                </div>
                {
                  item.id !== 3 && <div className='w-[100%] h-[2px]'><div className="flex items-center"><div className={`border-t-2 border-dashed ${step > item.id ? "border-yellow-50" :"border-richblack-300"}  flex w-full`}></div></div></div>
                }
              </div>
              <div className={`flex items-center justify-start ${item.id === 1 ? "-ml-[25%]" : item.id === 2 ? "-ml-[15%]" : "-ml-[10%]"}`}>
                  <p className={` ${step > item.id ? " text-richblack-400" : " text-richblack-5"}`}>{item.title}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className=' relative'>
        {step === 1 && (<CourseInformationForm />)}
        {step === 2 && (<CourseBuilderForm />)}
        {step === 3 && (<PublishCourse/>)}
      </div>
    </div>
  )
}

export default RenderSteps