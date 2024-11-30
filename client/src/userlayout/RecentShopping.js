import React from 'react'
import { useSelector } from 'react-redux'
import SingleRecentShop from './SingleRecentShop'

const RecentShopping = () => {
    const { mode } = useSelector((state)=>state.auth)
  return (
    <div className='w-full flex flex-col gap-4'>
        <h6 className={`text-lg px-4 py-1 ${mode === "dark" ? 'text-lightgray' : 'text-darkufg'}`}>Recent Shopping</h6>
       <div className='w-full flex flex-col gap-4'>
       <SingleRecentShop/>
       </div>
    </div>
  )
}

export default RecentShopping
