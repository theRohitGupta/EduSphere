import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { FiEdit } from "react-icons/fi"
import { formattedDate } from '../../../utils/dateFormatter';

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
      const details = [
        {
          name : "First Name",
          value : user.firstName
        },
        {
          name : "Last Name",
          value : user.lastName ? user.lastName : "Add Last Name"
        },
        {
          name : "Email",
          value : user?.email
        },
        {
          name : "Contact Number",
          value : user.additionalDetails.contactNumber ? user.additionalDetails.contactNumber : <p className='text-pink-600'>Add Contact Number</p>
        },
        {
          name : "Date Of Birth",
          value : user.additionalDetails.dateOfBirth ? formattedDate(user.additionalDetails.dateOfBirth) : <p className='text-pink-600'>Add Date Of Birth</p>
        },
        {
          name : "Gender",
          value : user.additionalDetails.gender ? user.additionalDetails.gender : <p className='text-pink-600'>Add Gender</p> 
        },
      ]
  return (
    <div className='pb-9'>
      <p className=' text-richblack-300 text-sm left-6 font-normal'>Home / Dashboard / <span className=' text-yellow-50'>My Profile</span></p>
      <h1 className=' text-3xl font-normal py-3 text-richblack-5'>My Profile</h1>
      <div className=' flex items-center justify-center flex-col gap-5 w-[75%] mx-auto'>
      {/* SECTION 1 */}
        <div className=' flex gap-6 w-full justify-around items-center border-[1px] border-richblack-700 p-8 rounded-lg bg-richblack-800'>
          <img src={user?.image} alt={`profile-${user.firstName}`} className=' aspect-square rounded-full object-cover h-20'/>
          <div className=' w-[80%]'>
            <p className='font-semibold text-xl text-richblack-5'>{user.firstName + " " + user.lastName}</p>
            <p className=' text-richblack-300 text-sm'>{user.email}</p>
          </div>
          <IconBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")}><FiEdit/></IconBtn>
        </div>
        {/* SECTION 2 */}
        <div className=' flex flex-col gap-3 w-full border-[1px] border-richblack-700 p-8 rounded-lg bg-richblack-800'>
          <div className=' flex justify-between items-start'>
            <p className=' font-semibold text-xl text-richblack-5'>About</p>
            <IconBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")}><FiEdit/></IconBtn>
          </div>
          <p className=' text-richblack-300 text-base'>{user?.additionalDetails?.about ? user.additionalDetails.about : "Tell us something about yourself 😎😎"}</p>
        </div>
        {/* SECTION 3 */}
        <div className=' flex gap-6 w-full flex-col border-[1px] border-richblack-700 p-8 rounded-lg bg-richblack-800'>
        <div className=' flex justify-between items-start'>
            <p className=' font-semibold text-xl text-richblack-5'>Personal Details</p>
            <IconBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")}><FiEdit/></IconBtn>
          </div>
          <div className=' grid grid-cols-2 place-content-between gap-4'>
            {
              details.map((element,index) => (
                <div key={index} className=' flex flex-col gap-1'>
                  <p className=' text-xs text-richblack-600'>{element.name}</p>
                  <div className='text-richblack-5'>{element.value}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile