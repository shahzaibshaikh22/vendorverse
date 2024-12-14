import React, { useState, useEffect } from 'react'
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
import FilterSidebar from '../components/FilterSidebar.js'
import { useDispatch } from 'react-redux'
import { getProducts } from '../redux/features/slices/producSlice.js'



const AllProducts = () => {
  const { mode } = useSelector((state) => state.auth)
  const products = useSelector((state) => state.productauth.products)

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [view, setView] = useState(true)
  const { category } = useParams()
  const dispatch = useDispatch()

  const { data, isLoading } = useFetchAllProductsQuery()

  const HighToLow = () => {
    dispatch(getProducts([...data].sort((a, b) => b.price - a.price)))
  }

  const LowToHigh = () => {
    dispatch(getProducts([...data].sort((a, b) => a.price - b.price)))
  }
  const alphabeticProducts = () => {
    dispatch(getProducts([...data].sort((a, b) => a.name.localeCompare(b.name))))
  }

  const newestProducts = () => {
    dispatch(getProducts([...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
  }
  const oldestProducts = () => {
    dispatch(getProducts([...products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))))
  }


  if (isLoading) {
    return (
      <Loading />
    )
  }
  let filteredProducts;
  if (data) {
    filteredProducts = data.filter(product =>
      (selectedBrands.length === 0 && selectedLocations.length === 0 || selectedBrands.includes(product.storeName) || selectedLocations.includes(product.location))
    );
  }

  // clear filters function 






  const handleGridView = () => {
    setView(true)    
  }
  const handleListView = () => {
    setView(false)
  }


  return (
    <section className={`w-full relative h-auto ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'} pt-20 px-4 `}>
      <div className={`w-full flex gap-6 xl:max-w-[1690px] lg:max-w-full rounded-md mx-auto`}>
        <FilterSidebar data={data} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />
        <div className={`w-full p-4 flex flex-col gap-4 rounded-md drop-shadow-md ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'}`}>
          <SortingBar
            HighToLow={HighToLow}
            LowToHigh={LowToHigh}
            newestProducts={newestProducts}
            oldestProducts={oldestProducts}
            alphabeticProducts={alphabeticProducts}
            handleGridView={handleGridView}
            handleListView={handleListView}
            products={data} />
          <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkbg' : 'bg-gray-200'} `}></div>
          {view ? (
            <GridProducts/>
          ) : (
            <ListProducts />
          )}
        </div>
      </div>
    </section>
  )
}

export default AllProducts
