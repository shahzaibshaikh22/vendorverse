import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SellerDashboard = () => {

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
      <div className='w-full h-full flex items-center justify-center'>
        <h1 className='text-5xl text-white'>Seller Dashboard</h1>
      </div>
    </section>
  )
}

export default SellerDashboard
