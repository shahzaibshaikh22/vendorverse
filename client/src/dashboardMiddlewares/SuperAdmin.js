import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SuperAdmin = () => {

//   const token = localStorage.getItem("token")
const user = useSelector((state) =>state.auth.user)

  return (
    user && user.user.role === "superadmin" ? <Outlet/> : <Navigate to="/unauthorize"/>
  )
}

export default SuperAdmin;
