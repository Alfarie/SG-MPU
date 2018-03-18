var portName = require('../../models/config').portName;
var production = require('../../models/config').production;
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

var fs = require('fs');
var port = null;
var parser = null;
var isConnected = false;
var Rx = require('rxjs/Rx');
var write = new Rx.Subject();

var dispatch = require('./command_dispatcher');
var CommandProcess = dispatch.CommandProcess;
dispatch.setWrite(write);

console.log("Scanning:" + portName)
var scanPort = function () {
    var flag = false;
    for (var i = 20; i >= 0; i--) {
        // var str = portName + i;
        var str = portName;
        if (fs.existsSync(str)) {
            port = new SerialPort(str, {
                baudRate: 115200,
                disconnectedCallback: function () {
                    console.log('You pulled the plug!');
                }
            });
            parser = port.pipe(new Readline({
                delimiter: '\r\n'
            }));
            port.on('open', (err) => {
                console.log("[Info] ", str, "is Opened. ")
                setTimeout(() => {
                    isConnected = true;
                    console.log('[Info] Request control.');
                    port.write('{control}')
                }, 2000);
            })
            port.on('close', (err) => {
                console.log(err);
                isConnected = false;
            })
            parser.on('data', (data) => {
                console.log(data);
                CommandProcess(data);
            })
            flag = true;
            break;
        }
    }
    return flag;
}



write.subscribe(data => {
    if (isConnected) {
        port.write(data);
    };
})
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
} else {
    scanPort();
    setInterval(() => {
        if (!isConnected) {
            scanPort();
        }
    }, 5000);
}



module.exports = {
    write: write
}