import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Line chart data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Online Orders",
        data: [40, 50, 60, 80, 90, 70, 100],
        borderColor: "#34D399",
        backgroundColor: "rgba(99, 102, 241, 0.3)",
        tension: 0.3,
      }
    ],
  };

  // Doughnut chart data
  const doughnutData = {
    labels: ["Pakistan", "India", "America"],
    datasets: [
      {
        data: [300, 200, 100],
        backgroundColor: [
          "#D2D2D2", // Electronics
          "#737373", // Clothing
          "#333333", // Groceries

        ],
        hoverOffset: 4,
      },
    ],
  };

  // Mock product list
  const products = [
    { name: "Nike Revolution", code: "#12345", status: "IN STOCK", price: "$12,760", qty: "12544" },
    { name: "Nike Revolution", code: "#12345", status: "LOW STOCK", price: "$12,760", qty: "253" },
    { name: "Nike Revolution", code: "#12345", status: "OUT OF STOCK", price: "$12,760", qty: "0" },
  ];
const { mode } = useSelector((state)=>state.auth)
  return (
    <div className={` rounded-md  min-h-screen ${mode === "dark" ? 'bg-darkbg text-white' : 'bg-lightbg text-darkbg'}`}>
      {/* Summary Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
        {["Total Sales", "Total Orders", "Total Earnings"].map((title, index) => (
          <div key={index} className={`${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'} p-6 rounded-lg shadow`}>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="text-2xl font-bold mt-2">$20,255</p>
            <p className={`text-sm mt-1 ${index % 2 === 0 ? "text-green-500" : "text-red-500"}`}>
              {index % 2 === 0 ? "+1.01%" : "-0.31%"} this week
            </p>
          </div>
        ))}
      </div>

      {/* Analytics and Doughnut */}
      <div className="flex w-full gap-6 mt-6">
        <div className={`w-full ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'} max-w-4xl p-6 rounded-lg shadow`}>
          <h2 className="text-lg font-semibold">Orders Analytics</h2>
          <Line data={lineData} />
        </div>
        <div className={`p-6 ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'} rounded-lg shadow`}>
          <h2 className="text-lg font-semibold">Most Orders</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Products List */}
      <div className={`mt-6 ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'} p-6 rounded-lg shadow`}>
        <h2 className="text-lg font-semibold">Products List</h2>
        <table className="w-full mt-4">
          <thead>
            <tr className="text-left">
              <th className="py-2">Product Name</th>
              <th className="py-2">Code</th>
              <th className="py-2">Status</th>
              <th className="py-2">Price</th>
              <th className="py-2">Qty Left</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.code}</td>
                <td
                  className={`py-2 ${
                    product.status === "IN STOCK"
                      ? "text-green-500"
                      : product.status === "LOW STOCK"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {product.status}
                </td>
                <td className="py-2">{product.price}</td>
                <td className="py-2">{product.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
