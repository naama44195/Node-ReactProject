const mongoose = require("mongoose")
const Schema = mongoose.Schema
const shopSchema = new Schema({
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
address: {
type: String,
},
phone: {
type: String,
},
roles:{
type:String,
enum:['Shop', 'Deliver','Admin'],
default:"Shop",
}

},{timestamps:true})
module.exports = mongoose.model("Shop", shopSchema)