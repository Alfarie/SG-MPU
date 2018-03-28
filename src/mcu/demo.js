var mcu;
var parAcc = 0;
var moment = require('moment');
var RandomFloat = function (min, max) {
    var value = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(2));
}

function Loop(){
    let par = RandomFloat(50, 60);
    parAcc += par;
    var sensor = {
        type: 'sensors',
        data: {
            par: par,
            parAccumulation: parAcc ,
            vpd: parseInt(RandomFloat(1500, 1600)),
            temperature: RandomFloat(23, 25),
            humidity: RandomFloat(50, 60),
            soil: RandomFloat(50, 60),
            co2: RandomFloat(1000, 1200),
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('hh:mm:ss')
        }
    }
    mcu.ExecJsonCommand(sensor);
}

function StartSensorRequest(){
    setInterval( Loop , 1000);
}

function Initialize(Mcu){
    console.log('[Info] Demo Version.');
    mcu = Mcu;
    StartSensorRequest();
}

module.exports = {
    Initialize
}