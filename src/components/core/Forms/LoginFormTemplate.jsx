import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';

function LoginFormTemplate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        data.navigate = navigate;
        // console.log(data);
        dispatch(login(data));
    };
    const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-y-4 mt-3">
            <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
                <input type="email" name="Email" id="Email" {...register("email")} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-100" required placeholder='Enter Email Address'/>
            </label>
            <label className='relative'>
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Password<sup className="text-pink-200">*</sup></p>
                <input type={showPassword ? "text" : "password"} name="passwprd" id="password" {...register("password")} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-100" required  placeholder='Enter Password'/>
                <span className='absolute right-3 top-[38px] cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}>
                    {
                        showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                    }
                </span>
                <div className=' flex items-center justify-end'>
                    <Link to="/forgot-password">
                        <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto italic">Forgot Password?</p>
                    </Link>
                </div>
            </label>
            <button type="submit" className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-3 hover:bg-yellow-25 transition-all duration-500">Sign In</button>
        </form>
    </div>
  )
}

export default LoginFormTemplate