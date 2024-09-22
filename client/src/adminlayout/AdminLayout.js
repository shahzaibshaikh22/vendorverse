import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from "../DashboardComponents/TopBar"
import SideBar from '../DashboardComponents/SideBar'

const AdminLayout = () => {
  return (
    <div>
     <TopBar/>
     <div className='flex'>
     <div className='w-[300px]'>
     <SideBar/>
     </div>
      <Outlet/>
     </div>
    </div>
  )
}

export default AdminLayout
