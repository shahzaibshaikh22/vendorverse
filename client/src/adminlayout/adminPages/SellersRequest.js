import React, { useState } from "react";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";
import { useApprovePaymentMutation,useApproveSellerMutation,useApproveSellerRequestMutation, useDeleteSellerRequestMutation, useGetSellerRequestsQuery } from "../../redux/features/apiSlices/adminApiSlice";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellersRequest = () => {
  const [approveRequest] = useApproveSellerRequestMutation();
  const [deleteRequest] = useDeleteSellerRequestMutation();
  const [approvePayment] = useApprovePaymentMutation()
  const [approveSeller] = useApproveSellerMutation()
  const { mode } = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)

  // get all request 
  const { data, isLoading, refetch } = useGetSellerRequestsQuery();


  if (isLoading) {
    return (
      <Loading />
    )
  }

  // approve seller request or decline
  const handleApproveRequest = async (_id) => {
    try {
      const { data: response } = await approveRequest({ _id })
      if (response.msg) {
        setOpen(false)
        toast.success(response.msg)
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // delete seller request

  const handleDeleteRequest = async (_id) => {
    try {
      const { data: deleteRes } = await deleteRequest({ _id })
      if (deleteRes.msg) {
        setOpen(false)
        refetch()
        toast.success(deleteRes.msg)
      }
    } catch (error) {
      console.log(error.message);

    }
  }
  //approve or decline payment

  const handleApprovePayment = async (_id) => {
    try {
      const { data: paymentRes } = await approvePayment({ _id })
      if (paymentRes.msg) {
        setOpen(false)
        refetch()
        toast.success(paymentRes.msg)
      }
    } catch (error) {
      console.log(error.message);

    }
  }

  // approve seller or decline
  const handleApproveSeller = async (_id) => {
    try {
      const { data: sellertRes } = await approveSeller({ _id })
      if (sellertRes.msg) {
        setOpen(false)
        refetch()
        toast.success(sellertRes.msg)
      }
    } catch (error) {
      console.log(error.message);

    }
  }


  return (
    <div className={`md:px-5 ${mode === "dark" ? 'bg-darkbg text-white' : 'bg-lightbg text-darkbg'}  min-h-screen`}>
      <TopBar />
      {/* Header */}
      <div className="flex justify-between items-center my-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Requests</h1>
        </div>
        {/* <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700">Export</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700">More actions</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md">Create order</button>
        </div> */}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["Total Requests", "Unpaid Sellers", "Approved Sellers"].map(
          (title, index) => (
            <div key={index} className={`p-4 ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkbg'} rounded-md shadow`}>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-gray-400 text-sm">+12.2% last week</p>
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

      {/* request Table */}
      <div className="bg-darkfg rounded-md shadow overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead className={`border-b-[1px] border-lightgray ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkufg'}`}>
            <tr>
              {["Username", "Email", "Phone", "Country", "State", "City", "StoreName", "Seller-Status", "Payment", "Verified", "Action"].map(
                (heading, index) => (
                  <th key={index} className="px-4 py-2 text-md font-semibold ">
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data && data.requests ? (
              data.requests.map((request) => {
                const { _id, username, email, phone, country, state, city, storeName, sellerStatus, payment, verified } = request
                return (
                  <>
                    <tr
                      key={_id}
                      className={`border-b py-2 relative ${mode === "dark" ? 'bg-darkfg hover:bg-darkbg text-lightgray' : 'text-darkufg hover:bg-lightgray bg-lightfg'}`}
                    >
                      <td className="px-4 py-2">{username}</td>
                      <td className="px-4 py-2">{email}</td>
                      <td className="px-4 py-2">{phone}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-sm `}
                        >
                          {country}
                        </span>
                      </td>
                      <td className="px-4 py-2">{state}</td>
                      <td className="px-4 py-2">{city}</td>
                      <td className="px-4 py-2">{storeName}</td>
                      <td className="px-4 py-2">{sellerStatus}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 ${payment === "approved" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} rounded-full text-sm `}
                        >
                          {payment}
                        </span>
                      </td>
                      <td className={`px-4 py-2`}>
                        <span
                          className={`px-3 py-1 ${verified ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"} rounded-full text-sm `}
                        >
                          {verified ? "Verified" : "Unverified"}
                        </span>
                      </td>

                      <td className="px-4 py-2">
                        <button onClick={() => setOpen(!open)} className="text-5xl flex items-center gap-1 cursor-pointer justify-center text-center">
                          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                        </button>
                      </td>
                      {open && (
                        <div className={`fixed w-[300px] py-8 px-4 rounded-md shadow-xl flex flex-col ${mode === "dark" ? 'bg-darkufg text-white' : 'bg-lightbg text-darkufg'} gap-4 left-[50%] -translate-x-1/2 -translate-y-1/2 top-[50%] z-10 `}>
                          <span onClick={() => setOpen(!open)} className="absolute top-1 cursor-pointer text-xl right-5">x</span>

                          <span onClick={() => {
                            if (_id) {
                              handleApprovePayment(_id);
                            } else {
                              console.error("Error: _id is null or undefined");
                            }
                          }} className={`px-4 cursor-pointer  py-2 ${mode === "dark" ? 'bg-darkfg hover:bg-darkbg text-white' : 'bg-lightbg hover:bg-lightbg text-darkufg'} rounded-md`}>Approve payment</span>

                          <span onClick={() => {
                            if (_id) {
                              handleApproveRequest(_id);
                            } else {
                              console.error("Error: _id is null or undefined");
                            }
                          }} className={`px-4 cursor-pointer  py-2 ${mode === "dark" ? 'bg-darkfg hover:bg-darkbg text-white' : 'bg-lightbg hover:bg-lightbg text-darkufg'} rounded-md`}>{sellerStatus === "pending" ? 'Aprrove Request' : 'Decline Request'}</span>

<span onClick={() => {
                            if (_id) {
                              handleApproveSeller(_id);
                            } else {
                              console.error("Error: _id is null or undefined");
                            }
                          }} className={`px-4 cursor-pointer  py-2 ${mode === "dark" ? 'bg-darkfg hover:bg-darkbg text-white' : 'bg-lightbg hover:bg-lightbg text-darkufg'} rounded-md`}>Approve Seller</span>

                          <span
                            onClick={() => {
                              if (_id) {
                                handleDeleteRequest(_id);
                              } else {
                                console.error("Error: _id is null or undefined");
                              }
                            }}
                            className={`px-4 cursor-pointer  py-2 ${mode === "dark" ? 'bg-darkfg hover:bg-darkbg text-white' : 'bg-lightbg hover:bg-lightbg text-darkufg'} rounded-md`}>Delete</span>
                        </div>
                      )}
                    </tr>

                  </>
                )
              })
            ) : (
              <div className="flex w-full items-center justify-center p-4">
                <h3 className="text-center">No Request Found </h3>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SellersRequest;

