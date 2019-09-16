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
        } else {
            res.status(400).send({ error: 'Invalid username and password' });
        }
    }
    catch (e) {
        res.status(400).send({ error: 'Something went wrong. Please try again later' });
    }


}

exports.signup = async (req, res) => {
    const user = await User.findOne({
        username: { $eq: req.body.username }
    });
    if (user) {
        throw new Error();
        //res.status(400).send({error: "User already registered"})
    }
    try {
        const user = User.collection.insertOne(req.body, function (err, documents) {
            if (err) res.status(400).send({ error: "Cannot create user. Please try again" });
        });
        res.status(201).send({result: "success"});
    } catch (err) {
        res.status(400).send({ error: "Cannot create user. Please try again" });
    }
}

async function generateToken(payload) {
    return await jwt.sign({
        data: payload
    }, secret, { expiresIn: '1h' });
}

exports.getTokenData = (token) => {
    const bearerToken = token ? token.split(" ") : null;
    if (bearerToken && bearerToken[0].toLowerCase() === 'bearer' && bearerToken.length === 2) {
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