import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import Navbar from '../components/common/Navbar';
import { IoIosArrowRoundBack } from 'react-icons/io';

function ForgotPassword() {

  const [ emailSent, setEmailSent ] = useState(false);
  const [ email, setEmail ] = useState("")
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    setEmail(data.email)
    dispatch(getPasswordResetToken(data.email, setEmailSent));
  }
  const { loading } = useSelector((state) => state.auth); 

  return (
    <div className=' relative'>
      {
        loading ? (
          <div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>
        ) : (
          <div>
            <Navbar backgroundColor={1}/>
          
            <div className='font-inter w-4/12 mx-auto h-screen grid place-content-center p-8'>
              <h1 className=' text-richblack-5 text-3xl font-semibold leading-10'>
                {
                  !emailSent ? ("Reset Your Password") : ("Check Your Email")
                }
              </h1>
              <p className=' text-richblack-100 text-md font-normal leading-6 mt-3'>
                {
                  !emailSent 
                  ? ("Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery") 
                  : (`We have sent the reset email to ${email}`)
                }
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className=' my-5 '>
                {
                  !emailSent && (
                    <label>
                      <p className=' text-richblack-5 text-sm'>Email Address<sup className=' text-pink-300'>*</sup></p>
                      <input disabled={loading} required type='email' name='email' {...register("email")} placeholder='Enter Your Email Address' className=' form-text btn-shadow text-white'/>
                    </label>
                  )
                }
                <button type="submit" disabled={loading} className='mt-6 text-center text-sm md:text-base font-medium py-2 px-4 md:px-5 md:py-2 rounded-md leading-6 bg-yellow-50 text-black CTAbtn-shadow-yellow hover:scale-95 transition-all duration-200 w-full'>
                  {
                    !emailSent ? "Reset Password" : "Resend Email"
                  }
                </button>
              </form>
              <div>
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


export default ForgotPassword