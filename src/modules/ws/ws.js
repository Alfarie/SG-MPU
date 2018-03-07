var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
io = require('./socket').socketio(io);

var cors = require('cors');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

// var api = require('./api');
// app.use('/api/', api);

var loggerApi = require('./logger/logger-api');
var controlApi = require('./control/control-api');
var settingApi = require('./setting/setting-api');

app.use('/logger/', loggerApi);
app.use('/control/', controlApi);
app.use('/setting/', settingApi);

var root = path.join(path.resolve(__dirname, '../../../build'));
app.use(express.static(root));

app.get("/*", function (req, res) {
    res.redirect("/");
});

module.exports = {
    http: http,
    io: io
}