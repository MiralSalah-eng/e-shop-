const cartModel = require('../models/cartModel')
const jwt = require('jsonwebtoken')

// handle errors
 const handleErrors = (err) => {
   let errors = { amount:'' };
  
    // validation errors
  if (err.message.includes('cart validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  if (err.message.includes('Validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
      return errors;

} 
exports.postCart = (req,res) =>{
    if(req.body.amount < 1 ){
        const errors = {amount:'Amount must be 1 at least'};
        res.status(400).json({ errors });
    }
    else {
        cartModel.addItem({
            name: req.body.name,
            price : req.body.price,
            amount : req.body.amount,
            userId :req.body.userId ,
            productId : req.body.productId,
            timestamp : Date.now()
            
        }).then((items)=>{
            res.status(201).json({ items });
        }).catch(err =>{
            console.log(err);
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        })
    }
        

}


exports.getCart = (req,res) => {
    jwt.verify(req.cookies.jwt, 'secretkey for miral', async (err, decodedToken)=>{
            return decodedToken.id
    }).then ((id)=>{
        cartModel.getItemsByuserId(id).then(items => {
            res.status(200).render('cart',{items : items,pageTitle:'Cart'})
        })
    })

    .catch(err =>{
        const errors = handleErrors(err);
        res.status(400).json({ errors })})
} 

exports.postSave = (req,res) =>{
    const {cartId,amount} = req.body;
    cartModel.postSave(cartId,{amount,timestamp:Date.now()}).then((items)=>{
        res.status(200).json({ items : items });
    }).catch(err =>{
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    })
}

exports.deleteProduct =  (req,res) =>{
    const {cartId} = req.body;
     cartModel.deleteOne(cartId).then(()=>{
        res.status(200).redirect('/cart');
    }).catch(err => {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    })
}
exports.emptyCart = (req,res) =>{
    cartModel.deleteAll().then(()=>{
        res.status(200).redirect('/cart')
    }).catch(err => {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    })
}