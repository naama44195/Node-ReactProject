// const jwt = require('jsonwebtoken')
// const Admain = (req, res, next) => {
//     console.log("dddddddd");
//     console.log("Verifying admin access", req.user?.roles);
    
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(401).json({ message: "No token provided" });
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if(decoded.roles!="Admin"){
//                 return res.status(403).json({ message: 'Forbidden' })  
//             }
//             if (err) return res.status(403).json({ message: 'Forbidden' })
//             req.user = decoded
//         console.log(decoded);
//             if (!req.user.roles.startsWith('Admin')) {
//                 return res.status(403).json({ message: 'Forbidden Admin' })
//             }
//             next()
//         }
//     )
// }
// module.exports = Admain
const jwt = require('jsonwebtoken');

const Admain = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        // שמירת המשתמש בפנים
        req.user = decoded;

        // הדפסת התפקידים
        console.log("Decoded JWT:", decoded);
        console.log("Verifying admin access:", req.user.roles);

        if (!req.user.roles || req.user.roles !== "Admin") {
            return res.status(403).json({ message: 'Forbidden Admin' });
        }

        next();
    });
};

module.exports = Admain;