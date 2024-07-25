import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

const CartProtected = () => {
  const user = useSelector((state) => state.auth.user)

  // const token = localStorage.getItem("token")
  return (
    user ? <Outlet/> : <Navigate to="/emptycart"/>
  )
}

export default CartProtected

