const mongoose=require('mongoose')
const usersch= new mongoose.Schema({
    name:String,
    email:String,
    phonenumber:String,
    password:String,
    age:Number,
    isUserVerified:{type:Boolean,default:false},
    otp:String,
})
const usermodel=mongoose.model('user',usersch)
module.exports=usermodel