const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const {
    secret
} = require('../config')
const User = require('../models/userModel');

Promise.promisifyAll(jwt);

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
                username: { $eq : req.body.username },
                password: { $eq: req.body.password }
        });
        if (user) {
            const token = await generateToken(user);
            res.json({
                token
            })
        }
    }
    catch (e) {
        console.log(e)
    }


}

exports.signup = async (req, res) => {
    //To do validation
    // To do check existing user with email
    try {
        const user = User.insertOne(req.body);
        res.json(user);
    } catch (err) {

    }
}

async function generateToken(payload) {
    return await jwt.sign({
        data: payload
    }, secret, { expiresIn: '1h' });
}

exports.getTokenData = (token) => {
    const bearerToken = token.split(" ");
    if (bearerToken[0].toLowerCase() === 'bearer' && bearerToken.length === 2) {
        token = bearerToken[1]
    }
    return jwt.decode(token);
}

exports.isAuthorized = async (tokenData) => {
    const dateNow = new Date();
    const user = await User.findOne({
        username: { $eq: tokenData.data.username },
        password: { $eq: tokenData.data.password }
    });
    return (tokenData.exp >= (dateNow.getTime() / 1000)) && user != null
}