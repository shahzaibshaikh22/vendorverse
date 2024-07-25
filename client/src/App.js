import React from 'react';
import "./App.css";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Home from "./pages/Home"
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import CartProtected from './CartProtected';
import Emptycart from './pages/Emptycart';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import MainHome from './pages/MainHome';
import SingleProduct from './pages/SingleProduct';
import BecomeSeller from './pages/BecomeSeller';
import UserAdmin from './dashboardMiddlewares/UserAdmin';
import UserDashboard from './dashboard/UserDashboard';
import UnauthorizedAdmin from './ErrorPages/UnauthorizedAdmin';
import { useSelector } from 'react-redux';
// import SuperAdmin from './dashboardMiddlewares/SuperAdmin';
import AdminDashboard from './dashboard/AdminDashboard';
import SellerDashboard from './dashboard/SellerDashboard';
import SellerWaiting from './pages/SellerWaiting';
import FilterCategory from './pages/FilterCategory';
import AllProducts from './pages/AllProducts';
import NewProduct from './DashboardComponents/NewProduct';
import Users from './DashboardComponents/Users';
import MainPanel from './DashboardComponents/MainPanel';
// import Signup from './screens/Signup';
// import VBar from './components/VBar';


const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
    <Router>
    <Navbar/>
    {/* <VBar/> */}
    <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route element={<Profile/>} path="/profile" exact />
          <Route element={<Home/>} path="/home" exact />
        </Route>
        <Route element={<CartProtected/>}>
          <Route element={<Cart/>} path="/cart" exact />
        <Route  element={<Wishlist/>}  path="/wishlist" exact/>  
        </Route>
        <Route element={<UserAdmin/>} >
          {user && user.role === "useradmin" && 
            <Route  element={<UserDashboard/>} path="/dashboard" > 
              <Route path="newproduct" element={<NewProduct />} />
            </Route>}
          {user && user.role === "superadmin" &&
           <Route element={<AdminDashboard/>} path="/dashboard">
               <Route path="newproduct" element={<NewProduct />} />
               <Route index path="" element={<MainPanel />} />
               <Route path="userslist" element={<Users />} />
            </Route>}
          {user && user.role === "selleradmin" && <Route element={<SellerDashboard/>} path="/dashboard" exact />}
        </Route>
        <Route path="/register" element={<Register/>}/>  
        <Route path="/verify" element={<Verify/>}/>  
        <Route path="/login" element={<Login/>}/>
        <Route path="/product/:_id" element={<SingleProduct/>}/>
        <Route path="/becomeseller" element={<BecomeSeller/>}/>

        <Route path="/" element={<MainHome/>}/>  
        <Route path="/waiting" element={<SellerWaiting/>}/>  
        <Route path="/filter/:category" element={<FilterCategory/>}/>  
        <Route path="/products" element={<AllProducts/>}/>  
        <Route element={<Emptycart/>} path="/emptycart" />
        <Route element={<UnauthorizedAdmin/>} path="*" />
      </Routes>
    </Router>
    </div>
  )
}

export default App
