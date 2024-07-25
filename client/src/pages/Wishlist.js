import React,{useEffect} from 'react';
import { GoHeart } from "react-icons/go";
import { useSelector, useDispatch } from 'react-redux';
import { useFetchWishlistItemsQuery } from '../redux/features/apiSlices/productApiSlice';
import SingleWishlistItem from '../components/SingleWishlistItem';
import { setWishListLength } from '../redux/features/slices/authSlice';

const Wishlist = () => {

  const {mode, user,wishLength} = useSelector((state) => state.auth)
  console.log(wishLength);
  let userId;
  if(user){
     userId = user._id
  }
  const dispatch = useDispatch()

  // fetch all wishlist items of user
  const { data:wishlist, isLoading:wishlistLoading } = useFetchWishlistItemsQuery(userId)

  useEffect(()=>{
    if(wishlist){
      // localStorage.setItem("lenghtOfCart", JSON.stringify(userCart.length))
      dispatch(setWishListLength(wishlist.length))
    }
  },[wishlist])

  return (
   <>
    {wishlist && wishlist.length >0 ? (
       <div className={`w-full flex flex-col  h-screen  pt-20 ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
       <div className='w-full items-center flex flex-col'>
         <GoHeart className='text-5xl text-emerald-400'/>
       <h2 className="text-4xl  font-bold mb-4 text-emerald-400">My Wishlist</h2>
       </div>
       <div className={`w-full xl:max-w-[1440px] drop-shadow-md mx-auto flex flex-col rounded-md p-4 gap-2 ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'}`}>
       <div className='mb-2 w-full grid grid-cols-6'>
              <span className=' flex items-center justify-center text-gray-400'></span>
              <span className=' flex items-center justify-center text-gray-400'>Product</span>
              <span className=' flex items-center justify-center text-gray-400'>Name</span>
              <span className=' flex items-center justify-center text-gray-400'>Unit Price</span>
              <span className=' flex items-center justify-center text-gray-400'>Stock Status</span>
              <span className=' flex items-center justify-center text-gray-400'></span>
       </div>
       <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
        {wishlist.map((item)=>{
          return (
            <SingleWishlistItem key={item._id} item={item}/>
          )
        })}
       </div>
     </div>
    ):(
      <div className={`w-full flex flex-col justify-center  h-screen  pt-20 ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
         <div className='w-full text-center h-screen flex flex-col items-center pt-10'>
        <h2 className='text-3xl text-gray-500'>Your Wishlist is empty yet</h2>
        <h2 className='text-2xl text-gray-400'>Add something you would like to buy!</h2>
      </div>
      </div>
    )}
   </>
  );
};

export default Wishlist;