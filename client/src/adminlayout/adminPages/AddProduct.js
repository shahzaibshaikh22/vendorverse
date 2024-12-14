import React,{ useState } from "react";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";
import { useAddProductMutation } from "../../redux/features/apiSlices/productApiSlice";

const AddProduct = () => {
  const { mode } = useSelector((state)=>state.auth)
  const [addingProduct] = useAddProductMutation()
    // Single state object for all form inputs
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      discountPercentage: "",
      category: "",
      subCategory: "",
      couponCode: "",
      featured: false,
      isSale: false,
      storeName: "",
      location: "",
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
  
    const handleImageChange = (e) => {
      setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();  
       // Create FormData instance and append the required fields
  const formDataObj = new FormData();
  // Append all formData fields to the FormData object
  Object.keys(formData).forEach((key) => {
    formDataObj.append(key, formData[key]); // Append each field
  });

  // Append the images (if any)
  Array.from(images).forEach((image) => {
    formDataObj.append("images", image); // 'images' is the field name used in the backend
  });
      
      try {
        const response = await addingProduct(formDataObj)
        alert(response.data.msg);
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      }
    };
  
  return (
      <section className={`w-full h-auto px-4 ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
    <TopBar/>
      <form onSubmit={handleSubmit} className={`w-full mt-4 mx-auto ${mode === "dark" ? 'bg-darkfg text-white' : 'bg-lightfg text-darkufg'} shadow rounded-lg p-8`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Product</h2>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Save Draft
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Add Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* General Information */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">General Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block ">Name Product</label>
                <input
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  type="text"
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block ">Description Product</label>
                <textarea
                value={formData.description}
                name="description"
                onChange={handleChange}
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                  rows="4"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              {/* <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block  mb-2">Size</label>
                  <div className="flex gap-2">
                    {["XS", "S", "M", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-2 border rounded bg-gray-100 hover:bg-green-200"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block  mb-2">Gender</label>
                  <div className="flex gap-2">
                    {["Men", "Woman", "Unisex"].map((gender) => (
                      <button
                        key={gender}
                        className="px-3 py-2 border rounded bg-gray-100 hover:bg-green-200"
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* Upload Image */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Upload Img</h3>
            <div className={`border rounded-lg p-4 ${mode === "dark" ? 'bg-darkbg text-lightgray' : 'bg-lightbg text-darkufg'}`}>
              <label id="images" className={`w-full h-48 cursor-pointer flex items-center justify-center rounded ${mode === "dark" ? 'bg-darkfg text-lightgray' : 'bg-lightbg text-darkufg'}`}>
                <p>Upload image</p>
              <input className="hidden" multiple onChange={handleImageChange}  name="images" htmlFor="images" type="file" />
              </label>
            </div>
          </div>
          {/* Pricing and Stock */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">Pricing And Stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  name="price"
                  onChange={handleChange}
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                  placeholder="$47.55"
                />
              </div>
              <div>
                <label className="block">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                name="stock"
                onChange={handleChange}
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                  placeholder="77"
                />
              </div>
              <div>
                <label className="block">Discount</label>
                <input
                  type="number"
                  value={formData.discountPercentage}
                name="discountPercentage"
                onChange={handleChange}
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                  placeholder="10%"
                />
              </div>
              <div>
                <label className="block">Store Name</label>
                <input
                value={formData.storeName}
                name="storeName"
                onChange={handleChange}
                  type="text"
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                  placeholder="Chinese New Year Discount"
                />
              </div>
            </div>
          </div>
          {/* Category */}
          <div>
            <h3 className="text-lg grid grid-cols-2  font-semibold mb-4">Category</h3>
           <div className="w-full grid grid-cols-2 gap-4">
           <div>
              <label className="block">Product Category</label>
              <input
              value={formData.category}
              name="category"
              onChange={handleChange}
                type="text"
                className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                placeholder="Jacket"
              />
              {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Category
              </button> */}
            </div>
            <div>
              <label className="block">Sub Category</label>
              <input
                type="text"
                value={formData.subCategory}
                name="subCategory"
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                placeholder="Men"
              />
              {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Category
              </button> */}
            </div>
           </div>
          </div>
        </div>
        <div className="w-full max-w-sm">
  <h3 className="text-lg grid grid-cols-2 font-semibold my-4">Featured & Sale</h3>
  <div className="w-full grid grid-cols-3 gap-4">
    <div>
      <div className="mt-4">
        <input 
          type="checkbox" 
          id="featured" 
          value={formData.featured}
                name="featured"
                onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="featured">Featured</label>
      </div>
    </div>
    <div>
      <div className="mt-4">
        <input 
          type="checkbox" 
          id="sale" 
          value={formData.isSale}
                name="isSale"
                onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="sale">Sale</label>
      </div>
    </div>
    <div>
                <label className="block">Location</label>
                <input
                value={formData.location}
                name="location"
                onChange={handleChange}
                  type="text"
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${mode === "dark" ? 'bg-darkufg text-lightgray' : 'bg-lightbg text-darkufg'}`}
                  placeholder="Chinese New Year Discount"
                />
              </div>
  </div>
</div>

      </form>
    </section>
  );
};

export default AddProduct;
