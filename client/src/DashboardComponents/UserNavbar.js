import { Key } from "lucide-react";
import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaShoppingCart, FaChevronRight, FaHeart, FaShoppingBag } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation()

  const links = [
    { path: "/user/dashboard", label: "Dashboard", icon:<FaHome/> },
    { path: "/profile", label: "Profile", icon:<FaUser/>  },
    { path: "/user/settings", label: "Settings", icon:<FaCog/>  },
    { path: "/cart", label: "Cart", icon:<FaShoppingCart/> },
    { path: "/wishlist", label: "Wishlist",icon:<FaHeart/>  },
    { path: "/user/orders", label: "Orders",icon:<FaShoppingBag/>  },
  ];

const { mode } = useSelector(((state)=>state.auth))
  return (
    <div className="flex " > 
      {/* Sidebar */}
      <div className={`drop-shadow-md pt-20 relative ${mode === "dark" ? 'bg-darkufg text-white' : 'bg-lightgray text-red-200'} h-screen ${
          isOpen ? "w-64" : "w-16"
        } transition-width duration-300 flex flex-col`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`${mode === "dark" ? 'bg-darkufg hover:bg-darkbg text-white' : 'bg-lightfg hover:bg-lightbg text-darkbg'} h-[80px] absolute -right-[24px] top-[40%]  m-2 `}
        >
         <FaChevronRight/>
        </button>

        {/* Menu Items */}
        <div className="flex flex-col px-2 mt-4 gap-6">
          {
            links.map((link)=>{
              const { path, label,icon } = link
              return(
                
                <Link 
                 Key={path}
                 to={path}
                 className={`${ location.pathname === path
                  ? "bg-emerald-500 text-white" 
                  : "bg-transparent"} rounded-md flex items-center space-x-4 hover:pl-6 transition-all duration-100  py-2 px-4 ${mode === "dark"? 'hover:bg-darkufg text-lightfg hover:text-lightfg' : 'hover:bg-lightbg text-darkfg hover:text-darkfg'}`}>
                <div>{icon}</div>
                {isOpen && <span className="text-sm">{label}</span>}
              </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
