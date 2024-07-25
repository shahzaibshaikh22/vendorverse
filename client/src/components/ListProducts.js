import React from 'react'
import ProductCardList from './ProductCardList'
// import { useParams } from 'react-router-dom'


const ListProducts = ({filteredProducts}) => {
  // const {category} = useParams()

  // const products = filteredProducts.filter((item)=> item.category === category)
  return (
    <div className='w-full h-auto flex flex-col gap-2'>
    {filteredProducts.map(product => (
         <ProductCardList key={product.name} product={product}/>
       ))}
    </div>
  )
}

export default ListProducts
