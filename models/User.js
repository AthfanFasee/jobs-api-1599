const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name'],
        minlength: 3,
        maxlength: 20,
    },
    email:{
        type:String,
        required:[true, 'Please provide an email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is not valid'
        ],
        unique: true,
    },
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength: 6,
    },
})

//hashing password before saving in Database

userSchema.pre('save', async function() { //ivedthe next eh argument ah edukkenum (not req or res as next is enough). Note that not needed in latest mangoose 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)  //in here as it's mongoDB middleware before saving docs, this will refeer to the documentation. this middleware will be called before each document is saved. So each time this will refer to each single document
    //basically we are overwriting password's value in a document before saving it
     //calling next or passing the middleware into next is a must when we are using middlewares. but in latest mangoose versions next eh call panne thevelle
})

//handling user.name here as its a good example to understand whats going on
//basically oru function create panni athe this.name eh return panne vekkom. so in the function ah yaarum user.function() endu call panna athu this.name eh return pannum
userSchema.methods.getName = function () {   //when we are using MongoDB middlewares we should always use regular functions so that it will point towards our database
    return this.name
}

//handling jwt in here as well
userSchema.methods.createJWT = function () {
    return jwt.sign({userID: this._id, name:this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

//Checking Password
userSchema.methods.checkPassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password) //bcrypt got its own compare method
    return isMatch

}



module.exports = mongoose.model('User', userSchema) //Remember model's name is User means our collection will end up named as users in Database