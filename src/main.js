var ws = require('./modules/ws/ws');
var serial = require('./modules/serial/serial');

ws.http.listen(3000, function() {
    console.log('listening *:' + 3000);
});