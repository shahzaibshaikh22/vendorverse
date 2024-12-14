import React, { useState } from "react";
import {FaChevronRight} from "react-icons/fa";
import { useSelector } from "react-redux";
import FilterWithBrand from "./FilterWithBrand";

const FilterSidebar = ({selectedBrands,setSelectedBrands,data}) => {
    const { mode } = useSelector(((state)=>state.auth))
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClearFilters = ()=>{
    setSelectedBrands([])
    // setSelectedLocations([])
  }
  return (
    <div className="flex h-screen realtive" > 
      {/* Sidebar */}
      <div className={`drop-shadow-md  sticky top-0 left-0 ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-red-200'} h-full ${
          isOpen ? "w-64" : "w-16"
        } transition-width duration-300 flex flex-col`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`${mode === "dark" ? 'bg-darkufg hover:bg-darkbg text-white' : 'bg-lightfg hover:bg-lightbg text-darkbg'} h-[80px] absolute -right-[24px] top-[40%]  m-2 `}
        >
         <FaChevronRight/>
        </button>

        {/* Menu Items */}
        <div className="flex flex-col px-2 mt-4 gap-6">
            <div className='flex items-center justify-between'>
          <h1 className={`text-xl `}>Filters</h1>
          <button className='bg-emerald-500 text-white rounded-md px-2 py-1' onClick={handleClearFilters}>Clear Filters</button>
            </div>
            <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          {data && (<FilterWithBrand data={data} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/> )}
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;


{/* <div className={`cat-sidebar sticky top-20 p-4 flex flex-col gap-2 w-1/4 h-[120vh] rounded-md drop-shadow-md ${mode === "dark" ? 'bg-darkfg text-lightbg' : 'bg-lightfg text-darkfg'}`}>
        
         
          <FilterWithPrice/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithLocation  selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations}/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithWarenty/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithRating/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>


        </div> */}