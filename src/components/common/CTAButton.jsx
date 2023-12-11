import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({children, active, linkto}) {
  return (
    <Link to={linkto}>
        <div className={`text-center text-sm md:text-base font-medium py-2 px-4 md:px-5 md:py-2 rounded-md leading-6 ${active ? 'bg-yellow-50 text-black CTAbtn-shadow-yellow' : 'bg-richblack-800 CTAbtn-shadow-black'} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton