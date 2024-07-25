import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserAdmin = () => {

//   const token = localStorage.getItem("token")
const user = useSelector((state) =>state.auth.user)

  return (
    <>
     { user ? <Outlet/> : <Navigate to="/unauthorize"/>}
    </>
  )
}

export default UserAdmin;
