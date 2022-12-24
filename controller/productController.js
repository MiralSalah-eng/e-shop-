const productModel = require('../models/products.model')

exports.getProducts =((req,res)=>{
    
    let page = req.query.p || 0
    let prodectPerPage = 8
    let category = req.query.category
    let productPromise;

    if(category && category!=='all'){ productPromise = productModel.getAllProductsByCategory(category)}
    else { productPromise =productModel.getAllProducts(page,prodectPerPage) }

    productPromise.then(products => {
        res.status(200).render('index',{products:products,pageTitle:'Home'})
    })
})

exports.removeProduct =((req,res)=>{
    const productId = req.body.productId
   productModel.delProductById(productId).then(products => {
    res.status(200).render('index',{products:products,pageTitle:'Home'})})
   
})

