var datetime = {
    date: '2018-01-01',
    time: '00:00:00'
}
var freeMemory = 0;
var gpio = [0,0,0,0,0,0];
var paracc = [
    {mode: 1, par_acc:0, setpoint: 0},
    {mode: 1, par_acc:0, setpoint: 0},
    {mode: 1, par_acc:0, setpoint: 0},
    {mode: 1, par_acc:0, setpoint: 0}
]
var waterStatus =  { type: "waterprocess-fill", data:{ crt:  0 , max: 0 }};
var co2Status = {
    type: "co2-status", 
    data: {
        mode: 0,
        crt: 0,
        status: 0,
        sensor: 0
    }
}
var phStatus = {
    type: "ph-status", 
    data: {
        mode: 0,
        crt: 0,
        status: 0,
        sensor: 0
    }
}
var ecStatus = {
    type: "ec-status", 
    data: {
        mode: 0,
        crt: 0,
        status: 0,
        sensor: 0
    }
}

module.exports = {
    freeMemory,
    gpio,
    paracc,
    waterStatus,
    co2Status,
    phStatus,
    ecStatus,
    datetime
}