import React from "react";
import { useSelector } from "react-redux";

const UserOrderHistory = () => {
    const { mode } = useSelector((state)=>state.auth);
  return (
    <div className={`md:px-8 pt-20 ${mode === "dark" ? 'bg-darkfg text-lightgray' : 'bg-lightfg text-darkufg'} min-h-screen`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Orders</h1>
        <p>6</p>
      </div>

      {/* Tabs and Filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {["Orders", "Not Yet Shipped", "Cancelled Orders"].map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                index === 0
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <select className="border border-gray-300 rounded px-3 py-2">
          <option>Past 3 Month</option>
          <option>Past 6 Month</option>
          <option>Past Year</option>
        </select>
      </div>

      {/* Order Card */}
      <div className={`${mode === "dark" ? 'bg-darkbg' : 'bg-lightfg'} rounded-md shadow mb-6`}>
        {/* Order Details */}
        <div className="p-4 border-b">
          <p className="text-gray-600 text-sm">
            <span className="font-bold">Order placed:</span> June 2, 2023
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-bold">Total:</span> $157.99
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-bold">Ship to:</span> Irakli Lolashvili
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-emerald-600 hover:underline">
              View order details
            </a>
            <a href="#" className="text-emerald-500 hover:underline">
              View invoice
            </a>
          </div>
        </div>

        {/* Feedback Banner */}
        <div className="p-4 bg-yellow-100 border-t border-b border-yellow-300">
          <p className="text-yellow-800 text-sm">
            ⭐ Please rate your experience with the seller
          </p>
        </div>

        {/* Delivered Section */}
        <div className="p-4">
          <p className="text-green-600 font-bold mb-4">Delivered June 5</p>

          {/* Product Item */}
          <div className="flex items-start space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Product"
              className="w-24 h-24 rounded border"
            />
            <div className="flex-1">
              <h2 className="font-semibold">
                SAMSUNG 980 PRO SSD 2TB PCIe NVMe Gen 4 Gaming M.2 Internal
                Solid State Drive Memory Card...
              </h2>
              <p className="text-gray-500 text-sm">
                Return or replace items: Eligible through July 5, 2023
              </p>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded">
                  Buy it again
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded">
                  View your item
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded">
                  Track package
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Another Delivered Section */}
        <div className="p-4">
          <p className="text-green-600 font-bold mb-4">Delivered June 7</p>

          {/* Product Item */}
          <div className="flex items-start space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Product"
              className="w-24 h-24 rounded border"
            />
            <div className="flex-1">
              <h2 className="font-semibold">
                ORICO M.2 NVMe SSD Enclosure, USB 3.1 Gen 2 (10 Gbps) to NVMe
                PCI-E M.2 SSD Case Support UASP...
              </h2>
              <p className="text-gray-500 text-sm">
                Return or replace items: Eligible through July 5, 2023
              </p>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded">
                  Buy it again
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded">
                  View your item
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded">
                  Track package
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderHistory;
