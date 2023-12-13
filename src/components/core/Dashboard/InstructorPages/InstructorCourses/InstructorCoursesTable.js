import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { formattedDate, formattedDateTime } from '../../../../../utils/dateFormatter'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { BsClockFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteCourse } from '../../../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

function InstructorCoursesTable({courses, fetchCourse}) {
    const [ loading, setLoading ] = useState(false)
    const [ confirmationModal, setConfirmationModal ] = useState(null)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const handleDeleteCourse = async(courseId) => {
        setLoading(true)
        const data = {courseId}
        await deleteCourse(data,token)
        fetchCourse()
        setConfirmationModal(null)
        setLoading(false)
    }
  return (
    <div >
    {
        courses.length === 0 ? (
            <div className=' text-richblack-100 text-xl left-6 font-normal flex items-center justify-center mt-[20%]'>No Courses Created Till Now</div>
        ) : (
            <div className=" border-[1px] border-richblack-700 rounded-lg">
                <Table >
                    <Thead className=" border-b-[1px] border-richblack-700">
                        <Tr className=" flex p-6 text-richblack-100 text-sm">
                            <Th className=" font-light w-[70%] text-left">COURSE</Th>
                            <Th className=" font-light w-[10%]">DURATION</Th>
                            <Th className=" font-light w-[10%]">PRICE</Th>
                            <Th className=" font-light w-[10%]">ACTIONS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            courses?.map((course) => (
                                <Tr key={course._id} onClick={() => navigate(`/courses/${course._id}`)} className=" flex p-8 cursor-pointer text-richblack-100 text-sm">
                                    <Td className=" flex gap-x-4 w-[70%]">
                                        <img src={course?.thumbnail} className=' h-[160px] aspect-video rounded-lg object-cover' alt={course?.coursename}/>
                                        <div className=' flex flex-col gap-2 justify-around'>
                                            <p className=' text-lg text-richblack-5 font-semibold'>{course.courseName}</p>
                                            <p className='line-clamp-2'>{course?.courseDescription}</p>
                                            <p className=' text-xs'>Created: {formattedDate(course?.createdAt)} | {formattedDateTime(course?.createdAt)}</p>
                                            {
                                                course?.status === COURSE_STATUS.DRAFT ? (
                                                    <div className=' flex items-center gap-1 p-1 bg-richblack-700 text-pink-100 w-fit rounded-3xl text-xs'><BsClockFill /><p>Drafted</p></div>
                                                ) : (
                                                    <div className=' flex items-center gap-1 p-1 bg-richblack-700 text-yellow-50 w-fit rounded-3xl text-xs'><IoIosCheckmarkCircle/><p>Published</p></div>
                                                )
                                            }
                                        </div>
                                    </Td>
                                    <Td className="w-[10%] flex items-center justify-center">
                                        {course?.totalDuration}
                                    </Td>
                                    <Td className="w-[10%] flex items-center justify-center">
                                        &#8377;{Intl.NumberFormat("en-US").format(course?.price)}
                                    </Td>
                                    <Td className="w-[10%] flex items-center justify-center text-xl gap-3">
                                        <button disabled={loading} onClick={(e) => {e.stopPropagation();navigate(`/dashboard/edit-course/${course._id}`)}} className=' hover:text-yellow-50 hover:scale-110 duration-200'><FiEdit2 /></button>
                                        <button disabled={loading} onClick={(e) => {e.stopPropagation();setConfirmationModal({
                                                                                        text1: "Do you want to Delete this Course?",
                                                                                        text2: "All data related to this course will be deleted",
                                                                                        btn1Text: "Delete",
                                                                                        btn2Text: "Cancel",
                                                                                        btn1Handler: !loading ? () => handleDeleteCourse(course._id) : () =>{},
                                                                                        btn2Handler: !loading ? () => setConfirmationModal(null) : () =>{}
                                                                                    })
                                        }} className=' hover:text-pink-100 hover:scale-110 duration-200'><AiOutlineDelete /></button>
                                    </Td>
                                </Tr>
                            )) 
                        }
                    </Tbody>
                </Table>
            </div>

        )
    }
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default InstructorCoursesTable