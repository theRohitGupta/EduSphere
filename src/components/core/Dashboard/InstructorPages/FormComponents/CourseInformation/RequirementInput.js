import React, { useEffect, useState } from 'react'
import SupStar from '../../../../../common/SupStar'
import { useSelector } from 'react-redux'

function RequirementInput({name, label, register, errors, setValue, getValues, disabled=false}) {
    const [ requirement, setRequirement ] = useState('')
    const [ requirementList, setRequirementList ] = useState([])
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if(editCourse) setRequirementList(course?.instructions)
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index,1)
        setRequirementList(updatedRequirementList)
    }
  return (
    <label className="relative">
        <p className='form-field-title'>{label}<SupStar/></p>
        <input className='form-field' id={name} value={requirement} disabled={disabled} placeholder='Add Requirements/Instructions' onChange={(e) => setRequirement(e.target.value)}/>
        <div className=' relative my-1'>
            {
                errors[name] && (
                    <span className='form-error right-0 bottom-0'>Add at least one requirement</span>
                )
            }
            <button type='button' disabled={disabled} className=' text-yellow-50 font-bold' onClick={handleAddRequirement}>Add</button>   
        </div>
        {
            requirementList.length > 0 && (
                <ul className=' flex flex-col gap-2'>
                    {
                        requirementList.map((req,i) => (
                            <li key={i} className=' flex gap-3 items-center'>
                                <span>{req}</span>
                                <button type='button' onClick={() => disabled ? {} : handleRemoveRequirement(i)} className=' text-xs cursor-pointer text-richblack-400'>clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }     
    </label>
  )
}

export default RequirementInput