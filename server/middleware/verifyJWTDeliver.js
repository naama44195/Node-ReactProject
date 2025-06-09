const jwt = require('jsonwebtoken')

const verifyJWTD = (req, res, next) => {
    console.log(req.headers.authorization);
    
    const authHeader = req.headers.authorization ||
        req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    console.log(token);
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded);
            
            if(decoded.roles!="Admin" && decoded.roles!="Deliver"){
                return res.status(403).json({ message: 'Forbidden' })  
            }
            if (err) return res.status(403).json({ message:'Forbidden'})
            req.user = decoded
            console.log(req.user); 
            next()
        }
    )
}
module.exports = verifyJWTD
