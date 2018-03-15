var args = require('./modules/args/processing');
var exit = false;
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if (!args.argProcess(val)) {
        exit = true;
    }
});



if (!exit) {
    var ws = require('./modules/ws/ws');
    var serial = require('./modules/serial/serial');
    var logger = require('./modules/datalogger/datalogger.js')

    ws.http.listen(3000, function () {
        console.log('listening *:' + 3000);
    });
}