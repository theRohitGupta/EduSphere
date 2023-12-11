import React from 'react'
import ChangeDp from './Settings/ChangeDp'
import ProfileInformation from './Settings/ProfileInformation'
import PasswordUpdate from './Settings/PasswordUpdate'
import DeleteAccount from './Settings/DeleteAccount'

function Settings() {
  return (
    <div>
      <p className=' text-richblack-300 text-sm left-6 font-normal'>Home / Dashboard / <span className=' text-yellow-50'>Settings</span></p>
      <h1 className=' text-3xl font-normal py-3 text-richblack-5'>Edit Profile</h1>
      <div className=' flex items-center justify-center flex-col gap-4 w-[75%] mx-auto pb-14'>
        {/* CHANGE DP */}
        <ChangeDp/>

        {/* PROFILE INFORMATION */}
        <ProfileInformation/>

        {/* CHANGE PASSWORD */}
        <PasswordUpdate/>

        {/* DELETE ACCOUNT */}
        <DeleteAccount/>
      </div>
    </div>
  )
}

export default Settings