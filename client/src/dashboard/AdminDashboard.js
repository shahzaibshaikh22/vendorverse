import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import TopBar from '../adminlayout/components/TopBar'
import Dashboard from '../adminlayout/components/Dashboard'

const AdminDashboard = () => {

  const {user,mode} = useSelector((state)=> state.auth)
  const navigate = useNavigate()


// this function handle the dashboard routing
useEffect(()=>{
  if(!user){
    navigate("/login")
  }
},[navigate,user])
useEffect(()=>{
  if(user){
    if(user.role ==="superadmin"){
      navigate("/admin/dashboard")
    }else if(user.isSeller){
      navigate("/user/dashboard")
    }else if(user.role === "useradmin"){
      navigate("/user/dashboard")
    }
  }
},[user,navigate])
  return (
    <section className={`w-full h-auto px-6 ${mode === "dark" ? 'bg-darkbg text-white' : 'bg-lightbg text-darkbg'}`}>
      <TopBar/>
     <div className='w-full mt-4 flex h-full flex-col'>
      <Dashboard/>
      <Outlet/>
     </div>
    </section>
  )
}

export default AdminDashboard
