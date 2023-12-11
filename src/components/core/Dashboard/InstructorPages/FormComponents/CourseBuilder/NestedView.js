import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md"
import { BiSolidDownArrow } from "react-icons/bi"
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../../slices/courseSlice'
import { TbLineHeight } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { HiPlusSm } from "react-icons/hi";

function NestedView({handleChange}) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  // console.log(course)

  const [ addSubSection, setAddSubSection ] = useState(null)
  const [ viewSubSection, setViewSubSection ] = useState(null)
  const [ editSubSection, setEditSubSection ] = useState(null)

  const [ confirmationModal, setConfirmationModal ] = useState(null)
  
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId : course._id,
    }, token)

    if(result) dispatch(setCourse(result.data.data))
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const data = {subSectionId, sectionId}
    const result = await deleteSubSection(data, token);

    if(result){
      const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result.data.data : section)
      const updatedCourse = {...course, courseContent: updatedCourseContent}
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }
  return (
    <div>
      <div className='rounded-lg bg-richblack-700 px-4 pt-2 pb-4 text-richblack-100 flex flex-col gap-4'>
        {
          course?.courseContent?.map((section) => (
            <details key={section._id} open>
              <summary className=' border-b-[1px] border-richblack-600 flex items-center justify-between gap-x-3'>
                <div className=' flex items-center gap-x-2 py-1'>
                  <TbLineHeight/>
                  <p className=' text-richblack-50 text-base'>{section.sectionName}</p>
                </div>
                <div className=' flex items-center gap-x-3'>
                  <button onClick={() => handleChange(section._id, section.sectionName)} className=' hover:text-yellow-50 hover:scale-110 duration-200'>
                    <FaRegEdit/>
                  </button>
                  <button onClick={() => {setConfirmationModal({
                    text1: "Delete this Section",
                    text2: "All the Lectures in this Section will be deleted",
                    btn1Text: "Delete Section",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null)
                  })}} className=' hover:text-pink-100 hover:scale-110 duration-200'>
                    <MdDelete/>
                  </button>
                  <span>|</span>
                  <BiSolidDownArrow className=' text-xs'/>
                </div>
              </summary>
              <div>
                {
                  section.subSection.map((data) => (
                    <div key={data?._id} onClick={() => setViewSubSection(data)} className=' flex items-center justify-between gap-x-3 border-b-[1px] border-richblack-600 pl-6 py-1'>
                      <div className=' flex items-center gap-x-3'>
                        <TbLineHeight/>
                        <p>{data.title}</p>
                      </div>
                      <div className=' flex items-center gap-x-3' onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setEditSubSection({...data, sectionId:section._id})} className=' hover:text-yellow-50 hover:scale-110 duration-200'>
                          <FaRegEdit/>
                        </button>
                        <button onClick={() => {setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "Lecture in this SubSection will be deleted",
                          btn1Text: "Delete Section",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null)
                        })}} className=' hover:text-pink-100 hover:scale-110 duration-200'>
                          <MdDelete/>
                        </button>
                      </div>
                    </div>
                  ))
                }
                <button onClick={() => setAddSubSection(section._id)} className=' text-yellow-50 flex items-center mt-2 text-sm'><HiPlusSm/><p>Add Lecture</p></button>
              </div>
            </details>
          ))
        }
      </div>
      {
        addSubSection ? (<SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />) : viewSubSection ? <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        /> : editSubSection ? (<SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />) : (<div></div>)
      }
      {
        confirmationModal ? (<ConfirmationModal modalData={confirmationModal}/>) : (<div></div>)
      }
    </div>
  )
}

export default NestedView