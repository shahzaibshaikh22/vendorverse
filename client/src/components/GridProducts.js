import React, {useEffect} from 'react'
import  ProductCard  from "./ProductCard"
import { useFetchAllProductsQuery } from '../redux/features/apiSlices/productApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/features/slices/producSlice'
import Loading from './Loading'
// import { useParams } from 'react-router-dom'
 
const GridProducts = () => {
  const {products} = useSelector((state)=>state.productauth)
  
  const {data,isLoading} = useFetchAllProductsQuery()
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getProducts(data))
  },[dispatch])
  return (
    <div className='w-full h-auto grid grid-cols-4'>
         {data && products && products.map(product => (
              <ProductCard key={product._id} product={product}/>
            ))}
         </div>
  )
}

export default GridProducts
