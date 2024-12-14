import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CiBoxList } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { FaChevronDown } from 'react-icons/fa';


const SortingBar = ({ products, handleListView,HighToLow,LowToHigh,alphabeticProducts,oldestProducts,newestProducts, handleGridView }) => {
  const { mode } = useSelector((state) => state.auth)
  const [showDropdown, setShowDropdown] = useState(false)  



  return (
    <div className='flex w-full items-center gap-6  px-4 py-2'>
      <div className='w-full  flex flex-1 items-center justify-between'>
        <div>
          <span className={`${mode === "dark" ? 'bg-darkfg text-lightbg' : 'bg-lightfg text-darkfg'}`}>{products.length} items found</span>
        </div>

      </div>
      <div className='sort flex flex-1 items-center gap-2'>
        <span className='whitespace-nowrap'>Sort by</span>
        <div className='relative dropdown rounded-md transition-all duration-150 ease-in-out w-[15rem] px-2 h-[2.5rem] border-[1px] border-emerald-500'>
          <div className='absolute w-full h-full top-1/2 -translate-y-1/2 flex items-center justify-between'>
            <span>Select action</span>
            <span onClick={() => setShowDropdown(!showDropdown)} className='absolute right-4'><FaChevronDown /></span>
          </div>
          {showDropdown && (
            <div className={`w-full  flex rounded-md flex-col gap-2 options absolute z-10 left-0 -bottom-[230px] ${mode === "dark" ? 'bg-darkufg' : 'bg-lightfg'} drop-shadow-md`}>
              <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
              <span onClick={HighToLow} className={`px-2 cursor-pointer  py-1 text-sm ${mode === "dark" ? 'hover:bg-darkfg hover:text-white' : 'hover:bg-lightbg hover:text-darkbg'}`}>price high to low</span>
              <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
              <span onClick={LowToHigh}  className={`px-2 cursor-pointer  py-1 text-sm ${mode === "dark" ? 'hover:bg-darkfg hover:text-white' : 'hover:bg-lightbg hover:text-darkbg'}`}>price low to high </span>
              <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
              <span onClick={alphabeticProducts} className={`px-2 cursor-pointer  py-1 text-sm ${mode === "dark" ? 'hover:bg-darkfg hover:text-white' : 'hover:bg-lightbg hover:text-darkbg'}`}>sort by alphabetic</span>
              <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
              <span onClick={oldestProducts} className={`px-2 cursor-pointer  py-1 text-sm ${mode === "dark" ? 'hover:bg-darkfg hover:text-white' : 'hover:bg-lightbg hover:text-darkbg'}`}>oldest</span>
              <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
              <span onClick={newestProducts} className={`px-2 cursor-pointer  py-1 text-sm ${mode === "dark" ? 'hover:bg-darkfg hover:text-white' : 'hover:bg-lightbg hover:text-darkbg'}`}>newest</span>
              <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
            </div>
          )}
        </div>
      </div>
      <div className='sort flex flex-1 items-center justify-end gap-2'>
        <span className='text-md'>View:</span>
        <div className='flex items-center gap-2'>
          <CiBoxList onClick={handleListView} className={`w-8 h-8 p-1 rounded-md cursor-pointer ${mode === "dark" ? 'hover:bg-darkufg' : 'hover:bg-lightbg'}`} size={25} />
          <IoGrid onClick={handleGridView} className={`w-8 h-8 p-1 rounded-md cursor-pointer ${mode === "dark" ? 'hover:bg-darkufg' : 'hover:bg-lightbg'}`} size={25} />
        </div>
      </div>
    </div>
  )
}

export default SortingBar
