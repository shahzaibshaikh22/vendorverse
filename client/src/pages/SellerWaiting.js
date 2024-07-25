import React from 'react'
import { useSelector } from 'react-redux'
import SellerSteps from '../components/SellerSteps'

const SellerWaiting = () => {
  const {mode} = useSelector((state) => state.auth)
  return (
    <section className={`${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'} w-full  flex items-center justify-center h-auto pt-20`}>
      
      <div className={`w-full xl:max-w-[1440px] p-4 rounded-md mx-auto h-full flex flex-col items-center ${mode === "dark" ? 'bg-darkfg text-lightbg' : 'bg-lightfg text-darkbg'}`}>
      <div className='v-waiting-header w-full flex items-center flex-col gap-2'>
          <h1 className='text-2xl'>Hang Tight</h1>
          <h1 className='text-emerald-400 text-6xl'>You're now in a virtual queue</h1>
          <p className='text-xl'>Your request has been recieved we will notified you shortly be patience</p>
        </div>     
        <div className='w-[500px] my-10'>
          <img className='w-full' src="./images/waiting.svg" alt="" />
        </div>
        <div className='w-full flex flex-col items-center gap-4 mt-6'>
          <SellerSteps/>
        </div>
       
      </div>
    </section>
  )
}

export default SellerWaiting
