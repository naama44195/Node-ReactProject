const express=require('express')
const router=express.Router()

const shopController = require("../Controllers/shopController")
const Admin=require("../middleware/verifyJWTadmin")

router.post("/",Admin,shopController.createNewShop)
router.get("/",Admin,shopController.getAllShop)
router.put("/",Admin,shopController.updateShop)
router.delete("/:id",Admin,shopController.deleteShop)
router.get("/:id",Admin,shopController.getShopById)


module.exports=router