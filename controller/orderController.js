const orderModel = require('../models/orderModel')
const jwt = require('jsonwebtoken')

exports.postOrder = (req,res) =>{
    const {name,price,amount,productId,address,userId,email} = req.body;
    orderModel.addOrder({name,price,amount,productId,address,userId,email}).then(()=>{
        res.status(201).redirect('/orders')
    })
   
}

exports.getOrder = (req,res) =>{
    jwt.verify(req.cookies.jwt, 'secretkey for miral', async (err, decodedToken)=>{
        return decodedToken.id}).then((userId)=>{
            orderModel.getOrders(userId).then((order)=>{
                res.status(200).render('orders',{order:order,pageTitle:'Orders'})

        })
    })  .catch(err =>{
        const errors = handleErrors(err);
        res.status(400).json({ errors })})

}


exports.cancelOrder = (req,res) =>{
    orderModel.cancelOne(req.body.orderId).then(()=>{
        res.status(200).redirect('/orders')
    }).catch(err => {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    })
}

exports.emptyOrdert = (req,res) =>{
    orderModel.deleteAll().then(()=>{
        res.status(200).redirect('/orders')
    }).catch(err => {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    })
}