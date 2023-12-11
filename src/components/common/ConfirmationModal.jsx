import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModal({modalData}) {
  return (
    <div className=' fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='w-fit max-w-[600px] p-7 text-white border-[1px] border-richblack-5 bg-richblack-800 rounded-lg'>
          <div className=' flex flex-col gap-3'>
              <p className=' text-2xl font-semibold text-richblack-5 text-center'>{modalData.text1}</p>
              <p className=' leading-6 text-richblack-200 mb-3 text-center'>{modalData.text2}</p>
              <div className=' flex gap-2 items-center justify-center'>
                  <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} />
                  <IconBtn onclick={modalData?.btn2Handler} color={0} text={modalData?.btn2Text}/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ConfirmationModal