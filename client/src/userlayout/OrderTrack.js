import React from 'react'
import { useSelector } from 'react-redux'

const OrderTrack = () => {
    const { mode } = useSelector((state)=> state.auth)
  return (
    // <section className={`w-full p-4  flex flex-col gap-4 pt-20 `}>
    //   <h1 className={`${mode === "dark" ? 'text-lightgray' : 'text-darkufg'} text-2xl mt-4 text-center`}>Track your orders</h1>
    // </section>
    <section className={`w-full ${mode === "dark" ? 'bg-darkbg text-lightgray' : 'bg-lightfg text-darkufg'}  h-auto pt-20 flex justify-center items-center`}>
    <div className={`shadow-lg  ${mode === "dark" ? 'bg-darkbg text-lightgray' : 'bg-lightfg text-darkufg'} rounded-lg w-full max-w-5xl mx-auto`}>
      {/* Header */}
      <div className="p-6">
        <h2 className="text-xl font-bold">Order details #A23D4587</h2>
        <p className="text-gray-500 mt-1">Date: 08/02/2023</p>
      </div>

      {/* Progress Steps */}
      <div className="p-6 flex justify-between relative items-center">
      <div className={`h-0.5 ${mode === "dark" ? 'bg-lightgray' : 'bg-lightgray'} absolute top-[36%] left-0  w-full`}></div> 
        <div className="flex flex-col absolute top-[10%] left-[50px] items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full">
            1
          </div>
          <p className="text-lg mt-2 font-semibold">Order Confirmed</p>
          <p className="text-sm">8,Am / Feb,8,24</p>
        </div>
        {/* <div className="h-0.5 bg-gray-300 w-full mx-2"></div> */}
        <div className="flex flex-col absolute top-[10%] left-[50%] items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-darkufg rounded-full">
            2
          </div>
          <p className="text-lg mt-2 font-semibold">Shipping</p>
          <p className="text-sm">Shipping with TCS</p>
        </div>
        {/* <div className="h-0.5 bg-gray-300 w-full mx-2"></div> */}
        <div className="flex flex-col absolute top-[10%] right-[50px] items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-darkufg rounded-full">
            3
          </div>
          <p className="text-lg mt-2 font-semibold">To Deliver</p>
          <p className="text-sm">Estimated 2th june</p>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="p-6 mt-10">
        <h3 className="font-bold text-lg">Shipping Information</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 text-sm">Courier Name</label>
           <div className='border-[1px] border-lightgray rounded-md px-4 py-2'>
            <p className={`${mode === "dark" ? 'text-lightgray' : 'text-darkufg'}`}>Adora Express</p>
           </div>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Tracking Number</label>
            <div className='border-[1px] border-lightgray rounded-md px-4 py-2'>
            <p className={`${mode === "dark" ? 'text-lightgray' : 'text-darkufg'}`}>SSA4569AE4F592</p>
           </div>
          </div>
          <div className="col-span-2">
            <label className="text-gray-500 text-sm">Shipment Tracking URL</label>
            <p className="text-blue-500 underline">
              https://www.shipmentlink.com/servlet/TDB1_CargoTracking.do
            </p>
          </div>
        </div>
      </div>

      {/* Items Ordered */}
      <div className="p-6 border-t">
        <h3 className="font-bold text-lg">Item Ordered</h3>
        <div className="mt-4 space-y-4">
          {/* Item 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="/images/shoes1.webp"
                alt="Item 1"
                className="w-20 h-20 rounded-lg"
              />
              <div>
                <h4 className="">Dior Tribales Earrings</h4>
                <p className="text-gray-500 text-sm">1x</p>
              </div>
            </div>
            <p className="">$450.00 USD</p>
          </div>
          {/* Item 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="/images/shoes2.webp"
                alt="Item 2"
                className="w-20 h-20 rounded-lg"
              />
              <div>
                <h4 className="">Mizza Slingback Ballerina</h4>
                <p className="text-gray-500 text-sm">1x</p>
              </div>
            </div>
            <p className="">$450.00 USD</p>
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Product Total</span>
            <span className="">$900.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping Cost</span>
            <span className="text-green-500">FREE</span>
          </div>
          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total</span>
            <span>$900.00</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  )
}

export default OrderTrack
