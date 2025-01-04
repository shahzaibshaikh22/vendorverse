import React, { useEffect } from 'react';
import { CiHeart } from 'react-icons/ci';
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useAddProductToCartMutation, useAddToWishlistMutation } from '../redux/features/apiSlices/productApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {

  
  const { mode, user, } = useSelector((state) => state.auth)
  let userId;
  if (user) {
    userId = user._id
  }

  const [addToCart] = useAddProductToCartMutation()
  const [adToWishlist] = useAddToWishlistMutation()

  const navigate = useNavigate()
  

  const handleAddToCart = async (product) => {
    const { data } = await addToCart({ productId:product._id, sellerId:product.sellerId, userId })
    if(!user){
      navigate('/login')
    }
    navigate('/cart')
  }
  const handleAddToWiishlist = async (productId) => {
    const { data } = await adToWishlist({ productId, userId })
    if (data.err) {
      alert(data.err)
    }
    navigate('/wishlist')
  }

  return (
    <div className={`rounded-lg relative ${mode === "dark" ? 'bg-darkufg' : 'bg-lightbg'}  overflow-hidden shadow-md w-64 mx-4 my-4 `}>
      {product && product.isSale &&(
        <span className='saletag text-white absolute text-sm bg-emerald-500 px-3 py-1 rounded-md left-2 top-2'>Sale</span>
      )}
      <Link to={`/product/${product._id}`}>
        <div>
          {product && product.images ? (
            <img className="w-full h-40 object-contain" src={`http://localhost:5000/${product.images[0]}`} alt="/images/shoes2.webp" />
          ):(<img className="w-full h-40 object-contain" src="/images/shoes2.webp" alt="/images/shoes2.webp" />)}
        </div>
      </Link>
      <div className="p-4">
        <h2 className={`text-lg font-semibold ${mode === "dark" ? 'text-lightfg' : 'text-darkbg'}`}>{product.name}</h2>
        <p className={`text-gray-700 ${mode === "dark" ? 'text-lightbg' : 'text-darkfg'}`}>${product.price}</p>
        <div className='flex items-center justify-between'>
          <button onClick={() => handleAddToCart(product)} className="mt-2 bg-emerald-500 text-white  px-8 py-2 rounded-md">ADD TO CART</button>
          <button onClick={() => handleAddToWiishlist(product._id)} className="mt-2 bg-emerald-200 text-3xl p-1 text-emerald-800  rounded-md"><CiHeart /></button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;