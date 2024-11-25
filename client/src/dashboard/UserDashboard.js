import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Route, Router, Routes, useNavigate, Link } from 'react-router-dom'
import TopBar from '../DashboardComponents/TopBar'
import NewProduct from '../DashboardComponents/NewProduct'
import UserNavbar from "../DashboardComponents/UserNavbar"
import { FaShoppingBag } from 'react-icons/fa'

const UserDashboard = () => {

  const {user, mode} = useSelector((state)=> state.auth)
  const navigate = useNavigate()
  console.log(user);
  


// this function handle the dashboard routing
useEffect(()=>{
  if(!user){
    navigate("/login")
  }
},[navigate,user])

  // useEffect(()=>{
  //     if(user){
  //       if(user.role !== ""){
  //         navigate('/user/dashboard')
  //     }
  //     }else{
  //       navigate("/login")
  //     }
  // },[user.role, user,navigate])
  return (
    <section className={`w-full h-screen pt-20 px-4 ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'}`}>
      <div className={`w-full h-full flex flex-col `}>
        <div className='grid grid-cols-4 w-full pt-6 items-center gap-4'>
          <div className={`${mode ==="dark" ? 'bg-darkbg text-lightbg' : 'bg-lightbg text-darkfg'} rounded-lg drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Total Expense</h5>
            <FaShoppingBag className='text-2xl'/>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>

          <div className={`${mode ==="dark" ? 'bg-transparent  border-lightgray text-lightbg' : 'bg-transparent text-darkfg border-lightgray'} rounded-lg border-[1px] drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Total Expense</h5>
            <FaShoppingBag className='text-2xl'/>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>
          <div className={`${mode ==="dark" ? 'bg-transparent  border-lightgray text-lightbg' : 'bg-transparent text-darkfg border-lightgray'} rounded-lg border-[1px] drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Total Expense</h5>
            <FaShoppingBag className='text-2xl'/>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>
          <div className={`${mode ==="dark" ? 'bg-transparent  border-lightgray text-lightbg' : 'bg-transparent text-darkfg border-lightgray'} rounded-lg border-[1px] drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Total Expense</h5>
            <FaShoppingBag className='text-2xl'/>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>
        </div>
      <Outlet />
      </div>
    </section>
  )
}

export default UserDashboard
