import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaStar, FaShoppingCart, FaHeart, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { useParams } from 'react-router-dom'
import { useGetSingleProductQuery } from '../redux/features/apiSlices/productApiSlice.js'
import Loading from "../components/Loading"

const SingleProduct = () => {
  const {mode} = useSelector((state) => state.auth)

  const [isColor, setIsColor] = useState(false)
  const [isSize, setIsSize] = useState(false)
  const [quan, setQuan] = useState(1)
  
  const  {_id}  = useParams()

  const {data, isLoading} = useGetSingleProductQuery(_id)
  // console.log(data);

  // increase quantity
  const handleIncrease = () => {
    setQuan(quan + 1)
  }

  // decrease quantity
  const handleDecrease = ()=>{
    setQuan(quan - 1)
    if(quan <= 1 ){
      setQuan(1)
    }
  }
  
  if(isLoading){
    return (
      <Loading/>
    )
  }

  // let product = products[0]
  // const [mainImage, setMainImage] = useState(product.images[0].url);

  return (
    <section className={`${mode === "dark" ? 'bg-darkbg text-white' : 'bg-lightbg text-darkbg'} pt-20 w-full mx-auto lg:h-screen h-auto flex flex-col  `}>
      <div className={`w-full rounded-md p-4 h-full flex gap-10 xl:max-w-[1440px] mx-auto ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'} md:flex-row flex-col `}>
        <div className={`md:w-1/2  gap-4`}>
         <div className={`w-full h-[80%] rounded-md`}>
         <img
            // src={data.images[0]}
            src="/images/shoes1.webp"
            alt={data.name}
            className="w-full h-full object-contain"
          />
         </div> 
           <div className="flex mt-4 itmes-center justify-center space-x-6">
             <div className={`w-24 h-24 drop-shadow-md ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
             <img
                src="/images/shoes1.webp"
                alt="sadasd"
                className="w-24 h-24 object-cover cursor-pointer  rounded-md"
              />
             </div>
             <div className={`w-24 h-24 drop-shadow-md ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
             <img
                src="/images/shoes1.webp"
                alt="sadasd"
                className="w-24 h-24 object-cover cursor-pointer  rounded-md"
              />
             </div>
             <div className={`w-24 h-24 drop-shadow-md ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
             <img
                src="/images/shoes1.webp"
                alt="sadasd"
                className="w-24 h-24 object-cover cursor-pointer  rounded-md"
              />
             </div>
             <div className={`w-24 h-24 drop-shadow-md ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
             <img
                src="/images/shoes1.webp"
                alt="sadasd"
                className="w-24 h-24 object-cover cursor-pointer  rounded-md"
              />
             </div>
          </div>
        </div>
        <div className="md:w-1/2 p-6">
         <div>
         <h1 className="text-3xl font-bold">{data && data.name}</h1>
          <h4 className={`text-md font-semibold mb-2 ${mode === "dark" ? 'text-gray-300' : 'text-gray-600'}`}>{data && data.category} {data && data.subCategory}</h4>
         </div>
         <div className="flex items-center mb-4">
             {data && (
                <FaStar
                  className={`mr-1 ${data.ratings >0  && data.ratings ? 'text-yellow-300' : 'text-gray-300'}`}
                />
              )
             }
            </div>
            <div className='flex items-center gap-2'>
            <span className="text-lg font-semibold">${data && data.price}</span>
            <del className='text-gray-500 text-sm'>$15.5</del>
            <span className='text-md text-emerald-500 font-semibold'>($20% OFF)</span>
            {data && data.isSale && (
              <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-emerald-600 rounded">
                Sale
              </span>
            )}
            </div>
           <div>
           
           </div>
          <p className={`${mode === "dark" ? 'text-gray-200' : 'text-gray-700'} mb-4`}>{data && data.description}</p>
          <div className="flex items-center gap-10 mb-4">
            <div className='flex w-32 flex-col gap-1'>
              <span>Color</span>
              <div className={`text-sm flex items-center w-full gap-2 pl-3  py-2 relative ${mode === "dark" ? 'bg-darkbg text-gray-200' : 'bg-lighbg text-gray-700'}`}>

             {isColor && (
               <div className='w-full bg-red-500   flex flex-col absolute z-10 -bottom-36 left-0'>
               <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>Light Blue</span>
                 <span className='w-4 h-4 bg-blue-500'></span>
               </div>
             </div>
             <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
             <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>Light Blue</span>
                 <span className='w-4 h-4 bg-blue-500'></span>
               </div>
             </div>
             <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
             <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>Light Blue</span>
                 <span className='w-4 h-4 bg-blue-500'></span>
               </div>
             </div>
             <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
             <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>Light Blue</span>
                 <span className='w-4 h-4 bg-blue-500'></span>
               </div>
             </div>
             </div>
             )}

                <span>Light Blue</span>
                <FaChevronDown className='absolute right-2 top-3' onClick={()=>setIsColor(!isColor)}/>
              </div>
            </div>
            <div className='flex w-32 flex-col gap-1'>
              <span>Size</span>
              <div className={`text-sm flex items-center w-full gap-2 pl-3  py-2 relative ${mode === "dark" ? 'bg-darkbg text-gray-200' : 'bg-lighbg text-gray-700'}`}>

             {isSize && (
               <div className='w-full flex flex-col absolute z-10 -bottom-36 left-0'>
               <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>XL</span>
               </div>
             </div>
             <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
             <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>Large</span>
               </div>
             </div>
             <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
             <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>Medium</span>
               </div>
             </div>
             <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkfg' : 'bg-gray-200'} `}></div>
             <div className='w-full bg-darkufg cursor-pointer pl-3 py-2 flex flex-col gap-2 '>
               <div className='flex items-center gap-4 w-full'>
                 <span>Small</span>
               </div>
             </div>
             </div>
             )}

                <span>Large</span>
                <FaChevronDown className='absolute right-2 top-3' onClick={()=>setIsSize(!isSize)}/>
              </div>
            </div>
            <div className='flex w-32 flex-col gap-1'>
              <span>Quantity</span>
              <div className={`text-sm flex items-center w-full gap-2 pl-3  py-2 relative ${mode === "dark" ? 'bg-darkbg text-gray-200' : 'bg-lighbg text-gray-700'}`}>

             {isSize && (
              <div className=''>

              </div>
             
             )}

                <span>{quan}</span>
                <button onClick={handleIncrease}>
                <FaChevronUp className='absolute right-2 top-1'/>
                </button>
                <button onClick={handleDecrease}>
                <FaChevronDown className='absolute right-2 bottom-1'/>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center mb-4">
            <span className="ml-2 text-sm text-gray-600">({data && data.numReviews} Reviews)</span>
          </div> */}
          <button className="w-full mb-4 py-2 px-4 bg-transparent border border-emerald-500 text-emerald-500 font-semibold rounded-lg shadow-md hover:bg-emerald-500 hover:text-white">
            <FaShoppingCart className="inline mr-2" /> Add to Cart
          </button>
          <button className="w-full py-2 px-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700">
            <FaHeart className="inline mr-2" /> Add to Wishlist
          </button>
        </div>
      </div>
      {/* <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        {product.reviews.map((review, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="text-yellow-500 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{review.name}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div> */}
    </section>
  )
}

export default SingleProduct
