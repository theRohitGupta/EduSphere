import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { IoIosArrowRoundBack } from 'react-icons/io';

function UpdatePassword() {
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(true);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data) => {
        // console.log(data);
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(data.password,data.confirmPassword,token,navigate))
    }

  return (
    <div className=' relative'>
      {
        loading ? (
          <div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>
        ) : (
          <div>
            <Navbar backgroundColor={1}/>
          
            <div className='font-inter w-4/12 mx-auto h-screen grid place-content-center'>
                <h1 className=' text-richblack-5 text-3xl font-semibold leading-10'>Choose new Password</h1>
                <p className=' text-richblack-100 text-md font-normal leading-6 mt-3'>Almost done. Enter your new password and you're all set.</p>
                <form onSubmit={handleSubmit(onSubmit)} className=' my-1'>
                    <div className="flex flex-col my-6">
                        <label className=' relative'>
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">New Password<sup className="text-pink-200">*</sup></p>
                            <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-100" required type={showPassword ? ("text"):("password")} name="password" {...register("password")} placeholder="Enter New Password"/>
                            <span className="absolute right-2 bottom-3 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}>
                                { showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                            </span>
                        </label>
                        <label className=' relative mt-5'>
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Confirm New Password<sup className="text-pink-200">*</sup></p>
                            <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-100" required type={showCnfPassword ? ("text"):("password")} name="cnfPassword" {...register("confirmPassword")} placeholder="Re-enter Confirm New Password"/>
                            <span className="absolute right-2 bottom-3 cursor-pointer"
                            onClick={() => setShowCnfPassword((prev) => !prev)}>
                                {showCnfPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                            </span>
                        </label>
                    </div>
                    <button type="submit" className=' mt-2 text-center text-sm md:text-base font-medium py-2 px-4 md:px-5 md:py-2 rounded-md leading-6 bg-yellow-50 text-black CTAbtn-shadow-yellow hover:scale-95 transition-all duration-200 w-full'>
                        Reset Password
                    </button>
                </form>
                <div className=' mt-2'>
                    <Link to="/login">
                        <p className=' text-richblack-5 flex gap-2 place-items-center'><IoIosArrowRoundBack className=' h-[18px]'/>Back to login</p>
                    </Link>
                </div>
            </div>
      
          </div>
        )
      }
    </div>
  )
}

export default UpdatePassword