const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.MY_JWT_SECRET;


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send({ auth: false, message: "No token provided." });
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.send({ auth: false, message: "Failed to authenticate token." });
            } else {
                req.userId = decoded.id;
                req.role = decoded.accounttype;
                next()
            }
        });
    }
}
module.exports = verifyJWT;