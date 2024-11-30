import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, setCredinttials,setMode } from '../../redux/features/slices/authSlice';
import { IoSunnyOutline } from "react-icons/io5";
import { BsMoonStars } from "react-icons/bs";
import { Avatar } from 'flowbite-react';
import { Dropdown } from "flowbite-react";
import { HiLogout, HiSwitchHorizontal } from "react-icons/hi";
import { useLogoutMutation, useSwitchAdminRoleMutation, useSwitchUserRoleMutation } from '../../redux/features/apiSlices/userApiSlice';


const TopBar = () => {
    const { mode,user } = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutuser] = useLogoutMutation()

    const handleLogout = async () => {
      dispatch(logoutUser());
      const {data}  = await  logoutuser()
      localStorage.removeItem('Length')
      navigate("/login")
    }
  
    const handleMode = () =>{
      dispatch(setMode());
    }
  
    const [roleSwitch] = useSwitchUserRoleMutation()
  
    
    // switch to user to seller and seller to user
    const handleSwitchRole = async()=>{
      const res = await roleSwitch()
      if(res.data.user){
        dispatch(setCredinttials(res.data.user))
      }
    }
  
    // switch to user to superadmin or superadmin to user
  const [adminRoleSwitch] = useSwitchAdminRoleMutation()
  
  const handleAdminSwitch = async()=>{
    const res = await adminRoleSwitch()
    if(res.data.user){
      dispatch(setCredinttials(res.data.user))
    }
  }
  return (
    <nav className={`w-full py-4  px-4 rounded-b-lg  mx-auto md:flex hidden transition-all duration-150 ease-in-out items-center justify-between ${mode === "dark" ? 'bg-darkfg text-lightgray' : 'bg-lightfg  text-gray-950'}   py-2 `}>
        <h3 className={`text-xl font-semibold ${mode==="dark" ? 'text-white' : 'text-black'}`}>Dashboard</h3>
        <div className='flex items-center gap-4'>
        <div className='flex  items-center gap-4'>
     {user && user.isAdmin&&(
        <div onClick={handleAdminSwitch} className='flex bg-emerald-400 text-white gap-2 cursor-pointer px-4 py-1 rounded-md items-center'>
          <HiSwitchHorizontal/>
          {user && user.role === "superadmin" ? "switch to user" : "switch to admin"}
        </div>
      )}
     </div>
        <div className='flex  items-center'>
              <button onClick={handleMode} className='flex items-center justify-center text-xl'>
              {mode === "dark" ? <BsMoonStars size={20}/> : <IoSunnyOutline size={25}/> }
              </button>
        </div>
        {user && (
              <Dropdown label="" inline renderTrigger={() => <span>
                {user && user.avatar !== "" ? (
                   <Avatar rounded bordered img={`http://localhost:5000/${user.avatar}`}/>
                ): (
                  <Avatar rounded bordered img="./images/profile.png"/>
                )}
              </span>}>
        <Dropdown.Header>
         {user &&(
          <>
             <span className="block text-sm">{user.username}</span>
             <span className="block truncate text-sm font-medium">{user.email}</span>
          </>
         )}
        </Dropdown.Header>
         {user && user.isSeller === true && user.isAdmin === false && (
           <Dropdown.Item icon={HiSwitchHorizontal}>
           <li onClick={handleSwitchRole}>{user.role === "useradmin" ? 'switch to seller' : 'switch to user'}</li>
         </Dropdown.Item>
         )}
           {user && user.isAdmin === true && user.isSeller === false && (
          <Dropdown.Item icon={HiSwitchHorizontal}>
          <li onClick={handleAdminSwitch}>{user.role === "useradmin" ? 'switch to admin' : 'switch to user'}</li>
        </Dropdown.Item>
         )}
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout} icon={HiLogout}>Sign out</Dropdown.Item>
            </Dropdown>
        )}
        </div>
    </nav>
  )
}

export default TopBar
