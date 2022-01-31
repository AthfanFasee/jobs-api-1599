//Inge namme focus panne vendiye ore visayam err engure argument or variable inthe function kulle vaarethuthan. ithe vechu than app.use ithan errorhandling middleware endu detect pannum. Also inthe err built in Error class le irunthu varuthu. Namme custom Api error eh anthe class le irunthu than extend panni then mathe errors elam custom api error le irunthu extend panni irukkom. so basically namme extend panne ella errors um Error class le vanthu mudiyum. so anthe message and status codes ku namekku inge err variable le irunthu access kidekkum. So inge custom api error eh import or use pannenum endu enthe avasiyamum ille
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => { //inge vaare err engure argument nammude built in Error class le irunthuthan varuthu. athule alrdy err.message, statuscode lam irukkum. athe use panni namme inge code panni return and response lam panrom. Mind that namme response panname user ku err koode response ah pohathu. Nammethan err eh koode response ah kudukkenum
                                //inthe err namme builtin Error class le irunthu extend panni code panne classes le irunthu vaare error ah vum irukkalam or mongoose le default ah sile errors irukkume?(validation errors, duplicate errors) anthe maathiri. athuhalahavum irukkalam
  
  let customError = {  //Custom error object build panne kaaranam, suppose error namme error class le irunthu extend pannathavo or mongodb le irunthu varaathethahavo somewhat weird aah ethum puthusa error vantha athukku default ah namme oru status and message hard code panni vechchikkethan
    //setting default values
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }
  
  if(err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(item => item.message).join(',')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if(err.name === 'CastError') {
    customError.msg = `No item found with name ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)[0]} already exists. Please choose another one`
    console.log(Object.keys(err.keyValue)[0]) //inthe Object.Keys(Object) function namme pass panre Object le irukkure keys or properties oode names eh thaniye eduthu oru array ah tharuthu. Ippe ende object kulle innoru object names endu irukkendu vecha, enekku names objectoode keys oode names venum enda Object.keys(Object.names) endu kudutha seri
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
