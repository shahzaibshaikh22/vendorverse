const Products = require("../models/products")
const USERMODEL = require("../models/userModel")

const newProduct = async (req, res) => {
  try {
    const ownerId = await USERMODEL.findById(req.user._id)
    const { name, description, price,location, isSale, couponCode,discountPercentage, stock, category, subCategory, featured, storeName, rating, numReviews } = req.body;
    const newProduct = new Products({
      sellerId:ownerId._id,
      name,
      description,
      price,
      stock,
      category,
      location,
      subCategory,
      featured,
      storeName,
      rating,
      numReviews,
      isSale,
      couponCode,
      discountPercentage
    });
    await newProduct.save()
    return res.status(200).json({ msg: "Product is listed" })
  } catch (error) {
    return res.status(400).json({ err: error.message })
  }
}

// get all products to display
const getAllProducts = async (req,res) =>{
  try {
    const products = await Products.find()
    if(!products){
      return res.json({err:"No Products Found"})
    }
    return res.json(products)
  } catch (error) {
    return res.json({err:error.message})
  }
}

// get single product
const getSingleProduct = async (req, res) => {
  try {
      const _id = req.params.id
      const  product = await Products.findById(_id)
      if (!product) {
          return res.status(404).json({ err: 'Product Not Found' });
      }
     return res.status(200).json(product);
  } catch (error) {
      return res.json({err:error.message})
  }
}

// check for coupon code
const checkCoupon = async (req, res) => {
  const { productId, couponCode } = req.body;

  try {
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let finalPrice = product.price;

    if (product.couponCode && product.couponCode === couponCode) {
      const discount = (product.price * product.discountPercentage) / 100;
      finalPrice = product.price - discount;
    } else {
      return res.status(400).json({ message: 'Invalid coupon code' });
    }

    res.status(200).json({ originalPrice: product.price, finalPrice });
  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
// check for coupon code


module.exports = {
  newProduct,
  getAllProducts,
  getSingleProduct,
  checkCoupon
}