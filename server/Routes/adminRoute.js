const express=require('express')
const router=express.Router()

const adminController = require("../Controllers/adminController")
// const verifyJWT= require("../middleware/verifyJWTShop")
// const Admin=require("../middleware/verifyJWTadmin")

router.post("/",adminController.createNewAdmin)



module.exports=router