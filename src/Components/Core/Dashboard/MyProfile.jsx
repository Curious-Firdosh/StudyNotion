import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../Common/IconButton';
import { VscEdit } from 'react-icons/vsc';
import { RiEditBoxLine } from 'react-icons/ri';

const MyProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user , loading : profileLoading} = useSelector((state) => state.profile)
                            



  return (
      <>
           <h1 className="mb-14 text-3xl font-medium text-richblack-5">My profile</h1>
          
          {/* Section1 */}
          <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
              <div className="flex items-center gap-x-4">
                  <img
                      src= {user?.Image}
                      alt= {`profile ${user?.firstName}`}
                      className="aspect-square w-[78px] rounded-full object-cover"
                  />
                  <div className="space-y-1">
                      <p className="text-lg font-semibold text-richblack-5">{user?.firstName  + " " + user?.lastName}</p>
                      <p className="text-sm text-richblack-300">{user?.email}</p>
                  </div>
                  
                  <div className='flex items-center gap-1 p-1 '>
                      <IconButton 
                        text= "Edit"
                        onclick={ () => {
                            navigate("/dashboard/settings")
                        }}
                      >
                          <RiEditBoxLine/>
                      </IconButton>
                  </div>
              </div>
          </div>

          {/* Section-2 */}

          <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div  className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">About</p>
                      <IconButton
                          text={"Edit"}
                          onclick={() => {
                            navigate("/dashboard/settings")
                          }}
                      >
                        <RiEditBoxLine/>
                      </IconButton>
                </div>
                
                <p
                  className={`${
                          user?.additionalDetails?.about
                            ? "text-richblack-5"
                            : "text-richblack-400"
                        } text-sm font-medium`}
                > 
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"} 
                </p>
          </div>

            {/* Section-3 */}

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <div className="flex w-full items-center justify-between">   
                    
                    <p className="text-lg font-semibold text-richblack-5">
                      Personal Details
                    </p>
                          <IconButton
                              text={"Edit"}
                              onclick={() => {
                                navigate("/dashboard/settings")
                              }}
                          >
                              <RiEditBoxLine />
                          </IconButton>
                  </div>
                  
                  <div className="flex max-w-[500px] justify-between">
                        <div className="flex flex-col gap-y-5">
                           <p>
                              <span className="mb-2 text-sm text-richblack-600">
                                  First Name
                                </span>

                                  <br></br>
                              
                              <span className="text-sm font-medium text-richblack-5"> 
                              {user?.firstName ?? "Add First Name Of User"}
                              </span>
                           </p>   

                           <p>
                              <span className='mb-2 text-sm text-richblack-600 "' >Email</span> <br></br>
                              <span className="text-sm font-medium text-richblack-5">{user?.email ?? "Add Your Email"}</span>
                           </p>   
                              
                           <p>
                              <span className="mb-2 text-sm text-richblack-600">Gender</span> <br></br>
                              <span className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender Of User"}</span>
                           </p>   
                      </div>

                      <div className="flex flex-col gap-y-5">
                           <p>
                              <span  className="mb-2 text-sm text-richblack-600"> Last Name</span> <br></br>
                              <span className="text-sm font-medium text-richblack-5">{user?.lastName ?? "Add Last Name Of User"}</span>
                           </p>   

                           <p>
                              <span  className="mb-2 text-sm text-richblack-600">Phone Number</span> <br></br>
                              <span className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</span>
                           </p>   

                           <p>
                              <span  className="mb-2 text-sm text-richblack-600">Date Of Birth</span> <br></br>
                              <span className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}</span>
                           </p>   
                      </div>
                  </div>



            </div>
      </>
         
    
  )
}

export default MyProfile
