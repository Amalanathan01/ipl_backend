require("dotenv").config();
var app = require('express')();
var uploadapp = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var server = require('http').Server(app);
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const playground = require('graphql-playground-middleware-express').default;
const cors = require('cors');
const config = require('./config').db;
const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
const {
    graphqlExpress
} = require('apollo-server-express');

const {
    authMiddleware
} = require('./lib/middleware');

const {
    login,
    signup,
    getTokenData,
    isAuthorized
} = require('./lib/auth')

const {
    port,
    host
} = require('./config').server;

app.use('/playground', playground({
    endpoint: '/graphql'
}));

uploadapp.use(fileUpload());

uploadapp.use(bodyParser.json());

const buildOptions = async (req, res) => {    
    const tokenData = req.headers ? getTokenData(req.headers.authorization) : null;
    const isTokenAuthorized = await isAuthorized(tokenData);
    if (!isTokenAuthorized) {
        throw new Error("Unauthorized or token is expired");
    }
    return {
        schema,
        context: { isTokenAuthorized }
    }
}

app.use(bearerToken());
app.use(authMiddleware);

app.use('/graphql', graphqlHTTP(buildOptions));

uploadapp.post('/login', login);
uploadapp.post('/signup', signup);

uploadapp.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

uploadapp.listen("8002");

server.listen(port);

mongoose.connect(config.url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

var matchTemplate = require('./csvUpload/matchTemplate.js');
uploadapp.get('/matchtemplate', matchTemplate.get);

var deliveryTemplate = require('./csvUpload/deliveryTemplate.js');
uploadapp.get('/deliverytemplate', deliveryTemplate.get);

var userTemplate = require('./csvUpload/userTemplate.js');
uploadapp.get('/usertemplate', userTemplate.get);

var matchUpload = require('./csvUpload/matchUpload.js');
uploadapp.post('/match', matchUpload.post);

var deliveriesUpload = require('./csvUpload/deliveriesUpload.js');
uploadapp.post('/deliveries', deliveriesUpload.post);

var usersUpload = require('./csvUpload/userUpload');
uploadapp.post('/users', usersUpload.post);