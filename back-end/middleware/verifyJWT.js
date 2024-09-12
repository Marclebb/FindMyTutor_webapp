const jwt = require('jsonwebtoken');

const secret = "my_jwt_secret";

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
                next();
            }
        });
    }
};

module.exports = verifyJWT;