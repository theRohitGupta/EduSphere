import React, { useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri"
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useSelector } from 'react-redux';
import { deleteProfile } from '../../../../services/operations/settingsApi';

function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const [ confirmationModal, setConfirmationModal ] = useState(null);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <div className=' flex gap-5 w-full justify-around items-start border-[1px] border-pink-700 mt-14 px-8 py-6 rounded-lg bg-pink-900'>
          <div className=' w-[10%] p-3 rounded-full aspect-square grid place-content-center bg-pink-700'><RiDeleteBinLine className=' w-9 h-9 text-pink-200'/></div>
          <div className=' w-[80%] flex gap-2 flex-col text-pink-5'>
              <p className='font-semibold text-xl'>Delete Account</p>
              <p className='font-normal text-base opacity-50'>Would you like to delete account?<br/>This account may contain Paid Courses. Deleting your account is permanent and will remove all the content associated with it.</p>
              <p className='font-semibold italic text-sm text-pink-300 cursor-pointer hover:underline' onClick={() => { setConfirmationModal({
                                                                                                text1: "Are You Sure?",
                                                                                                text2: "You want to Delete Your Account. This account may contain Paid Courses. Deleting your account is permanent and will remove all the content associated with it.",
                                                                                                btn1Text : "Delete Account",
                                                                                                btn2Text : "Cancel",
                                                                                                btn1Handler : async () => {await deleteProfile(token); refreshPage()},
                                                                                                btn2Handler : () => setConfirmationModal(null),
                                                                                            })}}>
                I want to delete my account.</p>
          </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default DeleteAccount