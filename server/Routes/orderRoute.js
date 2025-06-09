// const express=require('express')
// const router=express.Router()

// const orderController = require("../Controllers/orderController")
// const verifyJWTShop = require('../middleware/verifyJWTShop')

// router.post("/",verifyJWTShop,orderController.createNewOrder)
// router.get("/",verifyJWTShop,orderController.getAllOrders)
// router.put("/",verifyJWTShop,orderController.updateOrder)
// router.delete("/:id",verifyJWTShop,orderController.deleteOrder)

// router.get("/city/:city",verifyJWTShop, orderController.getOrdersByCity)
// router.get("/:id",verifyJWTShop,orderController.getOrderById)

// module.exports=router

const express=require('express')
const router=express.Router()

const orderController = require("../Controllers/orderController")
const verifyJWTShop = require('../middleware/verifyJWTShop')

router.post("/",verifyJWTShop,orderController.createNewOrder)
router.get("/",verifyJWTShop,orderController.getAllOrders)
router.put("/",verifyJWTShop,orderController.updateOrder)
router.delete("/:id",verifyJWTShop,orderController.deleteOrder)
router.get("/shopname/:shopname",verifyJWTShop, orderController.getOrdersByShop)

router.get("/city/:city",verifyJWTShop, orderController.getOrdersByCity)
router.get("/:id",verifyJWTShop,orderController.getOrderById)

module.exports=router