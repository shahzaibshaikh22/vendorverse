import React,{useEffect} from 'react'
// import { FaArrowLeft, FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import SingleCartItem from '../components/SingleCartItem';
import Loading from "../components/Loading"
import { useFetchCartItemsQuery, useGetTotalPriceQuery } from '../redux/features/apiSlices/productApiSlice';
import { setCartLength } from '../redux/features/slices/authSlice'; 
import { Link } from 'react-router-dom';


const Cart = () => {
  const {mode, user, lenghts} = useSelector((state)=> state.auth);
  console.log(user);
  
  // const lenghtCart = useSelector((state)=> state.authProducts.IncartLength);
  const dispatch = useDispatch()
  // user id 
  let userId;
  if(user){
     userId = user._id
  }
  // fetching user cart
  const { data:userCart, isLoading:cartLoading } = useFetchCartItemsQuery(userId)

  // fetch the total price of cart
  const {data:subTotal} = useGetTotalPriceQuery(userId) 
  if(subTotal){
    console.log(subTotal);
  }
  // fetch the total price of cart 

  // set cart lenght to show how many items in cart
useEffect(()=>{
  if(userCart){
    // localStorage.setItem("lenghtOfCart", JSON.stringify(userCart.length))
    dispatch(setCartLength(userCart.length))
  }
},[userCart,subTotal])

if(cartLoading){
  return (
    <Loading/>
  )
}



  // const calculateTotalPrice = () => {
  //   let subtotal = 0;
  //   const shippingCost = 4.99;
  //   const taxRate = 0.1;

  //   for (const item of cart) {
  //     const lineTotal = item.quantity * item.price;
  //     subtotal += lineTotal;
  //   }

  //   const taxes = subtotal * taxRate;
    
  //   const totalPrice = subtotal + shippingCost + taxes;
  //   console.log(totalPrice.toFixed(2));

  //   return totalPrice.toFixed(2);
  // };

  // const totalPrice = calculateTotalPrice();
  // console.log(totalPrice);

  let shippingCost = 100;
  let taxRate = 0.05;
  let taxes = taxRate * subTotal;
  const totalPrice = taxes + shippingCost  + subTotal;
  

  return (
    <section className={`w-full  mx-auto flex  h-screen pt-20 ${mode === "dark" ? 'bg-darkbg text-white' : 'bg-lightbg text-gray-950'}`}>
      {userCart && userCart.length >0 ? (
         <div className={`w-full xl:max-w-[1440px] h-auto mx-auto flex gap-4`}>
         <div className='w-full xl:max-w-7xl  lg:max-w-7xl flex flex-col gap-6 '>
         <div>
         <h1 className='text-2xl font-semibold'>Shopping Bag</h1>
         <p className='text-sm font-semibold'>2 items<span className='font-normal'> in your bag</span></p>
         </div>
         <div className={`w-full  rounded-xl h-auto `}>
           <div className='mb-2 w-full grid grid-cols-5'>
             <span className=' text-gray-400'>Product</span>
             <span className=' text-gray-400'>Name</span>
             <span className=' text-gray-400'>Price</span>
             <span className=' text-gray-400'>Quantity</span>
             <span className=' text-gray-400'>Remove</span>
           </div>
         {userCart && (
            userCart.map((item) => (
             <SingleCartItem key={item._id} item={item}/>
            ))
         )}
         </div>
       </div>
        
        <div className={`w-full flex flex-col gap-4 h-[85vh] xl:max-w-md lg:max-w-xs`}>
          <div className={`flex h-[50%] rounded-xl p-4 w-full  flex-col gap-4 ${mode === "dark" ? 'bg-darkfg drop-shadow-md text-white' : 'bg-lightfg drop-shadow-md text-gray-950'}`}>
            <h1 className='text-2xl font-semibold'>Calculated Shipping</h1>
            <form className='w-full flex flex-col gap-6'>
              <div className='w-full'>
                <select className={`select select-bordered rounded-full w-full ${mode === 'dark' ? 'bg-darkufg text-white' : 'bg-gray-200 text-gray-900'}`}>
                <option disabled selected>{user ? user.country : 'Country'}</option>
                <option>{user && user.country}</option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
              </div>
              <div className='w-full flex items-center gap-4'>
              <select className={`select select-bordered rounded-full w-full ${mode === 'dark' ? 'bg-darkufg text-white' : 'bg-gray-200 text-gray-900'}`}>
                <option disabled selected>{user ? user.state : 'State/city'}</option>
                <option>{user && user.state}</option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
              <input type="text" placeholder="Zip Code" 
              className={`input placeholder:text-sm rounded-full input-bordered w-full ${mode === 'dark' ? 'bg-darkufg text-white' : 'bg-gray-200 text-gray-900'}`} />
              </div>
              <button type='submit' className='w-full p-3 rounded-full bg-emerald-400 text-white font-semibold'>Update</button>
            </form>
            <div className={`w-full  p-[.7px] `}>
              <form className='w-full relative flex items-center gap-2'>
                <input type="text" className={` input placeholder:text-sm rounded-full input-bordered w-full ${mode === 'dark' ? 'bg-darkufg text-white' : 'bg-gray-200 text-gray-900'}`} name="couponCode" placeholder='Enter Coupon Code' id="" />
                <button className='absolute right-1 rounded-full py-1 px-6 text-white bg-emerald-500 '>verify</button>
              </form>
            </div>
          </div>
          <div className={`flex h-[50%] rounded-xl p-4 w-full  flex-col gap-4 ${mode === "dark" ? 'bg-darkfg drop-shadow-md text-white' : 'bg-lightfg drop-shadow-md text-gray-950'}`}>
            <h1 className='text-2xl font-semibold'>Cost Calculation</h1>
            
            <div className={`w-full  p-[.7px] `}>
              <div className='flex items-center gap-2'>
              <h1>Products Price</h1>
              <span>{subTotal}</span>
              </div>
              <div className='flex items-center gap-2'>
              <h1>taxes</h1>
              <span>{taxes}</span>
              </div>
              <div className='flex items-center gap-2'>
              <h1>Shipping Cost</h1>
              <span>{shippingCost}</span>
              </div>
              <div className='flex items-center gap-2'>
              <h1>Sub Total</h1>
              <span>{totalPrice}</span>
              </div>
            </div>
            <div className='w-full p-4 bg-emerald-500 rounded-full text-center'>
              <Link to="/user/checkout" className="w-full text-white font-semibold">
                Checkout
              </Link>
            </div>
          </div>
        </div>
       </div>
      ):(
        <div className='w-full text-center h-screen flex flex-col items-center pt-10'>
        <h2 className='text-3xl text-gray-500'>Your cart is empty yet</h2>
        <h2 className='text-2xl text-gray-400'>Add something you would like to buy!</h2>
      </div>
      )}
    </section>
  )
}

export default Cart


