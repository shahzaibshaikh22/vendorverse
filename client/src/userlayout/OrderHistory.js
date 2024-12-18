import React from "react";

const OrderHistory = () => {
  return (
    <div className=" pt-20 md:px-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-gray-500">Jan 1 - Jan 30, 2024</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700">Export</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700">More actions</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md">Create order</button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["Total Orders", "Order Items Over Time", "Returns Orders", "Fulfilled Orders Over Time"].map(
          (title, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-gray-500 text-sm">+12.2% last week</p>
              <div className="mt-4 h-16 bg-gray-200 rounded-md"></div>
            </div>
          )
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["All", "Unfulfilled", "Unpaid", "Open", "Closed", "Add"].map((tab, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              {["Order", "Date", "Customer", "Payment", "Total", "Delivery", "Items", "Fulfillment", "Action"].map(
                (heading, index) => (
                  <th key={index} className="px-4 py-2 text-sm font-semibold text-gray-600">
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[
              {
                order: "#002",
                date: "11 Feb, 2024",
                customer: "Wade Warren",
                payment: "Pending",
                total: "$20.00",
                delivery: "N/A",
                items: "2 items",
                fulfillment: "Unfulfilled",
              },
              // Add more rows here...
            ].map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{row.order}</td>
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.customer}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      row.payment === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {row.payment}
                  </span>
                </td>
                <td className="px-4 py-2">{row.total}</td>
                <td className="px-4 py-2">{row.delivery}</td>
                <td className="px-4 py-2">{row.items}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      row.fulfillment === "Unfulfilled"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {row.fulfillment}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
