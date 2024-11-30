import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const UserDonutChart = () => {
  const { mode } = useSelector((state)=> state.auth)
  // Sample data for shopping categories
  const data = {
    labels: ["Electronics", "Clothing", "Groceries"],
    datasets: [
      {
        label: "Shopping by Category",
        data: [500, 300, 400], // Corresponding amounts spent
        backgroundColor: [
          "#D2D2D2", // Electronics
          "#737373", // Clothing
          "#333333", // Groceries

        ],
        borderColor: [
          "#E1E1E1",
          "#E1E1E1",
          "#E1E1E1",
        ],
        borderWidth: .5,
      },
    ],
  };
  // Calculate the total of the data values
  const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
  

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top", // Position of the legend (top, bottom, left, right)
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // Value for the category
            const label = tooltipItem.label; // Label for the category
            return `${label}: $${value}`;
          },
        },
      },
    },
  };

  return (
    <div className={`w-full relative max-w-sm h-[480px] shadow-md rounded-md mt-3 ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'}`}>
        <h6 className={`text-lg px-4 py-1 ${mode === "dark" ? 'text-white' : 'text-darkufg'}`}>Popular Categories</h6>
        <div className="w-full h-[50%] mt-16 ">
        <Doughnut data={data} options={options} />
        <span className="absolute top-[46%] text-lg left-[43%]">${total}</span>
        </div>
    </div>
  );
};

export default UserDonutChart;
