import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { codes } from '../../data/countrycode';
import { apiConnector } from '../../services/apiConnector';
import { contactUsEndpoints } from '../../services/apis';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import logo from "../../assets/Logo/EduSphereWhite.png"

function ContactForm() {
    const [ loading, setLoading ] = useState(false)
    const { register, handleSubmit, reset, formState: {errors, isSubmitSuccessful} } = useForm();
    const countryCodes = codes;
    const [submittedFlag, setSubmittedFlag] = useState(false);
    const onSubmit = async(data) => {
        // console.log(data)
        try{
            setLoading(true)
            // const toastId = toast.loading("Submitting.....")
            const response = await apiConnector("POST", contactUsEndpoints.CONTACT_US_API, data)
            // console.log(response)/
            // toast.dismiss(toastId)
            setLoading(false)
        }catch(err){
            toast.error("Could Not Submit your Form")
            console.log("ERROR IN CONTACT FORM :", err)
            setLoading(false)
        }
    }
    useEffect(() => {
        if(isSubmitSuccessful){
            reset();
            setSubmittedFlag(true)
        }
    }, [reset, isSubmitSuccessful])
  return (
    <div>
        {
            loading 
            ? (<div className=' grid place-content-center min-h-[200px]'><Spinner/></div>)
            : (
                <>
                    {
                        submittedFlag ? (
                            <div className='text-richblack-200 text-lg font-normal leading-5 mt-[32px] p-[32px] pt-0 flex flex-col gap-4'>
                                <div className=' flex flex-col gap-2 justify-center items-center'>
                                    <p className=' text-base font-medium leading-6 text-richblack-300'>Thanks For Your Time</p>
                                    <p className=' text-base font-medium leading-6 text-richblack-300'>We Will Contact you Shortly</p>
                                </div>
                                <img src={logo} alt='EduSphere' className=' h-[60px] object-contain'/>
                            </div>
                        ) : (
                            <div className='font-inter'>
                            <form onSubmit={handleSubmit(onSubmit)} className='text-richblack-5 text-sm font-normal leading-5 mt-[32px] p-[32px] pt-0 flex flex-col gap-5'>
                                <div className='flex gap-5'>
                                    <label className='  w-[50%]'>
                                        <p>First Name<sup className=' text-pink-600'>*</sup></p>
                                        <input type='text' name='firstName' className='form-text btn-shadow' {...register("firstName", {required:true})} placeholder='Enter First name'/>
                                        {
                                            errors.firstName && (
                                                <span className=' text-pink-600'>Please Enter First name</span>
                                            )
                                        }
                                    </label>
                                    <label className=' w-[50%]'>
                                        <p>Last Name</p>
                                        <input type='text' className='form-text btn-shadow' {...register("lastName")} placeholder='Enter Last name'/>
                                    </label>
                                </div>
                                <label>
                                    <p>Email Address<sup className=' text-pink-600'>*</sup></p>
                                    <input type='email' className='form-text btn-shadow' {...register("email", {required:true})} placeholder='Enter Email Address'/>
                                    {
                                        errors.email && (
                                            <span className=' text-pink-600'>Please Enter Email</span>
                                        )
                                    }
                                </label>
                                <label>
                                    <p>Phone Number<sup className=' text-pink-600'>*</sup></p>
                                    <div className='flex gap-5'>
                                        <select name="countryCode" className='form-text btn-shadow w-[16%]' defaultValue={countryCodes[0]} {...register("countryCode")}>
                                        {
                                            countryCodes.map((element,index) => (
                                                <option key={index} value={element.code}>{element.code} - {element.country}</option>
                                            ))
                                        }
                                            </select>
                                        <input type='tel' className='form-text btn-shadow' {...register("phoneNumber", {required:{value : true,message:"Please Enter Phone Number"} })} placeholder='97548 37451'/>
                                        {
                                            errors.phoneNumber && (
                                                <span className=' text-pink-600'>{errors.phoneNumber.message}</span>
                                            )
                                        }
                                    </div>
                                </label>
                                <label>
                                    <p>Message<sup className=' text-pink-600'>*</sup></p>
                                    <textarea rows={5} type='text' className='form-text btn-shadow' placeholder='Enter Your Message' {...register("message", {required:true})}/>
                                    {
                                        errors.message && (
                                            <span className=' text-pink-600'>Please Enter Message</span>
                                        )
                                    }
                                </label>
                                <button type="submit" className='text-center text-sm md:text-base font-medium py-2 px-4 md:px-5 md:py-2 rounded-md leading-6 bg-yellow-50 text-black CTAbtn-shadow-yellow hover:scale-95 transition-all duration-200'>
                                    Send Message
                                </button>
                            </form>
                            </div>
                        )
                    }
                </>

            )
        }
    </div>
  )
}

export default ContactForm