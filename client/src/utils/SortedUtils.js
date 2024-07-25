// filterUtils.js
 const filterByDate = (products, filterOption) => {
  let filteredProducts = [...products];

  if (filterOption === 'newest') {
    filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (filterOption === 'oldest') {
    filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  else if (filterOption === 'alphabetically') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filteredProducts;
};

export default filterByDate;