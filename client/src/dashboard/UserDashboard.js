import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Route, Router, Routes, useNavigate, Link } from 'react-router-dom'
import TopBar from '../DashboardComponents/TopBar'
import NewProduct from '../DashboardComponents/NewProduct'
import UserNavbar from "../DashboardComponents/UserNavbar"
import { FaCrosshairs, FaShoppingBag, FaShoppingCart } from 'react-icons/fa'
import ShoppingAnalytics from '../userlayout/ShoppingAnalytics'
import UserDonutChart from '../userlayout/UserDonutChart'
import RecentShopping from '../userlayout/RecentShopping'

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
    <section className={`w-full h-auto pt-20 px-6 ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'}`}>
      <div className={`w-full h-full flex flex-col `}>
        <div className='grid grid-cols-4 w-full pt-4 items-center gap-4'>
          <div className={`${mode ==="dark" ? 'bg-darkbg text-lightbg' : 'bg-lightbg text-darkfg'} rounded-lg drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Total Shopping</h5>
            <div className={`${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightgray text-darkufg'} w-10 h-10 flex items-center justify-center drop-shadow-md rounded-lg`}>
            <FaShoppingBag className='text-2xl'/>
            </div>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>

          <div className={`${mode ==="dark" ? 'bg-transparent  border-lightgray text-lightbg' : 'bg-transparent text-darkfg border-lightgray'} rounded-lg border-[1px] drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Cenceled Orders</h5>
            <div className={`${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightgray text-darkufg'} w-10 h-10 flex items-center justify-center drop-shadow-md rounded-lg`}>
            <FaShoppingBag className='text-2xl'/>
            </div>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>
          <div className={`${mode ==="dark" ? 'bg-transparent  border-lightgray text-lightbg' : 'bg-transparent text-darkfg border-lightgray'} rounded-lg border-[1px] drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Returns & Refunds</h5>
            <div className={`${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightgray text-darkufg'} w-10 h-10 flex items-center justify-center drop-shadow-md rounded-lg`}>
            <FaCrosshairs className='text-2xl'/>
            </div>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>
          <div className={`${mode ==="dark" ? 'bg-transparent  border-lightgray text-lightbg' : 'bg-transparent text-darkfg border-lightgray'} rounded-lg border-[1px] drop-shadow-md w-full flex flex-col gap-6 justify-between px-4 py-6 `}>
            <div className='flex items-center justify-between'>
            <h5 className='text-xl'>Cart Items</h5>
            <div className={`${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightgray text-darkufg'} w-10 h-10 flex items-center justify-center drop-shadow-md rounded-lg`}>
            <FaShoppingCart className='text-2xl'/>
            </div>
            </div>
            <div className='flex flex-col gap-1'>
              <h6>21,500</h6>
            </div>
          </div>
        </div>
        <div className='w-full gap-4 flex items-center justify-between'>
        <ShoppingAnalytics/>
        <UserDonutChart/>
        </div>
        <div className='mt-4'>
         <RecentShopping/>
        </div>
      <Outlet />
      </div>
    </section>
  )
}

export default UserDashboard
