import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import FilterWithBrand from '../components/FilterWithBrand'
import Loading from '../components/Loading'
import FilterWithPrice from '../components/FilterWithPrice'
import FilterWithLocation from '../components/FilterWithLocation'
import FilterWithWarenty from '../components/FilterWithWarenty'
import FilterWithRating from '../components/FilterWithRating'
import SortingBar from '../components/SortingBar'
import GridProducts from '../components/GridProducts.js'
import ListProducts from '../components/ListProducts.js'
import { useParams } from 'react-router-dom'
import { useFetchAllProductsQuery } from '../redux/features/apiSlices/productApiSlice.js';


const AllProducts = () => {
  const { mode } = useSelector((state)=> state.auth)
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [view,setView] = useState(true)
  const {category} = useParams()

  const { data, isLoading } = useFetchAllProductsQuery()
  if(isLoading){
    return (
      <Loading/>
    )
  }
  let filteredProducts;
  if(data){
     filteredProducts = data.filter(product =>
        (selectedBrands.length === 0 && selectedLocations.length === 0  || selectedBrands.includes(product.brand) || selectedLocations.includes(product.location))
      );
  }

    // clear filters function 

    const handleClearFilters = ()=>{
      setSelectedBrands([])
      setSelectedLocations([])
    }


  const handleGridView = () =>{
    setView(true)
  }
  const handleListView = () =>{
    setView(false)
  }
  return (
    <section className={`w-full relative h-auto ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'} pt-20 lg:px-10 `}>
      <div className={`w-full flex gap-2 xl:max-w-[1440px] lg:max-w-full rounded-md mx-auto`}>
        <div className={`cat-sidebar sticky top-20 p-4 flex flex-col gap-2 w-1/4 h-[120vh] rounded-md drop-shadow-md ${mode === "dark" ? 'bg-darkfg text-lightbg' : 'bg-lightfg text-darkfg'}`}>
          <div className='flex items-center justify-between'>
          <h1 className={`text-xl `}>Filters</h1>
          <button className='bg-emerald-500 text-white rounded-md px-2 py-1' onClick={handleClearFilters}>Clear Filters</button>
          </div>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithBrand selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/> 
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithPrice/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithLocation  selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations}/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithWarenty/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
          <FilterWithRating/>
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>


        </div>
        <div className={`w-full p-4 flex flex-col gap-4 rounded-md drop-shadow-md ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'}`}>
         <SortingBar handleGridView={handleGridView} handleListView={handleListView} filteredProducts={filteredProducts}/>
         <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkbg' : 'bg-gray-200'} `}></div>
          {view ? (
            <GridProducts filteredProducts={filteredProducts}/>
          ) : (
            <ListProducts filteredProducts={filteredProducts}/>
          )}
        </div>
      </div>
    </section>
  )
}

export default AllProducts
