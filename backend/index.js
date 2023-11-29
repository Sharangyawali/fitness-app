const express=require('express')
const cors=require('cors')
const otpsend=require('./sendotp/otpsend')
const otpGenerator = require('otp-generator')
const user=require('./db/user')
require('./db/dbconnect')
const app=express()
app.use(cors())
app.use(express.json())

const OTPgenerate=()=>{
 const otp=otpGenerator.generate(4,{
    upperCaseAlphabets:false,
    specialChars:false,
    lowerCaseAlphabets:false
})
return otp
}

app.post('/register',async(req,res)=>{
    let repeat= await user.findOne({"phonenumber":req.body.phonenumber}||{"email":req.body.email})
    if(repeat){
        res.status(400)
        .json({success:false,error:"Account with the information already exists"})
    }
    else{
    let data=new user({
        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        age:req.body.age,
        password:req.body.password,
        otp:OTPgenerate(),
    })
    let result=await data.save()
    result=result.toObject()
    delete result.password
    res.status(200).json({success:true,result:result})
    // sending OTP method
    otpsend(result.phonenumber,result.otp)
   }
})

app.post('/login',async(req,res)=>{
    if(req.body.email&&req.body.password){
   let data=await user.findOne(req.body).select("-password")
    if(data&&data.isUserVerified===false)
        return res.status(400)
         .json({success:false,error:"Please verify your phone number first!"})
    if(data && data.isUserVerified===true){
        res.status(200)
        .json({success:true,result:data})
    }
    else{
        res.status(400).json({success:false,error:"Enter Valid Information"})
    }
}
else{
    res.status(400).json({success:false,error:"Enter all informations"})

}
})

app.post('/otpverify',async(req,res)=>{
    let data=await user.findOne({_id:req.query.id})
    if (data){
        console.log(data)
        if(req.body.otp===data.otp){
           let result=await user.updateOne({_id:req.query.id},{$set:{isUserVerified:true,otp:''}})
            res.status(200).json({success:true,result:"Successfully verified"})
        }
        else{
            res.status(400).json({success:false,result:"Incorrect OTP"})
        }
    }
})

app.post('/resendotp',async(req,res)=>{
    let updateinfo=  await user.updateOne({_id:req.query.id},{$set:{otp:OTPgenerate()}})
    let data=await user.findOne({_id:req.query.id})
    console.log(updateinfo)
    // Sending OTP method
    otpsend(data.phonenumber,data.otp)
    res.status(200).json({success:true,result:"OTP sent"})

})

app.post('/forgetpassword',async(req,res)=>{
    if(req.body.phonenumber){
        let data=await user.findOne(req.body)
        if(data){
            let result= await user.updateOne({phonenumber:req.body.phonenumber},{$set:{otp:OTPgenerate()}})
            let data2=await user.findOne(req.body)
            otpsend(data2.phonenumber,data2.otp)
            res.status(200).json({success:true,result:data2})
        }
        else{
            return res.status(400)
         .json({success:false,error:"You do not have an account with this number"})
        }
    }
    })

    app.post('/resetpassword',async(req,res)=>{
        if(req.body.password){
        let result=await user.findOne({_id:req.query.id})
        if(result){
        try {
            let data=  await user.updateOne({_id:req.query.id},{$set:{password:req.body.password,otp:''}})
          res.status(200).json({success:true,result:data})
          } catch (error) {
            return res.status(400)
            .json({success:false,error:"Internal Error"})
          }
        }
        else{
            return res.status(400)
            .json({success:false,error:"Error in verification"})
        }
    }
    })

app.listen(4001,()=>{
    console.log('Listening at port 4001')
})