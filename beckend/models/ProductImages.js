const mongoose = require("mongoose")

// Create a schema for images
const productImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
  });
  const ProducImages = mongoose.model('ProducImage', productImageSchema);

  module.exports = ProducImages;