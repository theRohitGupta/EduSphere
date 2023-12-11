import React from 'react'
import { convertSecondsToDuration } from '../../../utils/dateFormatter';
import NestedSubSection from './NestedSubSection';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';

function NestedSection({section}) {
    const totalSectionDuration = (section) => {
        let duration = 0
        section?.subSection?.forEach((lecture) => {
          duration += parseInt(lecture.timeDuration) 
        })
        return convertSecondsToDuration(duration)
      }

  return (
    <AccordionItem className='w-full border-b-[1px] border-richblack-600'>
      <AccordionButton className='bg-richblack-700 px-5'>
        <div className=' flex justify-between text-richblack-5 py-3 text-base w-full'>
          <div className=' flex gap-2 items-center'>
            <AccordionIcon />
            <p>{section?.sectionName}</p>
          </div>
          <div className=' flex gap-3 text-sm items-center'>
            <p className=' text-yellow-50'>{section?.subSection?.length} lectures</p>
            <p className=' w-[70px] text-right text-richblack-100'>{totalSectionDuration(section)}</p>
          </div>
        </div>
      </AccordionButton>
      <AccordionPanel>
        <Accordion allowMultiple className=' pl-10 pr-6 py-4'>
        {
          section?.subSection?.map((lecture) => (
              <NestedSubSection lecture={lecture} key={lecture._id}/>
          ))
        }
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default NestedSection