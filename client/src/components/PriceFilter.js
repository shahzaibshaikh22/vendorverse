import React, { useState } from 'react';

const PriceFilter = ({ items }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [filteredItems, setFilteredItems] = useState(items);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    filterItems(e.target.value, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    filterItems(minPrice, e.target.value);
  };

  const filterItems = (min, max) => {
    const filtered = items.filter(item => item.price >= min && item.price <= max);
    setFilteredItems(filtered);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Min Price: ${minPrice}</label>
        <input
          type="range"
          min="0"
          max="50"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Max Price: ${maxPrice}</label>
        <input
          type="range"
          min="0"
          max="50"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Filtered Products</h2>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} className="mb-2">
             ${item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PriceFilter
