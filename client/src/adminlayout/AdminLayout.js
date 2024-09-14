import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TopBar from "../DashboardComponents/TopBar"
import SideBar from '../DashboardComponents/SideBar'

const AdminLayout = () => {
  return (
    <div>
     {/* <Navbar/> */}
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
