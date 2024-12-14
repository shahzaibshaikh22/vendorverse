import React, {useEffect} from 'react'
import  ProductCard  from "./ProductCard"
import { useFetchAllProductsQuery } from '../redux/features/apiSlices/productApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/features/slices/producSlice'
import ProductCardList from "./ProductCardList"


const ListProducts = () => {
  const {products} = useSelector((state)=>state.productauth)
  
  const {data,isLoading} = useFetchAllProductsQuery()
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getProducts(data))
  },[dispatch])
  return (
    <div className='w-full h-auto flex flex-col gap-2'>
    {data && products && products.map(product => (
         <ProductCardList key={product._id} product={product}/>
       ))}
    </div>
  )
}

export default ListProducts
