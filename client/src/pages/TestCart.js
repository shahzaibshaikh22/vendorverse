import React from "react";
import { useFetchCartItemsQuery } from "../redux/features/apiSlices/productApiSlice";
import { useSelector } from "react-redux";

const TestCart = () => {
    const { user } = useSelector((state)=>state.auth)
    let userId;
    if(user){
        userId = user._id
    }
  // Fetch cart data
  const { data: cart, isLoading, isError } = useFetchCartItemsQuery(userId);

  // Loading and Error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load cart data!</div>;

  // Destructure sellers and totalPrice from the cart
  const { sellers, totalPrice } = cart || {};

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Shopping Bag</h1>
          <p className="text-gray-500 mb-6">
            {sellers?.reduce((acc, seller) => acc + seller.items.length, 0) || 0}{" "}
            items in your bag.
          </p>

          {/* Loop through sellers */}
          {sellers?.map((seller, sellerIndex) => (
            <div key={sellerIndex} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Seller ID: {seller.sellerId}
              </h2>

              {/* Loop through items for each seller */}
              {seller.items.map((item, itemIndex) => (
                <div
                  key={item._id}
                  className="border-b pb-4 mb-4 flex items-start space-x-4"
                >
                  <img
                    src={
                      item.productId.imageUrl || "https://via.placeholder.com/100"
                    }
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.productId.name}</h3>
                    <p className="text-gray-500">
                      {item.productId.category || "Category"}
                    </p>
                    <p className="text-gray-500">
                      Price: ${item.productId.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Qty: {item.quantity}</p>
                    <p className="font-bold text-orange-500">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="bg-orange-100 p-4 rounded-lg">
              <p>Total Items: {sellers?.reduce((acc, seller) => acc + seller.items.length, 0)}</p>
              <p className="font-bold text-lg">Total Price: ${totalPrice}</p>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 mt-4 rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCart;
