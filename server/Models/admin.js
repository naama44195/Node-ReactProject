const mongoose = require("mongoose")
const Schema = mongoose.Schema
const AdminSchema = new Schema({
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

roles:{
type:String,
enum:['Shop', 'Deliver','Admin'],
default:"Admin",
},

},{timestamps:true})
module.exports = mongoose.model("Admin", AdminSchema)