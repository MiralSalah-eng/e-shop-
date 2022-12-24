const productModel = require('../models/products.model')

exports.getProductDetails =((req,res)=>{
    
    let id = req.params.id
    productModel.getProductById(id).then((product) => {
        res.status(200).render('product',{product:product, pageTitle:product.title})})
})

