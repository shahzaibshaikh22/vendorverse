import React from 'react';
import { CiHeart } from 'react-icons/ci';
import { useSelector } from 'react-redux';

const ProductCardList = ({ product }) => {
  const mode = useSelector((state) => state.auth.mode)
  return (
    <div className='w-full relative  flex-col justify-between'>
        <span className='absolute text-2xl right-4 top-0 cursor-pointer text-md text-emerald-500'><CiHeart/></span>
       <div className='flex h-full gap-2 rounded-md'>
       {/* <div className='h-full w-64 flex-2 '>
            <img className='w-full h-full object-cover' src={product.images[0].url} alt="" />
       </div> */}
       <div className='py-4 flex-1 '>
        <h1 className={`text-xl font-semibold mb-1 ${mode === "dark" ? 'text-lightbg' : 'text-darkbg'}`}>{product.name}</h1>
        <div className='flex gap-1 mb-1 text-sm'>
            <span>{product.category}</span>
            <span>{product.subCategory}</span>
        </div>
        <div className={`flex gap-1 mb-1 text-sm ${mode === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>ratings: {product.ratings}</span>
            <span>reviews: ({product.numReviews})</span>
        </div>
        <div className={`flex gap-1 mb-1 w-full max-w-sm text-xs leading-[1.1rem] ${mode === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>{product.description}</span>
        </div>
        <span className='bg-emerald-500 mb-1 text-white whitespace-nowrap px-3 py-[1px] text-sm rounded-full drop-shadow-sm'>{product.storeName}</span>
       </div>
       <div className='flex h-full gap-2 flex-col items-center justify-center py-4 flex-2 pr-2 '>
        <span className='text-emerald-500 whitespace-nowrap'>Price: {product.price}</span>
        <button className='text-sm px-4 py-1 rounded-full text-white drop-shadow-md bg-emerald-500'>Add To Cart</button>
        <button className='text-sm px-4 py-1 rounded-full border-2 border-emerald-500 text-emerald-500'>Buy Now</button>
       </div>
       </div>
       <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkbg' : 'bg-gray-200'} `}></div>
    </div>
  );
};

export default ProductCardList;

{/* <div className={`rounded-lg relative  overflow-hidden shadow-md w-64 mx-4 my-4 `}>
<span className='saletag text-white absolute text-sm bg-emerald-500 px-3 py-1 rounded-md left-2 top-2'>Sale</span>
  <div>
  <img className="w-full h-40 object-contain" src={product.images[0].url} alt={product.name} />
  </div>
<div className="p-4">
  <h2 className={`text-lg font-semibold ${mode === "dark" ? 'text-lightfg' : 'text-darkbg'}`}>{product.name}</h2>
  <p className={`text-gray-700 ${mode === "dark" ? 'text-lightbg' : 'text-darkfg'}`}>${product.price}</p>
 <div className='flex items-center justify-between'>
 <button className="mt-2 bg-emerald-500 text-white  px-8 py-2 rounded-md">ADD TO CART</button>
 <button className="mt-2 bg-emerald-200 text-3xl p-1 text-emerald-800  rounded-md"><CiHeart/></button>
 </div>
</div>
</div> */}