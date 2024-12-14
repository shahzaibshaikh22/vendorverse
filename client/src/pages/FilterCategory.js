import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import { getProducts } from '../redux/features/slices/producSlice.js'
import CategoryGrid from '../components/CaregoryGrid.js'
import FilterSidebar from '../components/FilterSidebar.js'
import CategoryList from '../components/CategoryList.js'




const FilterCategory = () => {
  const { data, isLoading } = useFetchAllProductsQuery()
  const { mode } = useSelector((state)=> state.auth)
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [view,setView] = useState(true)
  const {c} = useParams()
  const dispatch = useDispatch()
  let categoryProducts;
  if(data){
    categoryProducts = data.filter((item)=> item.category === c)
  }
    useEffect(()=>{
    if(categoryProducts){
    dispatch(getProducts(categoryProducts))
    }
  },[dispatch])



  
  if(isLoading){
    return (
      <Loading/>
    )
  }

  
  

    // filter products with brand
    const filteredProducts = categoryProducts.filter(product =>
      (selectedBrands.length === 0 && selectedLocations.length === 0  || selectedBrands.includes(product.storeName) || selectedLocations.includes(product.location))
    );

    // filter products with brand

    // clear filters function 

    const HighToLow = () => {
      dispatch(getProducts([...categoryProducts].sort((a, b) => b.price - a.price)))
    }
  
    const LowToHigh = () => {
      dispatch(getProducts([...categoryProducts].sort((a, b) => a.price - b.price)))
    }
    const alphabeticProducts = () => {
      dispatch(getProducts([...categoryProducts].sort((a, b) => a.name.localeCompare(b.name))))
    }
  
    const newestProducts = () => {
      dispatch(getProducts([...categoryProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
    }
    const oldestProducts = () => {
      dispatch(getProducts([...categoryProducts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))))
    }

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
    <section className={`w-full relative h-auto ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'} pt-20 px-4 `}>
      <div className={`w-full flex gap-6 xl:max-w-[1690px] lg:max-w-full rounded-md mx-auto`}>
       <FilterSidebar/>
        <div className={`w-full p-4 flex flex-col gap-4 rounded-md drop-shadow-md ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'}`}>
         <SortingBar 
         HighToLow={HighToLow}
         LowToHigh={LowToHigh}
         newestProducts={newestProducts}
         oldestProducts={oldestProducts}
         alphabeticProducts={alphabeticProducts}
         handleGridView={handleGridView}
         handleListView={handleListView}
         products={categoryProducts}
         />
         <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkbg' : 'bg-gray-200'} `}></div>
          {view ? (
            <CategoryGrid/>
          ) : (
            <CategoryList/>
          )}
        </div>
      </div>
    </section>
  )
}

export default FilterCategory
