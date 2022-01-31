const express = require('express')
const router = express.Router()



const {
    getAllJobs, 
    getJob,
    updateJob,
    createJob,
    deleteJob,} = require('../controllers/jobs') //instead of passing middleware here to all the routes one by one we can pass it in app.js as all these routes are pathing from a single route which is /api/v1/

router.get('/', getAllJobs)
router.post('/', createJob)
router.get('/:id', getJob)
router.patch('/:id', updateJob)
router.delete('/:id', deleteJob)

module.exports = router