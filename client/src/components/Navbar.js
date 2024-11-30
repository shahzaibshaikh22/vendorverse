import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, setCredinttials } from '../redux/features/slices/authSlice';
// import { CiLogin } from "react-icons/ci"
// import { MdOutlineManageAccounts } from "react-icons/md";
// import { HiDotsHorizontal } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { BsHandbag } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { BsMoonStars } from "react-icons/bs";
import { setMode } from '../redux/features/slices/authSlice';
import { FaBars, FaTimes, FaUserAlt } from 'react-icons/fa';

import { Avatar } from 'flowbite-react';
import { Dropdown } from "flowbite-react";
import { HiLogout, HiSwitchHorizontal, HiViewGrid } from "react-icons/hi";

import { useLogoutMutation, useSwitchAdminRoleMutation, useSwitchUserRoleMutation } from '../redux/features/apiSlices/userApiSlice';





const Navbar = () => {
  // handle phone menu visibility state
  const [showphonemenu, setShowPhoneMenu] = useState(false)
  // const [phoneMenu, setPhoneMenu] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // fetch user image function

  // const userAvatar = useSelector((state)=>state.auth.userAvatar);
  const {user, mode, lenghts, wishLength} = useSelector((state) => state.auth);
  // let  actLength = parseInt(lenghts)
  // console.log(lenghts);
  

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
  <>
       <nav className={`w-full py-4  px-4 rounded-b-lg  mx-auto md:flex hidden transition-all duration-150 ease-in-out items-center justify-between ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightgray  text-gray-950'}   py-2 fixed top-0 left-0 right-0 z-[999]`}>
      <div className='flex items-center gap-10'>
        <Link to="/" className="text-2xl text-emerald-500">VendorVerse</Link>
        <div className='v-ul xl:flex hidden'>
        <ul className='flex items-center gap-8'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Categories</Link></li>
          <li><Link to="/">Blogs</Link></li>
          <li><Link to="/products">Products</Link></li>
            {user ? !user.isSeller && !user.isAdmin &&(
              <li> <Link to="/becomeseller">Become seller</Link></li>
            ):("")}
          <li><Link to="/">Contact</Link></li>
        </ul>
      </div>
      </div>  
     
      <form className={`w-full lg:block hidden drop-shadow-lg  xl:max-w-sm lg:max-w-xs  rounded-md`}>
        <div className='w-full relative'>
          <input className={`w-full py-1  h-9 ${mode === "dark" ? 'bg-darkbg placeholder:text-lightbg text-lightbg' : 'bg-lightbg text-darkbg placeholder:text-darkbg'} focus:outline-none focus:ring-1 focus:ring-emerald-500  rounded-md pl-10 font-thin  `} type="text" name="" id="" placeholder='Search' />
          <button type="submit" className='search-btn bg-emerald-400 px-4 w-12 flex items-center justify-center h-[80%] absolute top-[3px] right-[4px]'>
          <CiSearch className={`${mode === "dark" ? 'text-white' : 'text-gray-950'} text-3xl `} />
          </button>
          <CiSearch className={`${mode === "dark" ? 'text-white' : 'text-gray-950'} drop-shadow-xl absolute top-[7px] text-2xl left-2 text-md `} />
        </div>
      </form>
      <div>
        {user && user.isActive === "online" ?(
         <div className='flex items-center gap-4'>
          <ul className='flex items-center gap-4'>
          <li>
            <div className='flex -ml-4 items-center'>
              <button onClick={handleMode} className='flex items-center justify-center text-xl'>
              {mode === "dark" ? <BsMoonStars size={20}/> : <IoSunnyOutline size={25}/> }
              </button>
            </div>
          </li>
          <li>
            <div className='flex items-center relative'>
              <Link to="wishlist" className='flex items-center gap-3'><GoHeart size={25}/> </Link>
              <span className='absolute top-[-5px] right-0 text-darkbg bg-emerald-400 p-1 flex items-center justify-center rounded-full w-4 h-4 text-[13px]'>{wishLength ? wishLength : 0}</span>
            </div>
          </li>
        
          <li>
          <div className='flex items-center relative'>
             <Link to="cart" className='flex items-center gap-3'><BsHandbag size={25} /></Link>
             <span className='absolute top-[-5px] right-0 text-darkbg bg-emerald-400 p-1 flex items-center justify-center rounded-full w-4 h-4 text-[13px]'>{lenghts ? lenghts : 0}</span>
           </div>
          </li> 
          </ul>
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
      <Dropdown.Item icon={FaUserAlt}>
        <Link to="profile">My profile</Link>
      </Dropdown.Item>
       {user.role === "useradmin" ? (
        <Dropdown.Item icon={HiViewGrid}>
        <Link to="user/dashboard">Dashboard</Link>
      </Dropdown.Item>
       ): (
        <Dropdown.Item icon={HiViewGrid}>
        <Link to="/admin/dashboard">Dashboard</Link>
      </Dropdown.Item>
       )}
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
         </div>
        ) :
        <div className="navbar-center hidden lg:flex">
        <ul className="flex px-1 gap-4">
        
        <li>
            <div className='flex -ml-4 items-center'>
              <button onClick={handleMode} className='flex  items-center justify-center text-xl'>
              {mode === "dark" ? <BsMoonStars  size={20}/> : <IoSunnyOutline  size={25}/> }
              </button>
            </div>
          </li>
          <li>
            <div className='flex items-center relative'>
              <Link to="wishlist" className='flex items-center gap-3'><GoHeart size={25}/> </Link>
            </div>
          </li>
        
          <li>
            <div className='flex items-center relative'>
              <Link to="cart" className='flex items-center gap-3'><BsHandbag size={25} /></Link>
            </div>
          </li>          
          <li>
              <Link to="/login" className='text-white font-semibold bg-emerald-400 px-4 py-2 rounded-md'>Log In</Link>
          </li>
        </ul>
        </div>}
      </div>





      <div className={`phonemenubtn lg:hidden flex items-center justify-center`}>
        {showphonemenu ? (<FaTimes onClick={()=>setShowPhoneMenu(false)} className={`${mode === "dark" ? 'text-lightbg' : 'text-darkbg'}`}/>)
        : (
          <FaBars onClick={()=>setShowPhoneMenu(true)} className={`${mode === "dark" ? 'text-lightbg' : 'text-darkbg'}`}/>
        )}
      </div>
      </nav>

      {/* menus */}
      <div className={`v-ul mt-[75px] ${mode === "dark" ? 'bg-darkfg text-lightgray' : 'bg-lightfg  text-gray-950'} px-6 max-w-[1024px] mx-auto xl:hidden md:hidden hidden lg:flex items-center justify-center p-2`}>
        <ul className='flex items-center gap-8'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Categories</Link></li>
          <li><Link to="/">Blogs</Link></li>
          <li> <Link to="/becomeseller">Become seller</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>
      </div>
      {/* menus */}
  </>
  )
}

export default Navbar
