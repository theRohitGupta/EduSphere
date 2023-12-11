import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, fetchCourseCategories, updateCourseDetails } from '../../../../../../services/operations/courseDetailsAPI';
import SupStar from '../../../../../common/SupStar';
import ChipInput from './ChipInput';
import RequirementInput from './RequirementInput';
import { BiChevronRight } from "react-icons/bi"
import IconBtn from '../../../../../common/IconBtn';
import { setStep, setCourse} from "../../../../../../slices/courseSlice"
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../../utils/constants';
import UploadFiles from '../UploadFiles';

function CourseInformationForm() {
    const { register, handleSubmit, setValue, getValues, formState:{errors} } = useForm();
    const dispatch = useDispatch(); 
    const { course, editCourse } = useSelector((state) => state.course)
    const [ loading, setLoading ] = useState(false)
    const [ courseCategories, setCourseCategories ] = useState([]);
    const { token } = useSelector((state) => state.auth) 

    // console.log(course)
    const continueWithoutSaving = () => {
        dispatch(setStep(2))
    }

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            // console.log(categories)
            if(categories.length > 0) setCourseCategories(categories)
            setLoading(false)
        }
        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseDescription", course.courseDescription)
            setValue("price", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            // console.log(course.category._id)
            setValue("courseCategory", course.category._id)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories();
    }, [])

    // console.log(course)

    const isFormUpdated = () => {
        const currentValues = getValues();
        // console.log(currentValues)
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDescription !== course.courseDescription ||
            currentValues.price !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category._id ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail) 
            return true
        return false
    }

    const onSubmit = async (data) => {     
        // console.log(data)
        if( editCourse ){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData()
    
                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName) formData.append("courseName", data.courseTitle)
                if(currentValues.courseDescription !== course.courseDescription) formData.append("courseDescription", data.courseDescription)
                if(currentValues.coursePrice !== course.price) formData.append("price", data.price)
                if(currentValues.courseTags.toString() !== course.tag.toString()) formData.append("tag", JSON.stringify(data.courseTags))
                if(currentValues.courseBenefits !== course.whatYouWillLearn) formData.append("whatYouWillLearn", data.courseBenefits)
                if(currentValues.courseCategory !== course.category._id) formData.append("category", data.courseCategory)
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()) formData.append("instructions", JSON.stringify(data.courseRequirements))
                if(currentValues.courseImage !== course.thumbnail) formData.append("thumbnailImage", data.courseImage)
                
                setLoading(true)
                const result = await updateCourseDetails(token, formData);
                setLoading(false)
                if(result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result?.data?.data))
                }else{
                    toast.error("NO CHANGES MADE SO FAR")
                }
            }else{
                toast.error("NO Changes Made to Form")
            }
            return
        }

        // CREATE NEW COURSE
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseDescription)
        formData.append("price", data.price)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        formData.append("status", COURSE_STATUS.DRAFT)

        setLoading(true)
        const result = await createCourse(token, formData);
        if(result) { 
            dispatch(setStep(2))
            dispatch(setCourse(result?.data?.data))
        }
        setLoading(false)
    }

  return (
    <div className=' p-6 rounded-lg border-[1px] border-richblack-700 bg-richblack-800 h-fit mt-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <label className=' relative'>
                <p className='form-field-title'>Course Title<SupStar/></p>
                <input type='text' id='courseTitle' placeholder='Enter Course Title' className='form-field' disabled={loading ? true : false} {...register("courseTitle", {required : true})}/>
                {
                    errors.courseTitle && <p className=' form-error right-0'>Course title is required</p>
                }
            </label>
            <label className="relative">
                <p className='form-field-title'>Course Short Description<SupStar/></p>
                <textarea id='courseDescription' placeholder='Enter Description' className='form-field min-h-[140px] w-full mb-0 no-scrollbar' disabled={loading ? true : false} {...register("courseDescription", {required: true})}/>
                {
                    errors.courseDescription && <p className=' form-error right-0'>Course Description is required</p>
                }
            </label>
            <label className="relative">
                <p className=' form-field-title'>Course Price<SupStar/></p>
                <div className='flex'>
                    <p className='form-field w-[10%] rounded-r-none grid place-content-center'>&#8377;</p>
                    <input type='number' id='price' placeholder='Enter Course Price' className='form-field rounded-l-none' disabled={loading ? true : false} {...register('price',{required:true})}/>
                </div>
                {
                    errors.price && <p className=' form-error right-0'>Course Price is required</p>
                }
            </label>
            <label className="relative">
                <p className=' form-field-title'>Course Category<SupStar/></p>
                <select id='courseCategory' defaultValue=""  className='form-field' disabled={loading ? true : false} {...register("courseCategory", {required : true})}>
                    <option value="" disabled>Choose a Category</option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id}> 
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span className=' form-error right-0'>Course Category is Required</span>
                    )
                }
            </label>

            <ChipInput name="courseTags" label="Tags" register={register} errors={errors} setValue={setValue} getValues={getValues} disabled={loading ? true : false}/>
            
            <UploadFiles name="courseImage" label={"Thumbnail Input"} errors={errors} register={register} setValue={setValue} getValues={getValues} editData={editCourse ? course?.thumbnail : null} disabled={loading ? true : false}/>

            <label className="relative">
                <p className=' form-field-title'>Benefits of the Course<SupStar/></p>
                <textarea id='coursebenefits' placeholder='Enter Benefits of the course' disabled={loading ? true : false} {...register("courseBenefits",{required:true})} className=' form-field min-h-[130px] w-full no-scrollbar'/>
                {
                    errors.courseBenefits && (
                        <span className='form-error right-0'>Benefits of the course is required</span>
                    )
                }
            </label>

            <RequirementInput name="courseRequirements" label="Requirements/Instructions" register={register} disabled={loading ? true : false} errors={errors} setValue={setValue} getValues={getValues}/>

            <div className=' absolute -bottom-20 right-0 flex gap-2'>
                {
                    editCourse && (
                        <IconBtn disabled={loading ? true : false} onclick={continueWithoutSaving} color={0}>Continue Without Saving</IconBtn>
                    )
                }
                <IconBtn type={"submit"} text={!editCourse ? "Next" : "Save Changes"} disabled={loading ? true : false} customClasses={" flex-row-reverse"}><BiChevronRight/></IconBtn>
            </div>
        </form>
    </div>
  )
}

export default CourseInformationForm