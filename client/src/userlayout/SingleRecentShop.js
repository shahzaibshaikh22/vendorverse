import React from 'react'
import { useSelector } from 'react-redux'

const SingleRecentShop = () => {
    const { mode } = useSelector((state)=>state.auth)
  return (
    <div className={`w-full xl:max-w-[1440px] drop-shadow-md mx-auto flex flex-col rounded-md p-4 gap-2 ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'}`}>
    <div className='mb-2 w-full grid grid-cols-6'>
           <span className=' flex items-center justify-center text-gray-400'>Product</span>
           <span className=' flex items-center justify-center text-gray-400'>Name</span>
           <span className=' flex items-center justify-center text-gray-400'>Amount</span>
           <span className=' flex items-center justify-center text-gray-400'>Quantity</span>
           <span className=' flex items-center justify-center text-gray-400'>Date</span>
           <span className=' flex items-center justify-center text-gray-400'></span>
    </div>
    <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
    <div className={`mb-2 w-full grid grid-cols-6 ${mode === "dark" ? 'text-white' : 'text-darkbg'}`}>
        <div className='w-full flex items-center justify-center'> 
        <div className='w-16 h-16 flex items-center justify-center'>
          <img src="/images/shoes1.webp" className='w-full h-full object-cover' alt="" />
        </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          <h3 className=''>blaw blaw</h3>
        </div>
        <div className='w-full flex items-center justify-center'>
          <h3 className=''>$1025</h3>
        </div>
        <div className='w-full flex items-center justify-center'>
          <h3 className=''>1</h3>
        </div>
        <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col gap-1 items-center justify-center'>
         <span className='text-xs text-center'>10/2/24</span>
        </div>
        </div>
 </div>
    </div>
  )
}

export default SingleRecentShop
