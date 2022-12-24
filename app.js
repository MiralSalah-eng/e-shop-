const express = require ('express');
const authRoutes =require ('./routes/authRoute.js')
const cartRoute =require ('./routes/cartRoute')
const orderRoute =require ('./routes/orderRoute')
const addressRoute =require ('./routes/addressRoute')
const adminRoute =require ('./routes/adminRoute')


const app = express();
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser,isAdmin } = require('./middleware/authmiddleware');

app.use(express.static('assets'));
app.use(express.static('images'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));


app.set('view engine','ejs')
app.set('views','views')


const port = process.env.PORT || 3000
app.listen(port, (err) => {
    console.log('Server working')
})


app.get('*', checkUser);
app.use(authRoutes);
app.use('/',require ('./routes/homeRoute.js'))

app.use('/cart', requireAuth,cartRoute );
app.use('/address', requireAuth,checkUser,addressRoute);
app.use('/orders', requireAuth,checkUser, orderRoute);

app.use('/admin', requireAuth,checkUser,isAdmin,adminRoute );

app.use('/product', require ('./routes/productDetails.js'))



app.use(requireAuth, checkUser,(req,res,next)=>{
    res.render('not-found',{pageTitle:'404-Not Found'})
})