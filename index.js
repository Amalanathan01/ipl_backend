require("dotenv").config();
var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var server = require('http').Server(app);
const bodyParser = require('body-parser');
const Router = require('./routes');
import { GraphQLServer, PubSub } from "graphql-yoga";
import schema from "./graphql";
import { models } from "./server/config/db";


const pubsub = new PubSub();

const options = {
    port: "4000",
    endpoint: "/graphql",
    subscriptions: "/subscriptions",
    playground: "/playground"
};

const context = {
    models,
    pubsub
};

const graphQlServer = new GraphQLServer({
    schema,
    context
});

app.use(fileUpload());

server.listen(8001);

graphQlServer.start(options, ({ port }) => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

mongoose.connect('mongodb://localhost:27017/ipl')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var matchTemplate = require('./csvUpload/matchTemplate.js');
app.get('/matchtemplate', matchTemplate.get);

var deliveryTemplate = require('./csvUpload/deliveryTemplate.js');
app.get('/deliveryTemplate', deliveryTemplate.get);

var matchUpload = require('./csvUpload/matchUpload.js');
app.post('/match', matchUpload.post);

var deliveriesUpload = require('./csvUpload/deliveriesUpload.js');
app.post('/deliveries', deliveriesUpload.post);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
Router.routesConfig(app);