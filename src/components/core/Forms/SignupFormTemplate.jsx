import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';
import { setSignupData } from '../../../slices/authSlice';

function SignupFormTemplate({accountType}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        if(data.password !== data.confirmPassword){
            toast.error("Passwords Do Not Match")
            return
        }
        // console.log(data)
        data.accountType = accountType;
        dispatch(setSignupData(data))
        dispatch(sendOtp(data.email, navigate))
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(true);
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 sm:gap-y-2 mt-6">
            <div className="block sm:flex flex-wrap justify-between items-center">
                <label>
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">First Name<sup className="text-pink-200">*</sup></p>
                    <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full md:w-[220px] p-[12px] border-b-[1px] border-richblack-100" required type="text" name="firstName" {...register("firstName")} placeholder="Enter Your First Name" />
                </label>
                <div className="h-4 sm:hidden"></div>
                <label>
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Last Name<sup className="text-pink-200">*</sup></p>
                    <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full md:w-[220px] p-[12px] border-b-[1px] border-richblack-100" required type="text" name="lastName" {...register("lastName")} placeholder="Enter Your Last Name" />
                </label>   
            </div>
            <label className="w-full my-2">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
                <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-100" required type="email" name="email" {...register("email")} placeholder="Enter Your Email"/>
            </label>
            <div className="block sm:flex flex-wrap justify-between items-center relative">
                <label>
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Password<sup className="text-pink-200">*</sup></p>
                    <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full md:w-[220px] p-[12px] border-b-[1px] border-richblack-100" required type={showPassword ? ("text"):("password")} name="password" {...register("password")} placeholder="Enter Password"/>
                    <span className="absolute right-3 sm:right-64 top-[38px] cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}>
                        { showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                </label>
                <div className="h-4 sm:hidden"></div>
                <label>
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Confirm Password<sup className="text-pink-200">*</sup></p>
                    <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full md:w-[220px] p-[12px] border-b-[1px] border-richblack-100" required type={showCnfPassword ? ("text"):("password")} name="cnfPassword" {...register("confirmPassword")} placeholder="Re-enter Password"/>
                    <span className="absolute top-[125px] right-3 sm:top-[38px] cursor-pointer"
                    onClick={() => setShowCnfPassword((prev) => !prev)}>
                        {showCnfPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                </label>
            </div>
            <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 hover:bg-yellow-400 transition-all duration-500">
                Create Account
            </button>
        </form>
    </div>
    )
}

export default SignupFormTemplate