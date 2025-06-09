const mongoose = require("mongoose")
const Schema = mongoose.Schema
const deliverSchema = new Schema({
username:{
type: String,
required: true,
unique: true,
lowercase: true,
trim:true
},
password:{
type:String,
required:true
},
name:{
type:String,
required:true,
},
email: {
type: String,
lowercase: true,
trim:true
},
phone: {
type: String,
},
area: {
type: String,
},
city: {
type: String,
},
roles:{
type:String,
enum:['Deliver', 'Shop','Admin'],
default:"Deliver",
},
active: {
type: Boolean,
default: true,
},
currentOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  }
},{timestamps:true})
module.exports = mongoose.model("Deliver", deliverSchema)