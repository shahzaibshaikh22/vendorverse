import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className='bg-gray-300'>
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

export default TopBar
