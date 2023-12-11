import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import OTPInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { IoIosArrowRoundBack } from "react-icons/io"
import { GiBackwardTime } from "react-icons/gi"

function VerifyEmail() {
    const { signupData,loading } = useSelector((state) => state.auth)
    const [ otp, setOtp ] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(!signupData) navigate("/signup")
    },)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { accountType, firstName, lastName, email, password, confirmPassword} = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }
  return (
    <div className=' relative'>
      {
        loading ? (
          <div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>
        ) : (
          <div>
            <Navbar backgroundColor={1}/>
          
            <div className='font-inter w-3/12 mx-auto h-screen grid place-content-center'>
                <div className=' flex flex-col'>
                    <h1 className=' text-richblack-5 text-3xl font-semibold leading-10'>Verify Email</h1>
                    <p className=' text-richblack-100 text-md font-normal leading-6 mt-3'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={(e) => handleOnSubmit(e)} className=' pt-6'>
                        <OTPInput value={otp} onChange={setOtp} renderSeparator={<span></span>} numInputs={6} containerStyle={" flex gap-2"} inputType='number' skipDefaultStyles={true} renderInput={(props) => <input {...props} className=' bg-richblack-800 text-richblack-5 aspect-square rounded-lg text-center w-full' placeholder='-'/>}/>
                        <button type="submit" className=' mt-6 text-center text-sm md:text-base font-medium py-2 px-4 md:px-5 md:py-2 rounded-md leading-6 bg-yellow-50 text-black CTAbtn-shadow-yellow hover:scale-95 transition-all duration-200 w-full'>Verify Email</button>
                    </form>
                    <div className=' mt-4 flex justify-between items-center'>
                        <Link to="/login">
                            <p className=' text-richblack-5 flex gap-2 place-items-center'><IoIosArrowRoundBack className=' h-[18px]'/>Back to login</p>
                        </Link>
                        <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} className=' text-blue-100 flex gap-2 place-items-center'>
                            <GiBackwardTime className=' h-[18px]'/>Resend it
                        </button>
                    </div>
                </div>
            </div>
      
          </div>
        )
      }
    </div>
  )
}

export default VerifyEmail