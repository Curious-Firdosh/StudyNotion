import React, { useState } from 'react'
import { sidebarLinks} from  "../../../data/dashboard-links"
import { logOut } from '../../../Services/Operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLinks'
import { useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import ConfirmationModal from '../../Common/ConfirmationModal'

const SideBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user , loading : authLoading} = useSelector((state) => state.profile);
    const {loading : profileLoading} = useSelector((state) => state.auth);
    const [confirmationModal ,setConfirmationModal ] = useState(null )

   
  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <div>
         <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
            <div className='flex flex-col '>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user.accountType !== link.type) return null;
                        return (
                            <SideBarLink key = {link.id} link ={link} iconName={link.icon}  />
                        )
                        
                    })
                }
            </div>
            
            <div className=' h-[1px] bg-richblack-600 mx-auto mt-6 mb-4 w-10/12 '></div>

            <div className='flex flex-col  '>
                <SideBarLink 
                    link={{name: "Setting" , path :"/dashboard/settings"}}
                    iconName = "VscSettingsGear"
                />

                <button
                    onClick={ () => setConfirmationModal({
                        text1 : "Are You Sure ???",
                        text2 : "You Will Be LoggedOut",
                        btnText : "LogOut",
                        btn2Text :"Cancel",
                        btnHandler : () => dispatch(logOut(navigate)),
                        btnHandler2 : () => setConfirmationModal(null)
                    })}
                    className="px-8 py-2 text-sm font-medium text-richblack-300"
                >
                    <div className='flex items-center gap-x-2'> 
                        <span>LogOut</span>
                        <BiLogOut className='text-lg'/>
                    </div>
                </button>


            </div>
        </div>

        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>
  )
}

export default SideBar
