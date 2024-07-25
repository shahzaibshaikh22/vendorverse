import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const FilterWithBrand = () => {
    const { mode } = useSelector((state) => state.auth)
    return (
        <section className='w-full h-auto flex flex-col gap-3'>
            <h3 className='text-xl'>Price</h3>
            <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
            <div className='flex w-full gap-2 items-center'>
                <input className={`w-full hover:ring-emerald-400 h-9 rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 ${mode === "dark" ? 'bg-darkufg   text-white placeholder:text-white' : 'bg-gray-100  text-darkbg placeholder:text-darkbg'}`} type="number" placeholder='Min' name='min' />
                <input className={`w-full hover:ring-emerald-400 h-9 rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 ${mode === "dark" ? 'bg-darkufg   text-white placeholder:text-white' : 'bg-gray-100  text-darkbg placeholder:text-darkbg'}`} type="number" placeholder='Max' name='max' />
                <button className='w-full h-9 rounded-sm bg-emerald-400'>Apply</button>
            </div>
        </section>
    )
}

export default FilterWithBrand
