const express = require("express");
const { getAllUsers,getUser,deleteUser, getAllRequests, approveRequest, approvePayment, approveSeller } = require("../controllers/adminController");
const authenticateToken = require("../middleware/authenticte");
const adminAuthenticate = require("../middleware/adminMiddleware");
const route = express.Router();


// get all users route
route.get("/allusers", authenticateToken, adminAuthenticate, getAllUsers)

// get specific user with their id
route.get("/user/:id", authenticateToken, adminAuthenticate, getUser)

// delete single user
route.put("/user/:id", authenticateToken, adminAuthenticate, deleteUser)


// get all requests
route.get("/requests", authenticateToken, adminAuthenticate, getAllRequests)


// approve seller request route
route.post("/approve/request", authenticateToken, adminAuthenticate, approveRequest)


// approve seller Payment route
route.post("/approve/payment", authenticateToken, adminAuthenticate, approvePayment)


// approve seller as a seller
route.post("/approve/seller", authenticateToken, adminAuthenticate, approveSeller)


module.exports = route;