import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ShoppingAnalytics = () => {
  const { mode } = useSelector((state)=> state.auth)
  // Example shopping data
  const [data, setData] = useState([
    { date: "2024-11-01", amount: 150 },
    { date: "2024-11-02", amount: 200 },
    { date: "2024-11-03", amount: 300 },
    { date: "2024-11-04", amount: 100 },
    { date: "2024-11-05", amount: 500 },
    { date: "2024-11-06", amount: 250 },
    { date: "2024-11-07", amount: 50 },
  ]);
  console.log(setData);
  

  // Prepare data for the chart
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Shopping Amount ($)",
        data: data.map((item) => item.amount),
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: mode ==="dark" ? "#E1E1E1" : '#3A3B3C',
        tension: 0.3,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw}`, // Show currency
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.5)", // Gridline color for x-axis
          borderColor: "rgba(0, 0, 0, 0.1)", // Border color of the x-axis
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.5)", // Gridline color for x-axis
          borderColor: "rgba(0, 0, 0, 0.1)", // Border color of the x-axis
        },
        title: {
          display: true,
          text: "Amount ($)",
        },
        beginAtZero: true,
      },
    },
  };
  // const handleFilter = (type) => {
  //   if (type === "daily") {
  //     setData([...data]); // Replace with daily data
  //   } else if (type === "weekly") {
  //     setData([...data]); // Replace with weekly data
  //   } else if (type === "monthly") {
  //     setData([...data]); // Replace with monthly data
  //   }
  // };
  return (
    <div className={`w-full flex items-center  max-w-4xl mt-4  ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'} shadow-md rounded-md`}>
      {/* <div className="flex gap-4 mb-4">
      <button onClick={() => handleFilter("daily")} className="btn text-red-900">Daily</button>
      <button onClick={() => handleFilter("weekly")} className="btn text-red-900">Weekly</button>
      <button onClick={() => handleFilter("monthly")} className="btn text-red-900">Monthly</button>
    </div> */}
      <div className="w-full shadow-md rounded-md">
        <h6 className={`text-lg px-4 py-1 ${mode === "dark" ? 'text-white' : 'text-darkufg'}`}>Shopping Analytics</h6>
      <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ShoppingAnalytics;
