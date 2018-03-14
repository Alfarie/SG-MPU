var args = require('./modules/args/processing');
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    args.argProcess(val)
});

var ws = require('./modules/ws/ws');
var serial = require('./modules/serial/serial');
var logger = require('./modules/datalogger/datalogger.js')

ws.http.listen(3000, function () {
    console.log('listening *:' + 3000);
});