var sensors = require('../models/sensors');
var moment = require('moment');
var fs = require('fs');
var loop = null;
var loggerTime = 2000; //min

var dir = __dirname.replace('src/modules/datalogger', 'Logger');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var start = function() {
    console.log("LOGGER TIME : " + loggerTime);
    loop = setInterval(LoggerLoop, loggerTime);
}

var stop = function() {
    clearInterval(loop);
}

var LoggerLoop = function() {
    var sensor = sensors.sensor;
    if (sensor != undefined) {
        var t = sensor.time.split(":");
        var d = sensor.date.split("/");
        var datestr = "DATE" + d[1] + "" + d[0] + "" + d[2];
        var loggerStr = {
            'datetime': moment(sensor.date + " " + sensor.time),
            'time': sensor.time,
            'temp': sensor.temp,
            'humi': sensor.humi,
            'light': sensor.light,
            'soil': sensor.soil,
            'vpd': sensor.vpd
        }
        fs.appendFile(dir + datestr, JSON.stringify(loggerStr) + ",\n", function(err) {
            if (err) console.log(err);
            console.log('[LOGGER] saved!');
        });
    }
}

start();