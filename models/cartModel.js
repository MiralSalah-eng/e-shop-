const mongoose = require('mongoose')
const uri = 'mongodb+srv://miralsalah:miral123@online-shop.e3065ly.mongodb.net/online-shop?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
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
    userId :{
        type : String ,
    },
    productId :{
        type : String ,
    },
    timestamp : {
        type: Number
    }
})

const CartItem = mongoose.model('cart',cartSchema)

exports.addItem = data => {
    const {productId , amount} = data
return new Promise((resolve,reject) => {
    mongoose.connect(uri).then( () => {
        
        return CartItem.findOneAndUpdate({productId}, //filter
        {$inc: {amount: amount}, timestamp:Date.now()}, //Update amount and time
        {sort:{timestamp:1}})
        .then((item)=>{
        if(item) {
            resolve(item)
             mongoose.disconnect()
        }
        else if (!item) {
            let item = new CartItem (data)
            return item.save()
        .then((item)=>{
            resolve(item)
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

exports.getItemsByuserId = (userId) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(uri).then(() => { 
            let items =  CartItem.find({userId},{},{sort:{timestamp:1}})
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


exports.postSave = (id,newData) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(uri).then(() => {
          return CartItem.findByIdAndUpdate({_id:id},newData,{ runValidators: true })
        }).then((items)=>{
            mongoose.disconnect()
            resolve(items)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.deleteOne = (id) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(uri).then(() => {
          return  CartItem.findByIdAndDelete(id)
        }).then((items)=>{
            mongoose.disconnect()
            resolve(items)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
    }
exports.deleteAll = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(uri).then(() => {
          return CartItem.deleteMany({})
        }).then((items)=>{
            mongoose.disconnect()
            resolve(items)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
    }
