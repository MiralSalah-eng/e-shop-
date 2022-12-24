const mongoose = require('mongoose')
const uri = 'mongodb+srv://miralsalah:miral123@online-shop.e3065ly.mongodb.net/online-shop?retryWrites=true&w=majority'

const orderSchema = mongoose.Schema({
    name:{
        type : String,
    },
    price :{
        type : Number ,
    },
    amount :{
        type : Number ,
        required: [true,'Please Enter an Amount'], 
        min: [1, 'Must be at least 1 Item In Cart'],
        
    },
    productId : {
        type: mongoose.ObjectId,
        required:true
    },
    address : {
        type:String
    },
    userId : {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    status :{
        type:String,
        default : 'Pending'
    }
},{timestamps:true})

const OrderItem = mongoose.model('order',orderSchema)

 const addOrder = data => {
    const {productId} = data;
return new Promise((resolve,reject) => {
    mongoose.connect(uri).then(async () => {
        return await OrderItem.findOneAndUpdate({productId},{$set :{address : data.address}}).then(async (foundProduct)=>{
            if (foundProduct) {
                resolve(foundProduct)
                mongoose.disconnect()
            }
            else {
                let order = new OrderItem (data)
                return order.save()
            .then((order)=>{
                resolve(order)
                mongoose.disconnect()
            }).catch((err)=>{
                reject(err)
                mongoose.disconnect()
            })      
            }
        })
       })
  
})
}

 const getOrders = (userId) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(uri).then(() => { 
            let items =  OrderItem.find({userId})
            return items
        }).then(items =>{
            mongoose.disconnect();
            resolve(items)
        }).catch(err =>{
            mongoose.disconnect();
            reject(err)
        })
    })

}

 const cancelOne = (orderId) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(uri).then(() => {
          return OrderItem.deleteOne({_id:orderId})
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
    }

 const deleteAll = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(uri).then(() => {
          return OrderItem.deleteMany({})
        }).then((items)=>{
            mongoose.disconnect()
            resolve(items)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
    }

    module.exports={OrderItem, deleteAll,getOrders,addOrder,cancelOne}