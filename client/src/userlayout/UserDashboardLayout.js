import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../DashboardComponents/UserNavbar'

const UserDashboardLayout = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='w-full  h-screen transition-all duration-100 ease-in'>
      <div className='w-full flex h-full'>
        {/* <div className={`${open ? 'w-[280px]' : 'w-[80px]'} h-full overflow-x-hidden`}>
          <UserNavbar/>
        </div> */}
        <UserNavbar/>
        <div className='w-full h-full'>
        <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default UserDashboardLayout
