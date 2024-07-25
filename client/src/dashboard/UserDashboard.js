import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Route, Router, Routes, useNavigate, Link } from 'react-router-dom'
import TopBar from '../DashboardComponents/TopBar'
import NewProduct from '../DashboardComponents/NewProduct'

const UserDashboard = () => {

  const user = useSelector((state)=> state.auth.user)
  const navigate = useNavigate()


// this function handle the dashboard routing
  useEffect(()=>{
    if(user.role !== ""){
      navigate('/dashboard')
    }
  },[user.role])
  return (
    <section className='w-full h-screen'>
      <div className='w-full h-full flex flex-col items-center justify-center'>
      <TopBar/>
      <Outlet />
      </div>
    </section>
  )
}

export default UserDashboard
