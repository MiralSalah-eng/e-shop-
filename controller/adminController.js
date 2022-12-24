const {Product} = require('../models/products.model')
const mongoose = require('mongoose')
const { OrderItem } = require('../models/orderModel')
const { User } = require('../models/User')
const uri = 'mongodb+srv://miralsalah:miral123@online-shop.e3065ly.mongodb.net/online-shop?retryWrites=true&w=majority'



module.exports.addProduct =( async (req,res,next)=>{
    const image = req.file.filename
    const {title,price,category} = req.body
    const data = {title,price,category,image}

    await mongoose.connect(uri).then(async()=>{
        let product = await Product.create(data)
        return product.save()   
    }).then(()=>{
       res.status(201).redirect('/admin/add')
    })

 
})

module.exports.manageOrder =( async (req,res,next)=>{
    
    await mongoose.connect(uri).then(async()=>{
    return await OrderItem.find()
      }).then((orders)=>{
        res.status(200).render('adminManageOrder',{orders:orders,userName:null,pageTitle:"Manage Odrers"})
    })

})


module.exports.searchEmail =( async (req,res,next)=>{
    const email = req.body.search
    await mongoose.connect(uri).then(async()=>{
    return await OrderItem.find({email:email})
      }).then((orders)=>{
        res.status(200).render('adminManageOrder',{orders:orders,userName:null,pageTitle:"Manage Odrers"})
    })
})


module.exports.addProductPage =((req,res)=>{
    res.status(200).render('adminAddProduct',{pageTitle:"Add Products"})
})


module.exports.chanageStatus =( async (req,res,next)=>{
    
    await mongoose.connect(uri).then(async()=>{
    return await OrderItem.findByIdAndUpdate({_id:req.body.orderId},{$set :{status :"Shipped"}})
      }).then((orders)=>{
        res.status(200).redirect('/admin/orders')
    })

 
})
module.exports.deleteOrder =( async (req,res,next)=>{
    
    await mongoose.connect(uri).then(async()=>{
    return await OrderItem.findByIdAndDelete({_id:req.body.orderId})
      }).then(()=>{
        res.status(200).redirect('/admin/orders')
    })

 
})
