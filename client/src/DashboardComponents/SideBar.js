import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='w-full bg-gray-300  h-screen'>
      <nav>
        <ul>
          <li><Link to="newproduct">New Product</Link></li>
          <li><Link to="/admin/users">Users list</Link></li>
          <li><Link to="/admin/dashboard">dashboard</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
