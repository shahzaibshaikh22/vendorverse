import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../DashboardComponents/SideBar'

const AdminDashboard = () => {

  const user = useSelector((state)=> state.auth.user)
  const navigate = useNavigate()


// this function handle the dashboard routing
  useEffect(()=>{
    if(user.role !== ""){
      navigate('/dashboard')
    }
  },[user.role])
  return (
    <section className={`w-full h-screen  bg-red-500 pt-20`}>
      <div className='w-full h-full flex'>
     <div className='w-[300px]'>
     <SideBar/>
     </div>
     <div className='w-full'>
      <Outlet/>
     </div>
      </div>
    </section>
  )
}

export default AdminDashboard
