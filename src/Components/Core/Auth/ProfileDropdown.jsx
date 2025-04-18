import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logOut } from '../../../Services/Operations/authApi';
import { Link } from 'react-router-dom';



const ProfileDropdown = () => {

  const [open , setOpen] = useState(false)
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null


  return (
     <button className="relative" onClick = {() => setOpen(true)}>
          <div className="flex items-center gap-x-1">
              <img
                src={user?.Image}
                alt= {`profile-${user?.firstName}`}
                className="aspect-square w-[30px] rounded-full object-cover"
              />
              <AiOutlineCaretDown className="text-sm text-richblack-100" />
          </div>
          {
            open && (
                <div 
                  className="absolute top-[118%] right-0 z-1000 divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                  >
                      <Link 
                          to="/dashboard/my-profile"
                          onClick = { () => setOpen(false) } 
                      >
                            <div className= "flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                <VscDashboard className="text-lg" />
                                  DashBoard
                            </div>
                      </Link>

                      <div
                          onClick={() => {
                            dispatch(logOut(navigate))
                            setOpen(false)
                          }}
                          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] cursor-pointer text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                      >
                          <VscSignOut className="text-lg" />
                          Logout
                      </div>

                </div>
             

            )
                
          }
     </button>
  )
}

export default ProfileDropdown

