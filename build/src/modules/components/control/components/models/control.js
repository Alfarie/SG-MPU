const channel = {
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

export default{
    control: [channel,channel,channel,channel]
}