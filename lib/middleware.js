const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const validateToken = (token) => {
    return jwt.verify(token, secret);
}
exports.authMiddleware = (req, res, next) => {
    const message = { Error: null };
    try {

        if (req.token) {
            const valid = validateToken(req.token);
            if (valid) {
                next();
            }
        }
    }
    catch (err) {
        throw new Error(err.message)
    }
}