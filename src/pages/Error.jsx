import React from 'react'
import Navbar from '../components/common/Navbar'

function Error() {
  return (
    <div>
      <Navbar backgroundColor={1}/>
      <div className=' flex justify-center w-screen h-screen items-center'>
        <p className=' text-3xl text-white'>Error - 404 Not Found</p>
      </div>
    </div>
  )
}

export default Error