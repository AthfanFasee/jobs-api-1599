const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type:String,
        required:[true, 'Please provide a company'],
        maxlength:40
    },
    position: {
        type:String,
        required:[true, 'Please provide a position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview', 'declined', 'pending'],
        default:'pending'
    }, 
    createdBy:{
        type:mongoose.Types.ObjectId,  //namme firebase maathiri rendu whole different collections eh connect pannre manual ah id lam create panne thevelle. instead mongoDB leye ipdi innoru collection eh refer panni athude id eh inge use panre maathiri option built in aave irukku. which is pretty easy
        ref:'User', 
        required: [true, 'Please provide user']
    } 
}, {timestamps:true})

module.exports = mongoose.model('Job', jobSchema)