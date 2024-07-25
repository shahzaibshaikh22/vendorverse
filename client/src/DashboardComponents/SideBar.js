import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='w-full bg-darkfg rounded-sm h-screen'>
      <nav>
        <ul>
          <li><Link to="newproduct">New Product</Link></li>
          <li><Link to="userslist">Users list</Link></li>
          <li><Link to="/dashboard">dashboard</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
