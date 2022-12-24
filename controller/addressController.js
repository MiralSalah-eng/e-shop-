const mongoose  = require('mongoose');
const {User} = require('../models/User')
const uri = 'mongodb+srv://miralsalah:miral123@online-shop.e3065ly.mongodb.net/online-shop?retryWrites=true&w=majority'


exports.postToAddress = (req,res,next) =>{
const {userId,productId,name,price,amount} = req.body; //from cart
let address;
res.status(200).render('address',{data: {userId,productId,name,price,amount,address}, pageTitle:'Address'})
}


exports.setUserAddres = (req,res,next) =>{
const {userId,productId,name,price,amount,address} = req.body;
return new Promise ((resolve,reject)=> {
  mongoose.connect(uri).then(()=>{
   return User.findByIdAndUpdate({_id:userId},{$set:{"address": address}}, {new: true})
  }).then((result)=>{
    const address = result.address
   // console.log(address);
    res.status(201).render('address',{data: {userId,productId,name,price,amount,address}, pageTitle:'Address'})
}).catch(err =>{
    console.log(err);
  })
})
}


exports.getAddress = (req,res,next) => {
    const {userId,productId,name,price,amount} = req.body;
    const address = "null"

    res.status(200).render('address',{data: {userId,productId,name,price,amount,address}, pageTitle:'Address'})
}

 