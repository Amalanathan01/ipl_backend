require("dotenv").config();
var app = require('express')();
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
    login,
    signup,
    getTokenData,
    isAuthorized
} = require('./lib/auth')

const {
    port,
    host
} = require('./config').server;

app.use(cors());

app.use('/playground', playground({
    endpoint: '/graphql'
}));

app.use(fileUpload());

app.use(bodyParser.json());

const buildOptions = async (req, res) => {
    const tokenData = req.headers.authorization ? getTokenData(req.headers.authorization) : null;
    const isTokenAuthorized = tokenData ? await isAuthorized(tokenData) : null;
    return {
        schema,
        context: { isTokenAuthorized }
    }
}

app.use('/graphql', graphqlHTTP(buildOptions));

app.post('/login', login);
app.post('/signup', signup);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port);

mongoose.connect(config.url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

var matchTemplate = require('./csvUpload/matchTemplate.js');
app.get('/matchtemplate', matchTemplate.get);

var deliveryTemplate = require('./csvUpload/deliveryTemplate.js');
app.get('/deliverytemplate', deliveryTemplate.get);

var userTemplate = require('./csvUpload/userTemplate.js');
app.get('/usertemplate', userTemplate.get);

var matchUpload = require('./csvUpload/matchUpload.js');
app.post('/match', matchUpload.post);

var deliveriesUpload = require('./csvUpload/deliveriesUpload.js');
app.post('/deliveries', deliveriesUpload.post);

var usersUpload = require('./csvUpload/userUpload');
app.post('/users', usersUpload.post);