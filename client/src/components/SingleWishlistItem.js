import React from 'react'
import { useNavigate } from "react-router-dom"
import { GoTrash } from "react-icons/go";
import { useSelector } from 'react-redux';
import {  useGetSingleProductQuery, useAddProductToCartMutation, useDeleteWishistItemMutation } from '../redux/features/apiSlices/productApiSlice'

const SingleWishlistItem = ({item}) => {
  

    const { mode, user } = useSelector((state)=> state.auth)

    let userId;
    if(user){
        userId = user._id
    }
    const navigate = useNavigate()

    // fetch single product
    const { data, isLoading } = useGetSingleProductQuery(item.productId)
    let sellerId;
    if(data){
      sellerId = data.sellerId
      
    }

    // add product to cart

    const [addToCart] = useAddProductToCartMutation()
    const handleAddToCart = async (product) => {
      console.log(product);
      
        const { data } = await addToCart({ productId:product._id, sellerId:product.sellerId, userId })
        if (data.err) {
         alert(data.err)
        }
        navigate('/cart')
      }

        // delete cart item 
  const [deleteWishlistItem] = useDeleteWishistItemMutation()
  const handleDeleteItem = async (productId) => {
    const res  = await  deleteWishlistItem({ productId, userId})
  }


  return (
   <>
     <div className={`mb-2 w-full grid grid-cols-6 ${mode === "dark" ? 'text-white' : 'text-darkbg'}`}>
           <div className=' flex items-center justify-center'>
             <button onClick={()=>handleDeleteItem(item.productId)} className='flex items-center gap-2'>
             <GoTrash className='cursor-pointer text-2xl'/>
             <span className='text-md'>Delete</span>
             </button>
           </div>
           <div className='w-full flex items-center justify-center'> 
           <div className='w-16 h-16 flex items-center justify-center'>
             <img src="/images/shoes1.webp" className='w-full h-full object-cover' alt="" />
           </div>
           </div>
           <div className='w-full flex items-center justify-center'>
             <h3 className=''>{data && data.name}</h3>
           </div>
           <div className='w-full flex items-center justify-center'>
             <h3 className=''>{data && data.price}</h3>
           </div>
           <div className='w-full flex items-center justify-center'>
             <h3 className=''>In Stock</h3>
           </div>
           <div className='w-full flex items-center justify-center'>
           <div className='flex flex-col gap-1 items-center justify-center'>
            <span className='text-xs text-center'>{item.createdAt}</span>
           <button onClick={()=>handleAddToCart(data)} className='px-4 py-1 rounded-xl bg-emerald-500 '>Add to cart</button>
           </div>
           </div>
    </div>
    <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
   </>

  )
}

export default SingleWishlistItem
