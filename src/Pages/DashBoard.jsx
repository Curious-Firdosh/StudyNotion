import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Core/Dashboard/SideBar'

const DashBoard = () => {

  const {loading : authLoading} = useSelector((state) => state.auth) 
  const {loading : profileLoading} = useSelector((state) => state.profile)

  if(authLoading || profileLoading) {
     return (
       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
             <div className='spinner'></div>
       </div>
     )
  }
  
  return (
   <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <SideBar /> 
   <div className="h-[calc(100vh-3.5rem)] w-full overflow-auto">
     <div className="mx-auto w-11/12 max-w-[1000px] py-10">
       <Outlet />
     </div>
   </div>
 </div>
  )
}

export default DashBoard

