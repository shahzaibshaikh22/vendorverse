import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AdminLayout from './adminlayout/AdminLayout'
import UserLayout from './userlayout/UserLayout'
import MainHome from "./pages/MainHome"
import Profile from "./pages/Profile"
import CartProtected from "./CartProtected"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Verify from "./pages/Verify"
import BecomeSeller  from "./pages/BecomeSeller"
import SingleProduct   from "./pages/SingleProduct"
import AllProducts from './pages/AllProducts';
import FilterCategory from './pages/FilterCategory';
import Emptycart from './pages/Emptycart';
import UserDashboard from "./dashboard/UserDashboard"
import SellerWaiting from "./pages/SellerWaiting"
import "./App.css"

// admin routes impotrs
import AdminDashboard from './dashboard/AdminDashboard';
import AllUsers from './adminlayout/adminPages/AllUsers'
import Home from './adminlayout/adminPages/Home'
import UserDashboardLayout from './userlayout/UserDashboardLayout'
import DashboardOverview from './userlayout/DashboardOverview'
import OrderTrack from './userlayout/OrderTrack'
import OrderHistory from './userlayout/OrderHistory'
import UserOrderHistory from './userlayout/UserOrderHistory'
import Checkout from './userlayout/Checkout'
import AddProduct from './adminlayout/adminPages/AddProduct'
import ManageUsers from './adminlayout/adminPages/ManageUsers'
import SellersRequest from './adminlayout/adminPages/SellersRequest'
import Chat from './pages/Chat'
import Chats from './userlayout/Chats'
import TestChat from "./components/TestChat"

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      {/* user layout and pages */}
      <Route   path="/"       element={<UserLayout/>}>
          <Route  path="" index  element={<MainHome/>} />
          <Route  path="profile" element={<Profile/>} />
          {/* <Route  path="dashboard" element={<UserDashboard/>} /> */}
          <Route path="register" element={<Register />} />
          <Route path="verify" element={<Verify />} />
          <Route path="login" element={<Login />} />
          <Route path="product/:_id" element={<SingleProduct />} />
          <Route path="becomeseller" element={<BecomeSeller />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="emptycart" element={<Emptycart />} />
          <Route path="waiting" element={<SellerWaiting />} />
          <Route path="filter/:c" element={<FilterCategory />} />
          {/* <Route path="chat/:sellerId" element={<Chat />} /> */}
          <Route element={<CartProtected />}>
          <Route element={<Wishlist />} path="wishlist" exact />
          <Route element={<Cart />} path="cart" exact />
        </Route>
      </Route>

      {/* user dashboard routes */}
      <Route path="user" element={<UserDashboardLayout />}>
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="dashboard" index element={<UserDashboard />} />
            <Route path="settings" element={<DashboardOverview />} />
            <Route path="orders" element={<OrderTrack />} />
            <Route path="history" element={<UserOrderHistory />} />
            <Route path="help" element={<DashboardOverview />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="mychats" element={<TestChat />} />
          </Route>
      {/* user dashboard routes */}

      {/* admin routes */}
      <Route    path="/admin"  element={<AdminLayout/>}>
        {/* <Route  path="" index  element={<Home/>} /> */}
        <Route  path="users"  element={<ManageUsers/>} />
        <Route  path="dashboard"  element={<AdminDashboard/>} />
        <Route  path="newproduct"  element={<AddProduct/>} />
        <Route  path="requests"  element={<SellersRequest/>} />
     </Route>
      {/* admin routes */}

   </Routes>
   </BrowserRouter>
  )
}

export default App
