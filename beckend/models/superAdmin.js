const mongoose = require("mongoose")

const userScheme =  mongoose.Schema({
   username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'superadmin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const SuperAdmin =  mongoose.model("SuperAdmin", userScheme);
module.exports = SuperAdmin;