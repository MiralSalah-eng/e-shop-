const mongoose = require('mongoose');
const Schema =  mongoose.Schema({
    
        title: String,
        price: Number,
        category : String,
        image : String,
    
});

const dbURI = 'mongodb+srv://miralsalah:miral123@online-shop.e3065ly.mongodb.net/online-shop?retryWrites=true&w=majority';

const Product = mongoose.model('product',Schema)


const getAllProducts=(page,prodectPerPage)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbURI).then(()=>{
            return Product.find({})
            .skip(page*prodectPerPage)
            .limit(prodectPerPage)
        }).then((product)=>{
            mongoose.disconnect();
            resolve(product)
        }).catch((err)=>{
            console.log(err);
        })
    })

}
const getAllProductsByCategory=(category)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbURI).then(()=>{
            return Product.find({category:category})
        }).then((product)=>{
            mongoose.disconnect();
            resolve(product)
        }).catch((err)=>{
            console.log(err);
        })
    })

}

//Product Details Page
const getProductById=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbURI).then(()=>{
            return Product.findById(id)
        }).then((product)=>{
            mongoose.disconnect();
            resolve(product)
        }).catch((err)=>{
            console.log(err);
        })
    })

}

const delProductById=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbURI).then(()=>{
            return Product.findByIdAndRemove({_id:id}).then(()=>{
                return Product.find({})
            })
        }).then((products)=>{
            mongoose.disconnect();
            resolve(products)
        }).catch((err)=>{
            console.log(err);
        })
    })

}


module.exports = { Product, getAllProducts , getAllProductsByCategory, getProductById ,delProductById}
