const authModel = require('../models/User')
const jwt = require('jsonwebtoken')


// handle errors
const handleErrors = (err) => {
  console.log(err);
 let errors = { email: '', password: '', confirmPassword:'' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({id},'secretkey for miral', {expiresIn: maxAge })
}
//Get Request from SignUp
module.exports.getSignUp = (req,res)=>{
res.status(200).render('signup',{pageTitle:"Sign Up"})
}

//Post Request from SignUp
module.exports.postSignup = async (req,res)=>{
  const {username,email,password,confirmPassword} = req.body
  authModel.createNewUser(username,email,password,confirmPassword)
  .then((user) => {
    const token = createToken(user._id)
    res.cookie('jwt',token,{httpOnly:true})
    res.status(201).json({ user: user._id });
  })
  .catch (err => {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  })  
  
}
    
//Get Request from Login
module.exports.getLogin =((req,res)=>{
    res.status(200).render('login',{pageTitle:"Login"})
})
    

//Post Request from Login
module.exports.postLogin = async (req,res)=>{
  const {email,password} = req.body
  authModel.posLogin(email,password)
  .then((user)=>{
    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true})
    res.status(200).json({ user: user._id });
    
  })
  .catch (err => {
    const errors = handleErrors(err);
    res.status(400).json({ errors }); 

  })
}

// Logout
module.exports.logout=((req,res)=>{
  res.cookie('jwt','',{maxAge:1})
  res.status(200).redirect('/')


})
