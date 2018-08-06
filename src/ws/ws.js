var express = require('express');
var jsoncsv = require('express-json-csv')(express);
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var jwt = require('jsonwebtoken');

var secret = 'ThisIsSecretMessageIntelAgro'
app.set('superSecret', secret)

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));

var root = path.join(path.resolve(__dirname, '../../dist/'));
app.use(express.static(root));
var port = 3000;
app.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (req.originalUrl == '/auth/signin') {
        next();
    }
    else if (token) {

        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
})

var controlApi = require('./control/control-api');
app.use('/control/', controlApi);

var loggerApi = require('./logger/logger-api');
app.use('/logger/', loggerApi);

var settingApi = require('./setting/setting-api');
app.use('/setting/', settingApi);

var authApi = require('./auth/auth');
app.use('/auth/', authApi);

app.get('*', function (req, res) {
    res.redirect('/');
});

io = require('./socket').socketio(io);
var jwtAuth = require('socketio-jwt-auth');
var moment = require('moment');
io.use(jwtAuth.authenticate({
    secret: app.get('superSecret'),    // required, used to verify the token's signature
    algorithm: 'HS256',        // optional, default to be HS256
    succeedWithoutToken: false
}, function (payload, done) {
    var exp = moment(payload.exp * 1000);
    var iat = moment(payload.iat * 1000); 
    var now = moment();
    var diff = moment.duration(exp.diff(now));
    if(diff.asSeconds() <= 0){
        done(null, false);
    }
    else{
        done(null, payload.username)
    }
}));

module.exports = {
    http,
    io,
    port
}