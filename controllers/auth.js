const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
 
//Register
const register = async (req, res) => {
    
    const user = await User.create({...req.body}) //inthe user varibale le save aahure object DB le irukkure same object after we created our document(so inthe user variable le irukkure document or object le hased password than irukkum. so better not send it back as response) 
    
    const token = user.createJWT() //so user.createJWT() jwt create panrethukkaane functionality eh return pannum(which we setted up alrdy in models/user) and athu inge return panni create panne udeneye namme anthe jwt token or that long string eh token engure variable le save pannikirom so that we can send it back later easily. Note that user.createJWT not User.createJWT(inthe actual document ku than methods eh use pannenum. in this case we assign this actual document in user variable right after creating it)
    res.status(StatusCodes.CREATED).json({user:{name:user.getName()},token})
}

//Login
const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})

    if(!user) { 
        throw new UnauthenticatedError('Email or Password is wrong')
    }

    const isPasswordCorrect = await user.checkPassword(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Email or Password is wrong')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name}, token}) //inge naan user.getName() eh use panname mele User.findone le irun thu find panne document eh user variable eh save panneme, anthe variable eh use panni name eh eduthukkuren(it doesnt matter either way)
}

module.exports = {
    register, 
    login
}