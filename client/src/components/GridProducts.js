import React, {useEffect} from 'react'
import  ProductCard  from "./ProductCard"
// import { useParams } from 'react-router-dom'
 
const GridProducts = ({filteredProducts}) => {


  // const {category} = useParams()

  // const products = filteredProducts.filter((item)=> item.category === category)
  return (
    <div className='w-full h-auto grid grid-cols-4'>
         {filteredProducts.map(product => (
              <ProductCard key={product.name} product={product}/>
            ))}
         </div>
  )
}

export default GridProducts
