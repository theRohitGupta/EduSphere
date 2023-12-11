import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import React, { useEffect, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function VideoDetailsSidebar({setReviewModal}) {
  // const [ activeStatus, setActiveStatus ]= useState("");
  const [ videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate()
  const {sectionId, subSectionId} = useParams()
  const location = useLocation()
  const {courseSectionData, courseEntireData, totalNoOfLectures, completedLectures} = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if(!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
      // CURRENT SECTION
      // setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      // CURRENT SUBSECTION
      setVideoBarActive(activeSubSectionId);
    })()
  },[courseSectionData, courseEntireData, location.pathname])

  // console.log(courseEntireData)
  return (
    <div className='relative w-[20%]'>
      <div className=' flex w-[20%] h-full overflow-y-scroll no-scrollbar flex-col gap-4 border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 fixed left-0'>
        <div className=' flex flex-col gap-3'>
          <div className=' flex justify-between px-2'>
            <div onClick={() => navigate('/dashboard/enrolled-courses')} className=' flex gap-1 items-center text-yellow-400 cursor-pointer'><FiChevronLeft/> Back</div>
          </div>
          <div className=' flex flex-col gap-1 px-2'> 
            <p className=' text-xl font-semibold'>{courseEntireData?.courseName}</p>
            <p className=' text-richblack-400 text-sm'>Completed Lectures: {completedLectures?.length} / {totalNoOfLectures}</p>
            <div onClick={() => setReviewModal(true)} className=' flex gap-1 items-center text-yellow-50 cursor-pointer'>Add Review</div>
          </div>
        </div>
        <Accordion allowMultiple defaultIndex={[0]} className=' flex flex-col gap-2 pb-10'>
        {
          courseSectionData.map((section,index) => (
              <AccordionItem key={index}>  {/* onClick={() => setActiveStatus(section?._id)} */}
                <AccordionButton className=' bg-richblack-700 px-2 py-2 flex justify-between'>{section?.sectionName} <AccordionIcon /></AccordionButton>
                <AccordionPanel>
                  <div className=' flex flex-col gap-2 my-2'>
                    {
                      section.subSection.map((topic, index) => (
                        <div key={index} className={`flex gap-2 ${videoBarActive === topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-800 text-white"} px-2 `}
                          onClick={() => {navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${topic._id}`); setVideoBarActive(topic._id)}}>
                          <input type='checkbox' checked={completedLectures.includes(topic._id)} onChange={() => {}} />
                          <p>{topic.title}</p>
                        </div>
                      ))
                    }
                  </div>
                </AccordionPanel>
              </AccordionItem>
          ))
        }
        </Accordion>
      </div>
    </div>
  )
}

export default VideoDetailsSidebar