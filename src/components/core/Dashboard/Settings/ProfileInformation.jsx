import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../../../../services/operations/settingsApi';

function ProfileInformation() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState:{errors, isSubmitSuccessful}, reset } = useForm();
    const [ loading,setLoading ] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const genders = ["Male", "Female", "Others"]

    const onSubmit = (data) => {
        if(!data.firstName) return 
        // console.log(data)
        data.token = token
        try{
            setLoading(true)
            dispatch(updateUserDetails(data)).then(() => setLoading(false))
        }catch(err){
            console.log("PROFILE UPDATION FAILED",err)
        }
    }

    useEffect(() => {
        reset();
    },[isSubmitSuccessful,reset])

  return (
    <div className=' flex flex-col gap-5 w-full border-[1px] border-richblack-700 p-5 rounded-lg bg-richblack-800 relative'>
        <p className='font-normal text-lg text-richblack-5'>Profile Information</p>
        <form className=' grid grid-cols-2 gap-x-8 gap-y-5' onSubmit={handleSubmit(onSubmit)}>
            <label className=' relative'>
                <p className=" form-field-title">First Name</p>
                <input type="text" disabled={loading} defaultValue={user?.firstName} placeholder='Enter First Name' {...register("firstName",{required:true})} className=" form-field"/>
                {
                    errors.firstName && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">First Name cannot be empty</span>)
                }
                {
                    !loading && !errors.firstName && (<p className=" absolute -bottom-6 form-field-title text-xs text-yellow-200 mt-1">Name entered above will be used for all issued certificates</p>)
                }
            </label>
            <label>
                <p className=" form-field-title">Last Name</p>
                <input type="text" disabled={loading} defaultValue={user?.lastName} placeholder='Enter Last Name' {...register("lastName")} className="form-field"/>
            </label>
            <div>
                <label htmlFor='dateOfBirth' className=" form-field-title">Date of Birth</label>
                <input type='date' disabled={loading} name='dateOfBirth' {...register("dateOfBirth",{ max: {value: new Date().toISOString().split("T")[0]}})} defaultValue={user?.additionalDetails?.dateOfBirth} className="form-field"/>
            </div>
            <div>
                <label htmlFor='gender' className=" form-field-title">Gender</label>
                <select type="text" name='gender' disabled={loading} defaultValue={user.additionalDetails.gender} {...register("gender")} className="form-field">
                <option value="" disabled>Select Your Gender</option>
                {
                    genders.map((ele,i) => {
                        return(<option key={i} value={ele}>{ele}</option>)
                    })
                }
                </select>
            </div>
            <label>
                <p className=" form-field-title">Contact Number</p>
                <div className='flex gap-1 relative'>
                    <div className='form-field w-[15%]'>+91</div>
                    <input type="tel" disabled={loading} maxLength={10} defaultValue={user.additionalDetails.contactNumber} placeholder='9876543210' {...register("contactNumber", {maxLength:{value:10,message:"Please Enter Maximum 10 Digits"},minLength:{value:10,message:"Please Enter Minimum 10 Digits"}})} className="form-field"/>
                    {
                        errors.contactNumber && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">{errors.contactNumber.message}</span>)
                    }
                </div>
            </label>
            <label>
                <p className=" form-field-title">About</p>
                <input defaultValue={user.additionalDetails.about} disabled={loading} placeholder='Tell Us About You...' {...register("about")} className="form-field no-scrollbar"/>
            </label>
            <div className=' w-full left-0 flex gap-4 absolute -bottom-12 justify-end items-center'>
                {
                    !loading && (<div>
                        <button disabled={loading} onClick={() => navigate('/dashboard/my-profile')} className=' common-btn bg-richblack-700 text-richblack-5 py-1 px-5'>Cancel</button>
                    </div>)
                }
                <button disabled={loading} type='submit' onClick={handleSubmit} className={`common-btn flex place-items-center gap-2 ${loading ?  "bg-richblack-700 text-richblack-5" : "bg-yellow-50 text-richblack-900"}  py-1 px-5`}>{loading ? "Saving..." : "Save"}</button>
            </div>
        </form>
    </div>
  )
}

export default ProfileInformation