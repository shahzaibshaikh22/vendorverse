import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
    const { mode } = useSelector((state)=>state.auth)
  return (
    <div className={`min-h-screen pt-20 ${mode === "dark" ? 'bg-darkfg' : 'bg-lightbg'} flex justify-center items-center`}>
      <div className={`max-w-6xl w-full ${mode === "dark" ? 'bg-darkbg text-lightgray' : 'bg-lightfg text-darkufg'} shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6`}>
        {/* Shipping Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>

          {/* Shipping Method */}
          <div className="mb-6">
            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="shipping-method"
                className="h-4 w-4 text-emerald-500 focus:ring-emerald-500"
                defaultChecked
              />
              <span>Delivery</span>
            </label>
            <label className="flex items-center gap-4 mt-2">
              <input
                type="radio"
                name="shipping-method"
                className="h-4 w-4 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Pick up</span>
            </label>
          </div>

          {/* Shipping Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
                <option>Choose country</option>
                <option>Pakistan</option>
                <option>USA</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter state"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  placeholder="Enter ZIP code"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="ml-2 text-sm text-gray-500">
                  I have read and agree to the Terms and Conditions.
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Review Your Cart */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Review your cart</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>DuoComfort Sofa Premium</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span>IronOne Desk</span>
              <span>$25.00</span>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Discount code
            </label>
            <div className="flex items-center mt-1">
              <input
                type="text"
                placeholder="Enter discount code"
                className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button className="ml-2 bg-emerald-500 text-white px-4 py-2 rounded-md">
                Apply
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$45.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-$10.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$40.00</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-emerald-500 text-white py-2 rounded-md">
            Pay Now
          </button>
          <p className="mt-4 text-sm text-center text-gray-500">
            Secure Checkout - SSL Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
