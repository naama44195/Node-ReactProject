
const express=require("express")
const cors =require("cors")
require("dotenv").config()
const corsOption =require("./config/corsOptions")
const connectDB= require("./config/dbconn")

connectDB()

const mongoose=require("mongoose")
const PORT=process.env.PORT||1000
const app=express()

app.use(cors(corsOption))
app.use(express.json())

app.use("/api/auth", require("./Routes/authRoute"))
app.use("/api/deliver", require("./Routes/deliverRoute"))
app.use("/api/shop", require("./Routes/shopRoute"))
app.use("/api/order", require("./Routes/orderRoute"))
app.use("/api/admin", require("./Routes/adminRoute"))

mongoose.connection.once('open',()=>{
    console.log("connected to MongoDB")
    app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)})
})

mongoose.connection.on('error',err=>{
    console.log(err)
})
