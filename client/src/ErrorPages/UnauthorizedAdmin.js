import React from 'react'
import { useSelector } from 'react-redux'

const UnauthorizedAdmin = () => {
  const  mode = useSelector((state)=> state.auth.mode)
  return (
    <div className={`w-full h-screen flex items-center justify-center ${mode === "dark" ? 'bg-darkbg' : 'bg-lightfg'}`}>
      <div className='w-full h-full'>
        <img src="./images/404.png" className='w-full h-full object-contain' alt="" />
      </div>
    </div>
  )
}

export default UnauthorizedAdmin
