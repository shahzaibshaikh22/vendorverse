import React from "react";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const { mode } = useSelector((state)=>state.auth)
  return (
      <section className={`w-full h-auto px-4 ${mode === "dark" ? 'bg-darkfg' : 'bg-lightbg'}`}>
    <TopBar/>
      <div className={`w-full mt-4 mx-auto ${mode === "dark" ? 'bg-darkfg text-lightgray' : 'bg-lightfg text-darkufg'} shadow rounded-lg p-8`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Product</h2>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Add Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* General Information */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">General Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Name Product</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description Product</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Size</label>
                  <div className="flex gap-2">
                    {["XS", "S", "M", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-2 border rounded bg-gray-100 hover:bg-green-200"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Gender</label>
                  <div className="flex gap-2">
                    {["Men", "Woman", "Unisex"].map((gender) => (
                      <button
                        key={gender}
                        className="px-3 py-2 border rounded bg-gray-100 hover:bg-green-200"
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Upload Image */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Upload Img</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
                <p>Image Preview</p>
              </div>
              <div className="mt-4 flex gap-2">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center"
                  >
                    <p>{idx + 1}</p>
                  </div>
                ))}
                <button className="w-16 h-16 border border-gray-300 rounded text-gray-500 flex items-center justify-center hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>
          </div>
          {/* Pricing and Stock */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">Pricing And Stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Base Pricing</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="$47.55"
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="77"
                />
              </div>
              <div>
                <label className="block text-gray-700">Discount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="10%"
                />
              </div>
              <div>
                <label className="block text-gray-700">Discount Type</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Chinese New Year Discount"
                />
              </div>
            </div>
          </div>
          {/* Category */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <div>
              <label className="block text-gray-700">Product Category</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Jacket"
              />
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
