const mongoose = require("mongoose")

// Create a schema for images
const imageSchema = new mongoose.Schema({
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
    email:{
        type:String,
        ref:"USERMODEL"
    }
  });
  const Avatar = mongoose.model('Avatar', imageSchema);

  module.exports = Avatar;