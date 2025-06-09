const express=require('express')
const router=express.Router()

const deliverController = require("../Controllers/deliverController")
const verifyJWTD=require("../middleware/verifyJWTDeliver")
const verifyJWTAdmin=require("../middleware/verifyJWTadmin")



router.post("/",verifyJWTAdmin,deliverController.createNewDeliver)
router.get("/",verifyJWTAdmin,deliverController.getAllDelivers),
router.delete("/:id",verifyJWTAdmin,deliverController.deleteDeliver)
router.get("/:id",verifyJWTD,deliverController.getDeliverById)
router.put("/",verifyJWTD,deliverController.updateDeliver)


module.exports=router