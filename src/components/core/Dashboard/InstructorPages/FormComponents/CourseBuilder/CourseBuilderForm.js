import React, { useState } from 'react'
import SupStar from '../../../../../common/SupStar'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import toast from 'react-hot-toast';
import { setStep, setEditCourse, setCourse } from "../../../../../../slices/courseSlice"
import { createSection, updateSection } from '../../../../../../services/operations/courseDetailsAPI';
import { AiOutlinePlusCircle } from "react-icons/ai"
import { GoChevronRight } from "react-icons/go"

function CourseBuilderForm() {
  const { register, handleSubmit, setValue, formState:{errors} } = useForm();
  const [ editSectionName, setEditSectionName ] = useState(null)
  const { course } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const { token } = useSelector((state) => state.auth)
  
  // console.log(course)

  const onSubmit = async (data) => {
    setLoading(true)
    let result
    // console.log(editSectionName)
    if(editSectionName){
      result = await updateSection({
        sectionName : data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token)

      if(result){
        // console.log(result)
        const updatedCourseContent = course.courseContent.map((section) => section._id === result.data.data._id ? result.data.data : section)
        const updatedCourse = {...course, courseContent: updatedCourseContent}
        dispatch(setCourse(updatedCourse))
        setEditSectionName(null)
        setValue("sectionName", "")
      }
    }else {
      result = await createSection({
        sectionName : data.sectionName,
        courseId: course._id,
      }, token)
      if(result){
        dispatch(setCourse(result.data.data))
        setEditSectionName(null)
        setValue("sectionName", "")
      }
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const goBack = async () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goToNextStep = () => {
    if(course.courseContent.length === 0){
      toast.error("Please add at least 1 section")
      return
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add at least 1 lecture in each section")
      return
    }
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    // console.log(editSectionName,sectionId)
    if(editSectionName === sectionId){
      cancelEdit()
      return;
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }
  
  return (
    <div className=' p-6 rounded-lg border-[1px] border-richblack-700 bg-richblack-800 h-fit mt-8 flex flex-col gap-7'>
      <p className=' text-2xl font-semibold'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className=' relative'>
          <p className='form-field-title'>Section Name <SupStar/></p>
          <input type='text' id='sectionName' placeholder='Add Section Name' {...register("sectionName", { required: true})} className='form-field mb-3'/>
          {
            errors.sectionName && (
              <span className=' form-error right-0'>Section Name is required</span>
            )
          }
          <div className=' flex gap-3'>
            <IconBtn type={"submit"} text={editSectionName ? "Edit Section Name" : "Create Section"} outline={true} customClasses={"flex-row-reverse"} ><AiOutlinePlusCircle className=' h-5 w-5'/></IconBtn>
            {
              editSectionName && (
                <button onClick={cancelEdit} className=' text-sm text-richblack-300 hover:underline duration-200 hover:text-richblack-50'>Cancel Edit</button>
              )
            }
          </div>
        </label>
      </form>
      {
        course.courseContent.length > 0 && (
          <NestedView handleChange={handleChangeEditSectionName}/>
        )
      }
      <div className=' flex gap-2 justify-end'>
        <IconBtn text={"Back"} color={0} onclick={goBack}/>
        <IconBtn text={"Next"} customClasses={"flex-row-reverse"} onclick={goToNextStep}><GoChevronRight/></IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm