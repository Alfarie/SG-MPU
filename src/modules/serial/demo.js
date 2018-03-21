var production = require('../../models/config').production;
var dispatch = require('./command_dispatcher');
var CommandProcess = dispatch.CommandProcess;

var events = require('events');
var moment = require('moment');
var parserTest = new events.EventEmitter();
parserTest.on('data', (data) => {
    var jsonData = JSON.parse(data);
    CommandProcess(data);
});
var RandomFloat = function (min, max) {
    var value = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(2));
}
if (!production) {
    console.log('[Info] Dummy Sensor reqeust and reply start..');
    setInterval(() => {
        var sensor = {
            type: 'sensor',
            data: {
                par: RandomFloat(50, 60),
                vpd: parseInt(RandomFloat(1500, 1600)),
                temperature: RandomFloat(23, 25),
                humidity: RandomFloat(50, 60),
                soil: RandomFloat(50, 60),
                co2: RandomFloat(1000, 1200),
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('hh:mm:ss')
            }
        }
        var str = JSON.stringify(sensor);
        parserTest.emit('data', str);
    }, 1000);
}