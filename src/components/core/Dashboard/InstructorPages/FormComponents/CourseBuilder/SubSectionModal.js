import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../../slices/courseSlice';
import { RxCross2 } from "react-icons/rx"
import UploadFiles from '../UploadFiles';
import IconBtn from '../../../../../common/IconBtn';
import SupStar from '../../../../../common/SupStar';

function SubSectionModal({modalData, setModalData, add=false, view=false, edit=false}) {
  const { register, handleSubmit, setValue, formState : {errors}, getValues } = useForm();
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(false)
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth) 

  // console.log(add,view,edit)
  // console.log(modalData, setModalData)

  useEffect(() => {
    if(view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVideo !== modalData.videoUrl) return true
    else return false
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    // console.log(currentValues)
    const formData = new FormData()

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if(currentValues.lectureTitle !== modalData.title)
      formData.append("title", currentValues.lectureTitle)

    if(currentValues.lectureDesc !== modalData.description)
      formData.append("description", currentValues.lectureDesc)

    if(currentValues.lectureVideo !== modalData.videoUrl)
      formData.append("videoFile", currentValues.lectureVideo)

    setLoading(true)

    const result = await updateSubSection(formData, token)
    // console.log(result)

    if(result){
      const updatedCourseContent = course.courseContent.map((section) => section._id === result.data.data._id ? result.data.data : section)
      const updatedCourse = {...course, courseContent: updatedCourseContent}
      dispatch(setCourse(updatedCourse))
      setModalData(null)
    } 
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if(view) return;
    if(edit){
      if(!isFormUpdated) toast.error("No Changes")
      else handleEditSubSection()
      return
    }
    // console.log(modalData,data.lectureTitle,data.lectureDesc,data.lectureVideo)

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("videoFile", data.lectureVideo)
    setLoading(true)

    const result = await createSubSection(formData, token)

    if(result){
      const updatedCourseContent = course.courseContent.map((section) => section._id === result.data.data._id ? result.data.data : section)
      const updatedCourse = {...course, courseContent: updatedCourseContent}
      dispatch(setCourse(updatedCourse))
      setModalData(null)
    } 
    setLoading(false)
  }
  return (
    <div className=' fixed inset-0 z-[1000] pt-[70px] pb-[10px] overflow-y-scroll overscroll-y-none no-scrollbar grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='w-5/12 min-w-[350px] p-7 max-h-[10/12] text-white border-[1px] border-richblack-5 bg-richblack-800 rounded-lg'>
        <div className=' flex justify-between items-center'>
            <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
            <button onClick={() => (!loading ? setModalData(null) : {})}><RxCross2/></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-3'> 
          <UploadFiles
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl: null}
            editData={edit ? modalData.videoUrl: null}
            disabled={loading ? true : false}
          />
          <label>
            <p className=' form-field-title'>Lecture Title<SupStar/></p>
            <input id='lecturTitle' placeholder='Enter Lecture Title' disabled={view || loading ? true : false} {...register("lectureTitle", {required:true})} className=' w-full form-field'/>
            {
              errors.lectureTitle && (
                <span className=' form-error'>Lecture Title is required</span>
              )
            }
          </label>
          <label>
            <p className=' form-field-title'>Lecture Desc<SupStar/></p>
            <textarea id='lecturDesc' placeholder='Enter Lecture Description' disabled={view || loading ? true : false} {...register("lectureDesc", {required:true})} className=' w-full min-h-[130px] form-field'/>
            {
              errors.lectureDesc && (
                <span className=' form-error'>Lecture Description is required</span>
              )
            }
          </label>
          {
            !view && (
              <IconBtn disabled={loading ? true : false}
                text={loading ? "Loading..." : edit ? "Save Changes": "Save"}
              />
            )
          }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal