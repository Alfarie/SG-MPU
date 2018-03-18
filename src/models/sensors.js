var samplingTime = 1000
var parAccumulation = 0;
var parAccumulationReset = 1.5;
setInterval( ()=>{
    module.exports.parAccumulation += module.exports.sensor.par;
    if(module.exports.parAccumulation >= parAccumulationReset* 1.0 * 10^6){
        module.exports.parAccumulation = 0
    }
}, samplingTime);
module.exports = {
    sensor: {
        par: 53,
        vpd: 1532,
        temperature: 23,
        humidity:54,
        soil: 62,
        co2: 1000,
        date: '2017-01-01',
        time: '00:00:00'
    },
    parAccumulation: parAccumulation,
    parAccumulationReset: parAccumulationReset,
    shortLogger:[]
}