import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SingleCartItem from './SingleCartItem';

const Carting = ({cart}) => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: 'Product A',
  //     price: 19.99,
  //     quantity: 1,
  //     image: 'https://via.placeholder.com/150',
  //   },
  //   {
  //     id: 2,
  //     name: 'Product B',
  //     price: 24.99,
  //     quantity: 2,
  //     image: 'https://via.placeholder.com/150',
  //   },
  // ]);
  const { mode } = useSelector((state) => state.auth)

  // const increaseQuantity = (itemId) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const decreaseQuantity = (itemId) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === itemId
  //         ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
  //         : item
  //     )
  //   );
  // };

  // const handleQuantityChange = (itemId, newQuantity) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
  //     )
  //   );
  // };

  // const handleRemoveItem = (itemId) => {
  //   setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  // };

  // const totalPrice = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );


  return (
    <div className="w-full">
        {cart.map((item) => (
         <SingleCartItem key={item._id} item={item}/>
        ))}
      {/* <div className="mt-4 flex justify-end">
        <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
      </div> */}
    </div>
  );
};

export default Carting;