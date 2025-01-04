import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleCartItem from "../components/SingleCartItem";
import Loading from "../components/Loading";
import { useFetchCartItemsQuery } from "../redux/features/apiSlices/productApiSlice";
import { setCartLength } from "../redux/features/slices/authSlice";
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';




const Cart = () => {
  const { mode, user } = useSelector((state) => state.auth);
  // const [clientSecret, setClientSecret] = useState('');
  const dispatch = useDispatch();
  let userId;
  if(user){
     userId = user._id;
  }


  // Fetching user cart
  const { data: userCart, isLoading: cartLoading } = useFetchCartItemsQuery(userId);

  let cartLength;
  useEffect(() => {
    
    if (userCart) {
      // Update cart length in Redux
     if(userCart.cart){
     cartLength = userCart.cart.sellers.reduce(
        (total, seller) => total + seller.items.length,
        0
      );
     }
     if(userCart.message === "Cart not found for the given user."){
      dispatch(setCartLength(0))
     }
      dispatch(setCartLength(cartLength));
    }
  }, [userCart,dispatch]);

let totalPrice;

  const shippingCost = 100;
  const taxRate = 0.05;
  const subTotal = userCart?.cart?.totalPrice || 0;
  const taxes = subTotal * taxRate;
   totalPrice = subTotal + taxes + shippingCost;

   const makePayment = async()=>{
    try {
      const stripe = await loadStripe('pk_test_51MtGm0GaYMqjC0SJRu8BneBx94emS6cVIWsLFwE7cww3AsWNSsNRmBfmqDdrKhJRdeacx0ubuvJGnenmFyzv7jXA005Dgaht4u')
      const body ={
        products:userCart
      }
      const headers = {
        "Content-Type": "application/json"
      }
      const response = await fetch("http://localhost:5000/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
      })
      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId:session.id
      })
      if(result.error){
        alert(result.error)
      }
    } catch (error) {
      console.log(error.message);
      
    }
   }
 if (cartLoading) {
    return (
      <Loading />
    )
  }



  return (
    <section
      className={`w-full mx-auto flex h-screen pt-20 ${
        mode === "dark" ? "bg-darkbg text-white" : "bg-lightbg text-gray-950"
      }`}
    >
      {userCart?.cart && userCart.cart.sellers.length > 0 ? ( // Check if cart and sellers exist
        <div className={`w-full xl:max-w-[1440px] h-auto mx-auto flex gap-4`}>
          {/* Cart Items */}
          <div className="w-full xl:max-w-7xl lg:max-w-7xl flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-semibold">Shopping Bag</h1>
              <p className="text-sm font-semibold">
                {userCart.cart.sellers.reduce(
                  (total, seller) => total + seller.items.length,
                  0
                )}{" "}
                items <span className="font-normal">in your bag</span>
              </p>
            </div>
            <div className={`w-full rounded-xl h-auto`}>
              <div className="mb-2 w-full grid grid-cols-5">
                <span className="text-gray-400">Product</span>
                <span className="text-gray-400">Name</span>
                <span className="text-gray-400">Price</span>
                <span className="text-gray-400">Quantity</span>
                <span className="text-gray-400">Remove</span>
              </div>
              {userCart.cart.sellers.map((seller) =>
                seller.items.map((item) => (
                  <SingleCartItem
                    key={item.productId._id}
                    item={item}
                    quantity={item.quantity}
                  />
                ))
              )}
            </div>
          </div>
  
          {/* Cart Summary */}
          <div className={`w-full flex flex-col gap-4 h-[85vh] xl:max-w-md lg:max-w-xs`}>
            <div
              className={`flex h-[50%] rounded-xl p-4 w-full flex-col gap-4 ${
                mode === "dark" ? "bg-darkfg drop-shadow-md text-white" : "bg-lightfg drop-shadow-md text-gray-950"
              }`}
            >
              <h1 className="text-2xl font-semibold">Cost Calculation</h1>
              <div className={`w-full`}>
                <div className="flex items-center gap-2">
                  <h1>Products Price</h1>
                  <span>{subTotal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <h1>Taxes</h1>
                  <span>{taxes.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <h1>Shipping Cost</h1>
                  <span>{shippingCost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <h1>Total</h1>
                  <span>{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="w-full p-4 bg-emerald-500 rounded-full text-center">
                {/* <Link to="/user/checkout" className="w-full text-white font-semibold">
                  Checkout
                </Link> */}
                <button onClick={makePayment} className="w-full text-white font-semibold">
                  Checkout
                </button>
                
              </div>
               {/* <Elements stripe={stripePromise}>
                  {clientSecret && <CheckoutForm clientSecret={clientSecret} />}
                </Elements> */}
            </div>
          </div>
          <div>
         
          </div>
        </div>
      ) : (
        // Empty cart message
        <div className="w-full text-center h-screen flex flex-col items-center pt-10">
          <h2 className="text-3xl text-gray-500">Your cart is empty</h2>
          <h2 className="text-2xl text-gray-400">Add something you would like to buy!</h2>
        </div>
      )}
    </section>
  );
  
};

export default Cart;
