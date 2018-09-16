var mcu = require('../mcu/mcu');
var awsclient = require('./aws-iot-client');
var getMac = require('./getmac');
var moment = require('moment');

function getLoggerSensors() {
    var data = JSON.parse(JSON.stringify(mcu.GetSensors()));
    data.date = mcu.GetDateTime().date;
    data.time = mcu.GetDateTime().time;
    data.timestamp = moment().unix();
    data.mid = getMac.mac;
    data.status = {
        paracc_status: mcu.GetStatus().paracc,
        gpio: mcu.GetStatus().gpio
    }
    return data;
}

var getControlStatus = () => {
    var control = mcu.GetControl();
    return {
        gpio: mcu.GetStatus().gpio,
        control: {
            ch1: control[0],
            ch2: control[1],
            ch3: control[2],
            ch4: control[3]
        }
    }
}
// console.log(getControlStatus());

function updateSensors() {
    setInterval(() => awsclient.Publish('STREAM_STATUS/' + getMac.mac, getLoggerSensors()), 2000);
}

function updateLoggerSensors() {
    setInterval(() => awsclient.Publish('LOG_SENSORS/' + getMac.mac, getLoggerSensors()), 60000);
}

var updateControlStatus = () => {
    updateThing(getControlStatus());
}

var updateThing = (data) => {
    var control = getControlStatus()
    awsclient.UpdateThingShadow(control);
}

var Init = () => {
    setTimeout(() => {
        updateSensors();
        updateLoggerSensors();
    }, 1000);
}

module.exports = {
    Init,
    updateControlStatus
}