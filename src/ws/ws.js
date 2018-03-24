var express = require('express');
var jsoncsv = require('express-json-csv')(express);
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
io = require('./socket').socketio(io);

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));

var root = path.join(path.resolve(__dirname, '../../../build'));
app.use(express.static(root));

var port = 3000;

var controlApi = require('./control/control-api');
app.use('/control/', controlApi);

var loggerApi = require('./logger/logger-api');
app.use('/logger/', loggerApi);

// var settingApi = require('./setting/setting-api');
// app.use('/setting/', settingApi);

module.exports = {
    http,
    io,
    port
}