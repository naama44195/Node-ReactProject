// const express = require("express")
// const router = express.Router()
// const authController = require("../Controllers/authController")
// const verifyJWTAdmain = require("../middleware/verifyJWTadmin")
// router.post("/login", authController.login)
// router.post("/register", authController.register)

// module.exports = router

const express = require("express")
const router = express.Router()
const authController = require("../Controllers/authController")
router.post("/login", authController.login)
router.post("/registerShop", authController.registerShop)
router.post("/registerDeliver", authController.registerDeliver)
router.post("/registerAdmin", authController.registerAdmin)

module.exports = router