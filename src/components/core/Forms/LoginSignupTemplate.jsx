import React, { useState } from 'react'
import frame from "../../../assets/Images/frame.png"
import LoginFormTemplate from './LoginFormTemplate'
import SignupFormTemplate from './SignupFormTemplate';
import { ACCOUNT_TYPE } from '../../../utils/constants';


function LoginSignupTemplate({studentTitle, instructorTitle, studentSubTitle, instructorSubTitle, studentSpanText, instructorSpanText, formType, studentTemplateImage, instructorTemplateImage}) {
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  return (
    <div className='grid place-items-center relative'>
        <div className={`${formType === "login" ? "mt-[10%]" : "mt-[6%]"} max-w-[1160px] w-11/12 flex flex-wrap justify-center lg:justify-between pt-12 mx-auto gap-y-10 gap-x-6`}>
            <div className='flex flex-col w-full md:w-[40%]'>
                <div>
                    <p className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{accountType === ACCOUNT_TYPE.STUDENT ? studentTitle : instructorTitle}</p>
                    <p className="text-[1.125rem] leading-[1.625rem] mt-4">
                        <span className="text-richblack-100">{accountType === ACCOUNT_TYPE.STUDENT ? studentSubTitle : instructorSubTitle}</span>
                        <br/>
                        <span className="text-blue-100 italic">{accountType === ACCOUNT_TYPE.STUDENT ? studentSpanText : instructorSpanText}</span>
                    </p>
                </div>
                <div className={`flex flex-wrap gap-x-2 bg-richblack-800 border-b-[1px] border-richblack-100 w-fit px-[4px] py-[4px] rounded-3xl mt-9 text-richblack-100 ${formType === "login" ? "hidden" : ""}`}>
                    <button className={`py-[8px] px-[15px] rounded-full transition-all duration-400 ${accountType === ACCOUNT_TYPE.STUDENT ? " bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}`} onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}>
                        Student
                    </button>
                    <button className={`py-[8px] px-[15px] rounded-full transition-all duration-400 ${accountType === ACCOUNT_TYPE.INSTRUCTOR ? " bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}`} onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>
                        Instructor
                    </button>
                </div>
                <div className='mt-3'>
                    {
                        formType === "login" ? (<LoginFormTemplate/>) : (<SignupFormTemplate accountType={accountType}/>)
                    }
                </div>
            </div>
            <div className=" w-11/12 max-w-[450px] -order-1 md:order-none">
                {
                    formType === "signup" && <div className=' h-[100px] hidden md:block'></div>
                }
                <div className='relative'>
                    <img src={frame} alt=""  width={558} height={504} loading="lazy" />
                    <img src={accountType === ACCOUNT_TYPE.STUDENT ? studentTemplateImage : instructorTemplateImage} alt="" width={558} height={490} loading="lazy" className="absolute -top-4 right-4 object-fill" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginSignupTemplate