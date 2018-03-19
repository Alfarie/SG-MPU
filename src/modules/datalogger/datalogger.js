var sensors = require('../../models/sensors');
var moment = require('moment');
var fs = require('fs');
var loop = null;
// var loggerTime = 5000;
var loggerTime = 5 * 1000 * 60;

var dir = __dirname.replace('src/modules/datalogger', 'Logger/');
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
        var datestr = "DATE" + moment(sensor.date).format('YYYY-DD-MM');
        
        var loggerStr = {
            'datetime': moment(sensor.date + " " + sensor.time).toDate(),
            'temperature': sensor.temperature,
            'humidity': sensor.humidity,
            'par': sensor.par,
            'soil': sensor.soil,
            'vpd': sensor.vpd,
            'co2': sensor.co2,
            'paracc': parseFloat( (sensors.parAccumulation / 1000).toFixed(2))
        }

        fs.appendFile(dir + datestr, JSON.stringify(loggerStr) + ",\n", function(err) {
            if (err) console.log(err);
        });
    }
}
start();