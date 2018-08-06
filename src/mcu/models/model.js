
var control = {
    manual: {
        status: 0
    },
    timer: {
        mode: 0,
        list: []
    },
    setpoint:{
        setpoint: 0,
        working: 0,
        detecting: 0
    },
    setbound: {
        upper: 0,
        lower: 0
    },
    irrigation: {
        soil_upper: 0,
        soil_lower: 0,
        par_accum: 0,
        working: 0,
        mode: 0
    }
}

/*
    {sensors, ec, ph, water_temp, temperature, humidity, co2, light, floating}
*/
var sensors = {
    soil:0,
    temperature:0,
    humidity: 0,
    vpd: 0,
    par: 0,
    co2: 0,
    paracc: 0
}

var datetime = {
    date: '2018-01-01',
    time: '00:00:00'
}

var water = { type: "waterprocess-fill", data:{ crt:  0 , max: 0 }};

module.exports = {
    control,
    sensors,
    datetime,
    water
}