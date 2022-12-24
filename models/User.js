const mongoose = require('mongoose')
const uri = 'mongodb+srv://miralsalah:miral123@online-shop.e3065ly.mongodb.net/online-shop?retryWrites=true&w=majority'
const bcrypt = require('bcrypt')
const{isEmail} = require('validator') 
//const uri = process.env.dbURI;


const userSchema =  mongoose.Schema({
        username:
        {
            type : String ,
             required: [true,'Please Enter an Username'], 
        },
        email : 
        {
            type : String , 
            required: [true,'Please Enter an Email'], 
            unique:true,
            validate: [isEmail, 'Please enter a valid email']
        },

        password : {
            type : String , 
            required: [true,'Please Enter a Password'],
            minlength: [6, 'Minimum password length is 6 characters'],
        },

        confirmPassword : {
          type : String , 
          required: [true,'Please Enter Password Again'],
          minlength: [6, 'Minimum password length is 6 characters'],
          validate: {
            validator: function() {
              return this.confirmPassword === this.password ? true:false ; 
            }, message: "'The Passwords do not identical'"
        },
      },
        address : {
            type : String , 
        },

        isAdmin : {
            type : Boolean , 
        },
    
});


// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    next();
  });

  const User = mongoose.model('user',userSchema)
const createNewUser = (username,email,password,confirmPassword) => {
    return new Promise ((resolve,reject)=> {
        mongoose.connect(uri).then(()=>{
          let user = new User({
            username:username,
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            isAdmin : false
        })
        
        return user.save()
        }).then((user)=>{
            resolve(user)
        }).catch(err =>{
            reject(err)
        })
    })
  }

  const posLogin = (email,password) => {
    return new Promise((resolve,reject)=>{
        mongoose.connect(uri).then(()=>{
           return User.findOne({email})
        }).then( async (user)=>{
            if(!user){
              mongoose.disconnect()
              throw Error('incorrect email');
            }
            else {
               return bcrypt.compare(password,user.password).then(same => {
                if(!same) {
                  mongoose.disconnect()
                  throw Error('incorrect password');
                }
                else {
                    resolve(user)
                    mongoose.disconnect()
                }
            })
            }
        }).catch(err =>{
          reject(err) })
    })

  }

  module.exports = {User,createNewUser,posLogin}
