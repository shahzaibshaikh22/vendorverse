import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Emptycart = () => {
  const mode = useSelector((state)=> state.auth.mode);

  return (
    <section className={`w-full h-screen transition-all duration-150 ease-in-out flex  p-6 pt-20 ${mode === "dark" ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className='w-full max-w-2xl flex flex-col items-center p-4 mx-auto'>
      <div className='w-96 h-96 flex items-center justify-center'>
         <img src="./images/emptycart.svg" className='w-full h-full object-contain' alt="" />
      </div>
      <div className={`w-full p-4 flex flex-col gap-3 ${mode === "dark" ? 'text-white' : 'text-gray-950'}`}>
      <h1 className='text-center pl-4 text-md'>Missing Cart Items ?</h1>
      <h3 className='text-center'>Login to see the items you added previously</h3>
      <Link to="/login" className='bg-emerald-400 text-gray-800 mt-1 p-4 rounded-md font-semibold w-full max-w-[200px] text-center mx-auto'><button>Log In</button></Link>
      </div>
      </div>
    </section>
  )
}

export default Emptycart
