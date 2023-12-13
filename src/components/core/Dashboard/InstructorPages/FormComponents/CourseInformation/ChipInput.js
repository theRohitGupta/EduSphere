import React, { useEffect, useState } from 'react'
import SupStar from '../../../../../common/SupStar'
import { RxCross2 } from "react-icons/rx"
import { useSelector } from 'react-redux'

function ChipInput({name, label, register, errors, setValue, getValues, disabled=false}) {
    const { editCourse, course } = useSelector((state) => state.course)
    const [ tagList, setTagList ] = useState([])

    useEffect(() => {
      if(editCourse) setTagList(course?.tag)
      register(name, {
        required: true,
        validate: (value) => value.length > 0
      })
    },[])

    useEffect(() => {
      setValue(name, tagList)
    },[tagList])

    const handleAddTag = (e) => {
      if(e.key === "Enter" || e.code === "Space" || e.key === ",") {
        e.preventDefault()
        const tag = e.target.value.trim()
        if(tag && !tagList.includes(tag)){
          setTagList([...tagList, tag])
          e.target.value = ''
        }
      }
    }

    const handleRemoveTag = (tagIndex) => {
      // console.log(tagIndex)
      const updatedTagList = tagList.filter((_,index) => index !== tagIndex)
      setTagList(updatedTagList)
    }


  return (
    <label className="relative">
      <p className=' form-field-title'>{label}<SupStar/></p>
      <div className=' flex gap-1 mb-2 flex-wrap'>
        {
          tagList.map((item,index) => (
            <span key={index} className=' px-2 py-1 flex justify-center items-center w-fit bg-richblack-700 text-yellow-50 rounded-3xl'>
              #{item}
              <button type='button' onClick={() => disabled ? {} : handleRemoveTag(index)}><RxCross2/></button>
            </span>
          ))
        }
      </div>
      <input className=' form-field' id={name} name={name} disabled={disabled} placeholder='Add Tag & Press Enter or Spacebar' onKeyDown={handleAddTag}/>
      {
        errors[name] && (
          <span className='form-error right-0'>Add at least one tag</span>
        )
      }
    </label>
  )
}

export default ChipInput