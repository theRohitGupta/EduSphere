import React from 'react'

function IconBtn({text,onclick,children,disabled,outline,customClasses,type, color, customWidth}) {
  // console.log(onclick)
  return (
    <button disabled={disabled} onClick={onclick} type={type} className={` ${outline ? " text-yellow-50 bg-richblack-800 border-[1px] border-yellow-50": disabled || color===0?"bg-richblack-700 text-richblack-5":color===1?"bg-richblack-800 text-richblack-5":" bg-yellow-50 text-black"} text-center text-sm md:text-base font-medium py-2 px-4 md:px-5 md:py-2 rounded-md leading-6 hover:scale-95 transition-all duration-200 ${customWidth}`}>
        {
            children 
            ? (
                <div className={` flex place-items-center gap-2 ${customClasses}`}>
                    {children}
                    <span>{text}</span>
                </div>)
            : (text)
        }
    </button>
  )
}

export default IconBtn