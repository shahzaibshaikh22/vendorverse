import React, { useState } from "react";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";

// Mock Data
const users = [
  { name: "Grant Siders",from:"pakistan", email: "gsiders@heliacare.com", role: "Super Admin" },
  { name: "Grant Siders",from:"pakistan", email: "gsiders@heliacare.com", role: "Super Admin" },
  { name: "Scott Stewart",from:"pakistan", email: "scott@heliacare.com", role: "Client Account Manager" },
  { name: "Jane Doe",from:"pakistan", email: "jane@heliacare.com", role: "Client Account Manager (Admin)" },
  { name: "Jane Doe",from:"pakistan", email: "jane@heliacare.com", role: "Client Account Manager (Admin)" },
  { name: "Dillon Morris",from:"pakistan", email: "dillon@heliacare.com", role: "Invitation Pending" },
  { name: "Jamie Hollis",from:"pakistan", email: "jamie@heliacare.com", role: "Invitation Pending" },
  { name: "Kingston Stewart",from:"pakistan", email: "king@heliacare.com", role: "Invitation Pending" },
  { name: "Jeff Thomas",from:"pakistan", email: "jeff@heliacare.com", role: "Invitation Pending" },
  { name: "Jeff Thomas",from:"pakistan", email: "jeff@heliacare.com", role: "Invitation Pending" },
  { name: "Jamie Hollis",from:"pakistan", email: "jamie@heliacare.com", role: "Invitation Pending" },
  // Add more users as needed...
];

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8;

  // Calculate paginated data
  const totalPages = Math.ceil(users.length / resultsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const { mode } = useSelector((state)=>state.auth)

  return (
    <div className={`w-full h-screen px-4 ${mode === "dark" ? 'bg-darkbg text-white' : 'bg-lightbg text-darkbg'}`}>
        <TopBar/>
      <h1 className="text-xl font-bold my-4">Manage Users</h1>
      <table className={`min-w-full h-[70vh] ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'}  rounded-lg shadow-md`}>
        <thead>
          <tr>
            <th className="py-2 px-4 text-left font-medium border-b">Name</th>
            <th className="py-2 px-4 text-left font-medium border-b">From</th>
            <th className="py-2 px-4 text-left font-medium border-b">Email</th>
            <th className="py-2 px-4 text-left font-medium border-b">Role</th>
            <th className="py-2 px-4 text-left font-medium border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={index} className={` ${mode==="dark" ? 'hover:bg-darkufg' : 'hover:bg-lightbg'}`}>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.from}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td
                className={`py-2 px-4 ${
                  user.role.includes("Pending") ? "text-orange-500" : ""
                }`}
              >
                {user.role}
              </td>
              <td className="py-2 px-4">...</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-emerald-200" : "bg-emerald-500 text-white"
          }`}
        >
          Previous
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === page
                  ? "bg-emerald-500 text-white"
                  : "bg-emerald-200 text-black"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages ? "bg-emerald-200" : "bg-emerald-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
