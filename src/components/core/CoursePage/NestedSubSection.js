import React from 'react'
import { PiMonitorPlayFill } from 'react-icons/pi'
import { convertSecondsToDurationTime } from '../../../utils/dateFormatter'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';

function NestedSubSection({lecture}) {
  return (
  <AccordionItem key={lecture._id} className=' py-1'>
    <AccordionButton className=' flex justify-between'>
      <div className=' flex gap-2 items-center text-base text-richblack-50'>
          <PiMonitorPlayFill/>
          {lecture?.title}
          <AccordionIcon />
      </div>
      <p className=' text-richblack-400 text-sm'>{convertSecondsToDurationTime(lecture?.timeDuration)}</p>
    </AccordionButton>
    <AccordionPanel>
      <div className=' px-6 py-2 text-sm text-richblack-400'>
        {lecture?.description}
      </div>
    </AccordionPanel>
  </AccordionItem>
  )
}

export default NestedSubSection