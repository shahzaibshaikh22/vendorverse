import React, {useEffect} from 'react'
import  ProductCard  from "./ProductCard"
import { useFetchAllProductsQuery } from '../redux/features/apiSlices/productApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/features/slices/producSlice'
import Loading from './Loading'
import { useParams } from 'react-router-dom'
import ProductCardList from './ProductCardList'
 
const CategoryList = () => {
  const {products} = useSelector((state)=>state.productauth)
  
  const {data,isLoading} = useFetchAllProductsQuery()
  const dispatch = useDispatch()
  const {c} = useParams()

  let categoryProducts;
  if(data){
    categoryProducts = data.filter((item)=> item.category === c)
  }
useEffect(()=>{
    dispatch(getProducts(categoryProducts))
},[dispatch])

  if(!products){
    return(
      <Loading/>
    )
  }


  return (
    <div className='w-full h-auto flex flex-col gap-2'>
         {products && products.map(product => (
              <ProductCardList key={product._id} product={product}/>
            ))}
         </div>
  )
}

export default CategoryList
