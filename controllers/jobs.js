const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')

//auth middles ware is infront of all of our job routes in app.js. So enthe route ukkullale enthe req vaareya irunthalum auth middleware kullale poi than varenum. Means we will always have access to req.user with uerID and name datas
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt') //Note that Model(Job).find endu use panna varre data array ah irukkum. findOne use pannathan single object ah irukkum
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
    
}
const getJob = async (req, res) => {
    const {userID} = req.user
    const {id:JobID} = req.params
    const job = await Job.findOne({_id: JobID, createdBy: userID}) //ithu rendum match aahurethe namme find pannathan secure koode, even tho _id is enough its self as its alrdy unique
    
    if(!job) {
        throw new NotFoundError('Job not found')
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID //createdBy schema le required true endu irukku but athe namme frontend le user te irunthu information ah edukkele. so athe nammethan inge add pannenum before creating the document. and createdBy le vare pore ore info id than not name as id is the unique thing
    console.log(req.body)
    const job = await Job.create(req.body)
    
    res.status(StatusCodes.CREATED).json({job})
}


const updateJob = async (req, res) => {
    const {userID} = req.user
    const {id:JobID} = req.params
    const {company, position} = req.body

    if (company === '' || position === '') {
        throw new BadRequestError('Pls provide company and position values')
    }
    const job = await Job.findByIdAndUpdate({_id: JobID, createdBy: userID}, req.body, {new:true, runValidators:true}) //ithu rendum match aahurethe namme find pannathan secure koode, even tho _id is enough its self as its alrdy unique
    console.log(job)
    if(!job) {
        throw new NotFoundError('Job not found')
    }
    res.status(StatusCodes.OK).json({job})
}


const deleteJob = async (req, res) => {
    const job = await Job.findOneAndDelete({_id: req.params.id}) //Note that inge namme const job endu job variable le ethe save panrom enda findOne engure anthe function oru document or object eh find pannume? athethan save panrom (to check if it exists and if they provide a wrong id, to throw an error as well)
    if(!job) {
        throw new NotFoundError('Job not found')
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs, 
    getJob,
    updateJob,
    createJob,
    deleteJob,
}