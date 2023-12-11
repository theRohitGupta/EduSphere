import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../common/Spinner'
import SidebarLink from './SidebarLink'
import { logout } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

function Sidebar() {
    const { user, loading : profileLoading } = useSelector((state) => state.profile)
    const { loading : authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ confirmationModal, setConfirmationModal ] = useState(null);

    if( authLoading || profileLoading ) return (<Spinner/>)
  return (
    <div className=' relative'>
        <div className=' fixed left-0'>
            <div className=' flex min-w-[222px] h-screen flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
                <div className=' flex flex-col'>
                    {
                        sidebarLinks.map((link => {
                            if(link.type && user?.accountType !== link.type) return null
                            return (<SidebarLink link={link} key={link.id}/>)
                        }))
                    }
                </div>
                <div className=' mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>
                <div className=' flex flex-col'>
                    <SidebarLink link={{name:"Settings",path:"dashboard/settings", icon:"VscSettingsGear"}}/>
                    <div className={` relative cursor-pointer px-8 py-2 text-sm font-medium text-richblack-300`} onClick={() => { setConfirmationModal({
                                                                                                    text1: "Are You Sure?",
                                                                                                    text2: "You Will be Logged Out of Your Account",
                                                                                                    btn1Text : "Logout",
                                                                                                    btn2Text : "Cancel",
                                                                                                    btn1Handler : () => dispatch(logout(navigate)),
                                                                                                    btn2Handler : () => setConfirmationModal(null),
                                                                                                })}}>
                        <div className=' flex items-center gap-x-2'>
                            <VscSignOut className="text-lg"/>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar