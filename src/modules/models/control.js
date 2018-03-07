var fs = require('fs');

const channel1 = {
    ch: 1,
    mode: 0,
    sensor: 1,
    manual: {
        status: 0
    },
    timer: {
        size: 3,
        mode:0,
        list: [ [0,60], [120,180], [300,360]]
    },
    setpoint:{
        setpoint: 0,
        working: 15,
        detecting: 15
    },
    setbound: {
        start: 0,
        stop: 0
    },
    irrigation: {
        soil: {
            start: 0,
            stop: 0
        },
        par_accum: 1.0,
        mode: 1
    },
    misting:{
        vpd: {
            start: 0,
            stop: 0
        },
        temp:{
            start: 0,
            stop: 0
        }
    }
}
const channel2 = {
    ch: 1,
    mode: 0,
    sensor: 1,
    manual: {
        status: 0
    },
    timer: {
        size: 3,
        mode:0,
        list: [ [0,60], [120,180], [300,360]]
    },
    setpoint:{
        setpoint: 0,
        working: 15,
        detecting: 15
    },
    setbound: {
        start: 0,
        stop: 0
    },
    irrigation: {
        soil: {
            start: 0,
            stop: 0
        },
        par_accum: 1.0,
        mode: 1
    },
    misting:{
        vpd: {
            start: 0,
            stop: 0
        },
        temp:{
            start: 0,
            stop: 0
        }
    }
}
const channel3 = {
    ch: 3,
    mode: 0,
    sensor: 1,
    manual: {
        status: 0
    },
    timer: {
        size: 3,
        mode:0,
        list: [ [0,60], [120,180], [300,360]]
    },
    setpoint:{
        setpoint: 0,
        working: 15,
        detecting: 15
    },
    setbound: {
        start: 0,
        stop: 0
    },
    irrigation: {
        soil: {
            start: 0,
            stop: 0
        },
        par_accum: 1.0,
        mode: 1
    },
    misting:{
        vpd: {
            start: 0,
            stop: 0
        },
        temp:{
            start: 0,
            stop: 0
        }
    }
}
const channel4 = {
    ch: 4,
    mode: 0,
    sensor: 1,
    manual: {
        status: 0
    },
    timer: {
        size: 3,
        mode:0,
        list: [ [0,60], [120,180], [300,360]]
    },
    setpoint:{
        setpoint: 0,
        working: 15,
        detecting: 15
    },
    setbound: {
        start: 0,
        stop: 0
    },
    irrigation: {
        soil: {
            start: 0,
            stop: 0
        },
        par_accum: 1.0,
        mode: 1
    },
    misting:{
        vpd: {
            start: 0,
            stop: 0
        },
        temp:{
            start: 0,
            stop: 0
        }
    }
}
var control = [
    channel1, channel2, channel3, channel4
]

var data = fs.readFileSync(__dirname + '/control.json')
control = JSON.parse(data.toString());

module.exports = {
    control: control ,
    saveFile: function(jsonData){
        fs.writeFileSync(__dirname + '/control.json', JSON.stringify(jsonData), function(err){
            console.log(err);
        });
    }
}