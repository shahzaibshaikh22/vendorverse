import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const Categories = ({categories}) => {
    const { mode } = useSelector((state) => state.auth)
  return (
    <section className={`${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'} w-full h-auto p-4`}>
        
        <div className={` rounded-md w-full xl:max-w-[1440px] lg:max-w-[1024px] mx-auto full h-auto p-2`}>
        <h1 className={`text-3xl mb-3 ${mode==="light"?'text-darkbg':'text-lightbg'}`}>Categories</h1>
        <div className='w-full h-auto grid grid-cols-8 gap-2'>
            {categories.map((c)=>{
                return(
                    <Link key={c} to={`filter/${c}`}>
                    <div className={`flex flex-col gap-2 items-center justify-center p-2 rounded-md ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'}`}>
                        <div className='w-24 h-24'>
                            <img src="./images/categories/welding.jpg" className='w-full h-full object-contain' alt="" />
                        </div>
                        <h3 className={`text-md ${mode==="light"?'text-darkbg':'text-lightbg'}`}>{c}</h3>
                    </div>
                    </Link>
                )
            })}
        </div>
        </div>
    </section>
  )
}

export default Categories
