import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../DashboardComponents/UserNavbar'

const UserDashboardLayout = () => {
  return (
    <div className='w-full  h-screen transition-all duration-100 ease-in'>
      <div className='w-full flex relative h-screen'>
        <UserNavbar/>
        <div className='w-full h-full'>
        <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default UserDashboardLayout
