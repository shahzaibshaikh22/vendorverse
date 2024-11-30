import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className='w-full  h-screen transition-all duration-100 ease-in'>
      <div className='w-full flex h-full'>
        {/* <div className={`${open ? 'w-[280px]' : 'w-[80px]'} h-full overflow-x-hidden`}>
          <UserNavbar/>
        </div> */}
       <AdminSidebar/>
        <div className='w-full h-full'>
        <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
