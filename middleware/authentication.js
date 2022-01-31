const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next) => {

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Not authorized')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const {userID, name} = payload
        req.user = {userID, name} //inthe route ku varre req eh namme authentication middleware ku redirect panni anthe specific req ku uriye req.users object ku data ve fill panni anuppure nammethan. So basically namme jobs controllers le inthe id use panneke oru req oode enthe jwt token varutho anthe token le irukkure specific id ku uriye user ku uriye data ve send pannuvom, which makes sense right. At the end of the day jwt token than oru user eh server ku specific ah identify panne uthavuthu
        next()
    } catch {
        throw new UnauthenticatedError('Not authorized')
    }
   
}

module.exports = authMiddleware