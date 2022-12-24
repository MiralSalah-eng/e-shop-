const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const mongoose = require('mongoose')
const uri = 'mongodb+srv://miralsalah:miral123@online-shop.e3065ly.mongodb.net/online-shop?retryWrites=true&w=majority'

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'secretkey for miral', (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}; 

const isAdmin = (req,res,next) =>{
  const token = req.cookies.jwt;
  if (token) {
  jwt.verify(token, 'secretkey for miral', async (err, decodedToken) => {
    if (err) {
      res.locals.user = null;
    }else {
      await mongoose.connect(uri)
      let user = await User.findById(decodedToken.id); //
      res.locals.user = user;
      if(user.isAdmin){
         next();}
      else{
        res.redirect('/')}
    }
  })
} else {
  res.locals.user = null;
  next();
}

}
// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
    jwt.verify(token, 'secretkey for miral', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        await mongoose.connect(uri)
        let user = await User.findById(decodedToken.id); //await
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const noAuth = (req,res,next) =>{
  const token = req.cookies.jwt;
 if (!token) next()
 else res.redirect('/')
}



module.exports = { noAuth,  requireAuth , checkUser ,isAdmin};