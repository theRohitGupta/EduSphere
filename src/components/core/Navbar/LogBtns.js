import React from 'react'
import { Link } from 'react-router-dom'

function LogBtns({link, text}) {
  return (
    <Link to={link}>
        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-700'>
            {text}
        </button>
    </Link>
  )
}

export default LogBtns