var mcu;
var parAcc = 0;
var moment = require('moment');
var RandomFloat = function (min, max) {
    var value = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(2));
}

function Loop() {
    Sensors();
    ChannelParAcc();
}

function Sensors() {
    let par = RandomFloat(50, 60);
    parAcc += par;
    var sensor = {
        type: 'sensors',
        data: {
            par: par,
            parAccumulation: parAcc,
            vpd: parseInt(RandomFloat(1500, 1600)),
            temperature: RandomFloat(23, 25),
            humidity: RandomFloat(50, 60),
            soil: RandomFloat(50, 60),
            co2: RandomFloat(1000, 1200),
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm:ss')
        }
    }
    mcu.ExecJsonCommand(sensor);
}


var parval = [{
        acc: 0,
        max: 1000000
    },
    {
        acc: 0,
        max: 200000
    }
]

function ChannelParAcc() {
    /*
        data:  Array(4) [Object, Object, Object, Object]
                    acc:0
                    isuse:0
                    max:1500000
                    mode:0
    */
   parval[0].acc += 1000;
   parval[1].acc += 500;

   parval.forEach( par =>{
       if(par.acc >= par.max) par.acc =0;
   });


    var s = [{
            acc: parval[0].acc,
            isuse: 1,
            max:  parval[0].max,
            mode: 1
        },
        {
            acc: 0,
            isuse: 0,
            max: 1000000,
            mode: 0
        },
        {
            acc:  parval[1].acc,
            isuse: 1,
            max:  parval[1].max,
            mode: 1
        },
        {
            acc: 0,
            isuse: 0,
            max: 1000000,
            mode: 0
        }
    ]

    var data = {
        type: 'channel-paracc',
        data: s
    }
    mcu.ExecJsonCommand(data);
}

function StartSensorRequest() {
    setInterval(Loop, 1000);
}

function Initialize(Mcu) {
    console.log('[Info] Demo Version.');
    mcu = Mcu;
    StartSensorRequest();
}

module.exports = {
    Initialize
}