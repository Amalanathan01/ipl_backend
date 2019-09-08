require("dotenv").config();
var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var server = require('http').Server(app);
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
import expressPlayground from 'graphql-playground-middleware-express';
const cors = require('cors')

app.use('/graphql', cors(), graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(fileUpload());

app.use('/playground', expressPlayground({ endpoint: '/graphql' }));

server.listen(8001);

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