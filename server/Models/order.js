const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderSchema = new Schema({
ordername:{
type: String,
required: true,
unique: true,
lowercase: true,
trim:true
},
status:{
type:String,
required:true,
enum:["Delivered","Awaiting delivery","In progress"],
default:"Awaiting delivery"
},
shopname:{
type:String,
required:true,
},
delivername:{
    type:String,
required:false,
},
address: {
    city: { type: String, required: true },
    street: { type: String, required: true }
},
description: {
type: String,
lowercase: true,
trim:true
},
imageUrl: {
type: String,
trim: true
}
},{timestamps:true})
module.exports = mongoose.model("Order", orderSchema)