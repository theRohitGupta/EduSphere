import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import toast from 'react-hot-toast';
import { updatePassword } from '../../../../services/operations/settingsApi';

function PasswordUpdate() {
    const { token } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState : {errors, isSubmitSuccessful}, reset } = useForm();
    const [ loading,setLoading ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const onSubmit = (data) => {
        if(data.oldPassword === data.newPassword) { toast.error("Both Passwords Can't Be Same"); return}
        try{
            setLoading(true)
            data.token = token
            dispatch(updatePassword(data)).then(() => setLoading(false))
        }catch(err){
            console.log("PASSWORD CHANGED FAILED",err)
        }
    };

    useEffect(() => {
        reset()
      }, [reset,isSubmitSuccessful])
      
  return (
    <div className=' flex flex-col gap-5 w-full border-[1px] border-richblack-700 p-5 pb-10 rounded-lg mt-12 bg-richblack-800 relative'>
        <p className='font-normal text-lg text-richblack-5'>Update Password</p>
        <form className=' grid grid-cols-2 gap-x-8 gap-y-5' onSubmit={handleSubmit(onSubmit)}>
            <label className='relative'>
                <p className=" form-field-title">Current Password</p>
                <input disabled={loading} type={showOldPassword ? ("text"):("password")} placeholder='Enter Current Password' {...register("oldPassword", {required : true})} className="form-field"/>
                <span className="absolute top-[125px] right-3 sm:top-[38px] cursor-pointer"
                    onClick={() => setShowOldPassword((prev) => !prev)}>
                    {showOldPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                </span>
                {
                    errors.oldPassword && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">Please Enter Your Current Password</span>)
                }
            </label>
            <label className='relative'>
                <p className=" form-field-title">New Password</p>
                <input disabled={loading} type={showNewPassword ? ("text"):("password")} placeholder='Enter New Password' {...register("newPassword", {required : true})} className="form-field"/>
                <span className="absolute top-[125px] right-3 sm:top-[38px] cursor-pointer"
                    onClick={() => setShowNewPassword((prev) => !prev)}>
                    { showNewPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                </span>
                {
                    errors.newPassword && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">Please Enter New Password</span>)
                }
            </label>
            <div className=' w-full left-0 flex gap-4 absolute -bottom-12 justify-end items-center'>
                {
                    !loading && (<div>
                        <button onClick={() => navigate('/dashboard/my-profile')} disabled={loading} className=' common-btn bg-richblack-700 text-richblack-5 py-1 px-5'>Cancel</button>
                    </div>)
                }
                <button type='submit' onClick={handleSubmit} disabled={loading} className={` ${loading ?  "bg-richblack-700 text-richblack-5" : "bg-yellow-50 text-richblack-900"} common-btn flex place-items-center gap-2 py-1 px-5`}>{loading ? "Updating..." : "Update"}</button>
            </div>
        </form>
    </div>
  )
}

export default PasswordUpdate