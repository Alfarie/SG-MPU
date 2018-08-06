var port = 3000;
var serialPort = '/dev/ttyACM0'
var scanPort = false;
var production = false;
var wifiCustom = false

var loggerDirectory = __dirname.replace('/src/args', '/Logger/');
var loggerTime = 1000 * 60;
var interface  = 'enp0s25'

module.exports = {
    port,
    serialPort,
    production,
    loggerDirectory,
    loggerTime,
    interface,
    scanPort,
    wifiCustom
}