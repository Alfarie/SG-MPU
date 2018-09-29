var model = require('./models/model');
var sensorsModel = require('./models/sensors');
var statusModel = require('./models/status');
var controlModel = require('./models/control');


function Update(data) {
    var header = data.header;
    var data = data.data;
    if (header == 'sensors') {
        sensorsModel.sensors = data;
    } else if (header == 'datetime') {
        statusModel.datetime = data;
    }
}

function CommandVerify(cmd) {
    var match = cmd.match(/\{[\w\,\-\.\:\[\]]+\}/);
    if (match != null) return true;
    else return false;
}

function ReplaceAll(str, search, replacement) {
    var target = str;
    return target.replace(new RegExp(search, 'g'), replacement);
}

function SplitCommand(cmd) {
    cmd = ReplaceAll(cmd, '{', '');
    cmd = cmd.split('}');
    cmd.splice(cmd.length - 1, 1);
    return cmd;
}

function ExtractCommand(cmd) {
    if (CommandVerify('{' + cmd + '}')) {
        var cmdarr = cmd.split(',');
        var header = cmdarr[0].split('-');
        cmdarr.splice(0, 1);
        var craftedJson = {};
        if (header[0] == 'st') craftedJson = StatusCraft(header, cmdarr);
        else if (header[0] == 'ct') craftedJson = ControlCraft(header, cmdarr);
        else if (header[0] == 'se') craftedJson = SettingCraft(header, cmdarr);
        Update(craftedJson);
        return craftedJson;
    } else return null;
}

function StatusCraft(header, cmdarr) {
    var craftedJson = {}
    if (header[1] == 'sensors') {
        cmdarr = cmdarr.map(Number);
        let keys = Object.keys(model.sensors);
        keys.forEach((key, ind) => {
            craftedJson[key] = cmdarr[ind]
        });
    } else if (header[1] == 'datetime') {
        let keys = Object.keys(model.datetime);
        keys.forEach((key, ind) => {
            craftedJson[key] = cmdarr[ind]
        });
    }
    else if(header[1] == 'gpio'){
        statusModel.gpio = cmdarr.map(Number)
    }
    else if(header[1] == 'water'){
        var water = { type: "", data:{ crt:  0 , max: 0 }};
        water.type = "waterprocess-" + cmdarr[0];
        water.data.crt = parseFloat(cmdarr[1]);
        water.data.max = parseFloat(cmdarr[2]);
        statusModel.waterStatus = water;
    }
    else if(header[1] == 'co2'){
        var co2 = {
            type: "co2-status", 
            data: {
                mode: 0,
                crt: 0,
                status: 0,
                sensor: 0
            }
        }
        co2.data.mode = parseFloat(cmdarr[0]);
        co2.data.crt = parseFloat(cmdarr[1]);
        co2.data.status = parseFloat(cmdarr[2]);
        co2.data.sensor = parseFloat(cmdarr[3]);
        statusModel.co2Status = co2;
    }
    else if(header[1] == 'ec'){
        var ec = {
            type: "ec-status", 
            data: {
                mode: 0,
                crt: 0,
                status: 0,
                sensor: 0
            }
        }
        ec.data.mode = parseFloat(cmdarr[0]);
        ec.data.crt = parseFloat(cmdarr[1]);
        ec.data.status = parseFloat(cmdarr[2]);
        ec.data.sensor = parseFloat(cmdarr[3]);
        statusModel.ecStatus = ec;
    }
    else if(header[1] == 'ph'){
        var ph = {
            type: "ph-status", 
            data: {
                mode: 0,
                crt: 0,
                status: 0,
                sensor: 0
            }
        }
        ph.data.mode = parseFloat(cmdarr[0]);
        ph.data.crt = parseFloat(cmdarr[1]);
        ph.data.status = parseFloat(cmdarr[2]);
        ph.data.sensor = parseFloat(cmdarr[3]);
        statusModel.phStatus = ph;
    }
    else if(header[1] == 'paracc'){
        var ch = parseInt(cmdarr[0]) - 1;
        var acc = parseInt(cmdarr[1]);
        var setpoint = parseInt(cmdarr[2]);
        var mode = parseInt(cmdarr[3]);
        var data = {
            par_acc: acc,
            setpoint: setpoint,
            mode: mode
        }
        statusModel.paracc[ch] = data;
        // console.log(statusModel.paracc);
    }
    return {
        data: craftedJson,
        header: header[1]
    };
}


var isUpdating = false;
function ControlCraft(header, cmdarr) {
    var craftedJson = {}
    if(header[1] == 'chst'){
        var ch = parseInt(cmdarr[0]);
        var mode = parseInt(cmdarr[1]);
        var sensor = parseInt(cmdarr[2]);
        var status = parseInt(cmdarr[3]);
        controlModel.control[ch-1].mode = mode;
        controlModel.control[ch-1].sensor = sensor;
        controlModel.control[ch-1].ch = ch;
        controlModel.control[ch-1].manual.status = status;
        console.log('[Info] Recieved: channel-mode-sensor from channel ' + ch);
    }
    else if(header[1] == 'timer'){
        var ch = parseInt(cmdarr[0]);
        var mode = parseInt(cmdarr[1]);
        var timerstr = cmdarr[2];
        // [[300-480]-[540-720]-[780-960]-[1020-1200]-[1260-1439]]
        timerstr = ReplaceAll(timerstr,'-', ',');
        var timerlist = JSON.parse( "{\"list\": " + timerstr +" }")
        controlModel.control[ch-1].timer.list = timerlist.list;

        console.log('[Info] Recieved: timer from channel ' + ch);
    }
    else if(header[1] == 'setpoint'){
        var ch = parseInt(cmdarr[0]);
        var working = parseFloat(cmdarr[1]);
        var setpoint = parseFloat(cmdarr[2]);
        var detecting = parseFloat(cmdarr[3]);
        controlModel.control[ch-1].setpoint.working = working;
        controlModel.control[ch-1].setpoint.detecting = detecting;
        controlModel.control[ch-1].setpoint.setpoint = setpoint;
        
        console.log('[Info] Recieved: setpoint from channel ' + ch);
    }
    else if(header[1] == 'setbound'){
        var ch = parseInt(cmdarr[0]);
        var upper = parseFloat(cmdarr[1]);
        var lower = parseFloat(cmdarr[2]);
        controlModel.control[ch-1].setbound.upper = upper;
        controlModel.control[ch-1].setbound.lower = lower;
        console.log('[Info] Recieved: setbound from channel ' + ch);
    }
    else if(header[1] == 'sbtiming'){
        var ch = parseInt(cmdarr[0]);
        var upper = parseFloat(cmdarr[1]);
        var lower = parseFloat(cmdarr[2]);
        var detecting = parseFloat(cmdarr[2]);
        var working = parseFloat(cmdarr[2]);
        controlModel.control[ch-1].sbtiming.upper = upper;
        controlModel.control[ch-1].sbtiming.lower = lower;
        controlModel.control[ch-1].sbtiming.detecting = detecting;
        controlModel.control[ch-1].sbtiming.working = working;
        console.log('[Info] Recieved: sbtiming from channel ' + ch);
    }
    else if(header[1] == 'irrigation'){
        var ch = parseInt(cmdarr[0]);
        controlModel.control[ch-1].irrigation.soil_upper = parseFloat(cmdarr[1]);
        controlModel.control[ch-1].irrigation.soil_lower = parseFloat(cmdarr[2]);
        controlModel.control[ch-1].irrigation.soil_detecting = parseFloat(cmdarr[3]);
        controlModel.control[ch-1].irrigation.soil_working = parseFloat(cmdarr[4]);
        controlModel.control[ch-1].irrigation.par_soil_setpoint = parseFloat(cmdarr[5]);
        controlModel.control[ch-1].irrigation.par_detecting = parseFloat(cmdarr[6]);
        controlModel.control[ch-1].irrigation.par_working = parseFloat(cmdarr[7]);
        controlModel.control[ch-1].irrigation.par_acc = parseFloat(cmdarr[8]);
        controlModel.control[ch-1].irrigation.mode = parseFloat(cmdarr[9]);
        console.log('[Info] Recieved: Irrigation from channel ' + ch);
    }
    else if(header[1] == 'advcond'){
        // console.log(cmdarr)
        /*
            "advcond": {
                "timer_list": [],
                "timer_size": 0,
                "timer_flag": false,
                "sensor_condition": 3,
                "sensor_setpoint": 30,
                "sensor_flag": false,
                "sensor": 5,
                "setpoint": 600,
                "working": 15,
                "detecting": 30
            }
                            "{ct-advcond," + String(i + 1) +
                           "," + String(rom_channel[i].advcond.setpoint) +
                           "," + String(rom_channel[i].advcond.working) +
                           "," + String(rom_channel[i].advcond.detecting) +
                           "," + String(rom_channel[i].advcond.sensor) +
                           "," + String(rom_channel[i].advcond.direction) +
                           "," + String(rom_channel[i].advcond.sensor_condition) +
                           "," + String(rom_channel[i].advcond.sensor_direction) +
                           "," + String(rom_channel[i].advcond.sensor_setpoint) +
                           "," + String(rom_channel[i].advcond.sensor_flag) +
                           "," + String(rom_channel[i].advcond.timer_flag);
        */
       var ch = parseInt(cmdarr[0]);
       controlModel.control[ch-1].advcond.setpoint = parseFloat(cmdarr[1]);
       controlModel.control[ch-1].advcond.working = parseFloat(cmdarr[2]);
       controlModel.control[ch-1].advcond.detecting = parseFloat(cmdarr[3]);
       controlModel.control[ch-1].advcond.sensor = parseInt(cmdarr[4]);
       controlModel.control[ch-1].advcond.direction = parseInt(cmdarr[5]);
       controlModel.control[ch-1].advcond.sensor_condition = parseInt(cmdarr[6]);
       controlModel.control[ch-1].advcond.sensor_direction = parseInt(cmdarr[7]);
       controlModel.control[ch-1].advcond.sensor_setpoint = parseFloat(cmdarr[8]);
       controlModel.control[ch-1].advcond.sensor_flag = parseInt(cmdarr[9]) == 1? true:false
       controlModel.control[ch-1].advcond.timer_flag = parseInt(cmdarr[10]) == 1? true:false
       controlModel.control[ch-1].advcond.timer_list = JSON.parse(ReplaceAll(cmdarr[11],'-', ','));
       console.log('[Info] Recieved: Advance Control from channel ' + ch);
    }
    else if(header[1] == 'advsb'){
        // console.log(cmdarr)
        /*
            "advcond": {
                "timer_list": [],
                "timer_size": 0,
                "timer_flag": false,
                "sensor_condition": 3,
                "sensor_setpoint": 30,
                "sensor_flag": false,
                "sensor": 5,
                "setpoint": 600,
                "working": 15,
                "detecting": 30
            }
                            "{ct-advcond," + String(i + 1) +
                           "," + String(rom_channel[i].advcond.setpoint) +
                           "," + String(rom_channel[i].advcond.working) +
                           "," + String(rom_channel[i].advcond.detecting) +
                           "," + String(rom_channel[i].advcond.sensor) +
                           "," + String(rom_channel[i].advcond.direction) +
                           "," + String(rom_channel[i].advcond.sensor_condition) +
                           "," + String(rom_channel[i].advcond.sensor_direction) +
                           "," + String(rom_channel[i].advcond.sensor_setpoint) +
                           "," + String(rom_channel[i].advcond.sensor_flag) +
                           "," + String(rom_channel[i].advcond.timer_flag);
        */
       var ch = parseInt(cmdarr[0]);
       controlModel.control[ch-1].advsb.upper = parseFloat(cmdarr[1]);
       controlModel.control[ch-1].advsb.lower = parseFloat(cmdarr[2]);
       controlModel.control[ch-1].advsb.sensor = parseInt(cmdarr[3]);
       controlModel.control[ch-1].advsb.direction = parseInt(cmdarr[4]);
       controlModel.control[ch-1].advsb.sensor_condition = parseInt(cmdarr[5]);
       controlModel.control[ch-1].advsb.sensor_direction = parseInt(cmdarr[6]);
       controlModel.control[ch-1].advsb.sensor_setpoint = parseFloat(cmdarr[7]);
       controlModel.control[ch-1].advsb.sensor_flag = parseInt(cmdarr[8]) == 1? true:false
       controlModel.control[ch-1].advsb.timer_flag = parseInt(cmdarr[9]) == 1? true:false
       controlModel.control[ch-1].advsb.timer_list = JSON.parse(ReplaceAll(cmdarr[10],'-', ','));
       console.log('[Info] Recieved: Advance Setbound from channel ' + ch);
    }

    else if(header[1] == 'advsbt'){
        // console.log(cmdarr)
        /*
            "advcond": {
                "timer_list": [],
                "timer_size": 0,
                "timer_flag": false,
                "sensor_condition": 3,
                "sensor_setpoint": 30,
                "sensor_flag": false,
                "sensor": 5,
                "setpoint": 600,
                "working": 15,
                "detecting": 30
            }
                            "{ct-advcond," + String(i + 1) +
                           "," + String(rom_channel[i].advcond.setpoint) +
                           "," + String(rom_channel[i].advcond.working) +
                           "," + String(rom_channel[i].advcond.detecting) +
                           "," + String(rom_channel[i].advcond.sensor) +
                           "," + String(rom_channel[i].advcond.direction) +
                           "," + String(rom_channel[i].advcond.sensor_condition) +
                           "," + String(rom_channel[i].advcond.sensor_direction) +
                           "," + String(rom_channel[i].advcond.sensor_setpoint) +
                           "," + String(rom_channel[i].advcond.sensor_flag) +
                           "," + String(rom_channel[i].advcond.timer_flag);
        */
       var ch = parseInt(cmdarr[0]);
       controlModel.control[ch-1].advsbt.upper = parseFloat(cmdarr[1]);
       controlModel.control[ch-1].advsbt.lower = parseFloat(cmdarr[2]);
       controlModel.control[ch-1].advsbt.working = parseFloat(cmdarr[3]);
       controlModel.control[ch-1].advsbt.detecting = parseFloat(cmdarr[4]);
       controlModel.control[ch-1].advsbt.sensor = parseInt(cmdarr[5]);
       controlModel.control[ch-1].advsbt.direction = parseInt(cmdarr[6]);
       controlModel.control[ch-1].advsbt.sensor_condition = parseInt(cmdarr[7]);
       controlModel.control[ch-1].advsbt.sensor_direction = parseInt(cmdarr[8]);
       controlModel.control[ch-1].advsbt.sensor_setpoint = parseFloat(cmdarr[9]);
       controlModel.control[ch-1].advsbt.sensor_flag = parseInt(cmdarr[10]) == 1? true:false
       controlModel.control[ch-1].advsbt.timer_flag = parseInt(cmdarr[11]) == 1? true:false
       controlModel.control[ch-1].advsbt.timer_list = JSON.parse(ReplaceAll(cmdarr[12],'-', ','));
       console.log('[Info] Recieved: Advance Timing Setbound from channel ' + ch);
    }
    //{ct-water,0,0,900,900}
    else if(header[1] == 'water'){
        var isCir = parseInt(cmdarr[0]);
        var isFill = parseFloat(cmdarr[1]);
        var cirTime = parseFloat(cmdarr[2]);
        var waitTime = parseFloat(cmdarr[3]);
        controlModel.waterControl.isCir = isCir;
        controlModel.waterControl.isFill = isFill;
        controlModel.waterControl.cirTime = cirTime;
        controlModel.waterControl.waitTime = waitTime;
        console.log('[Info] Recieved: water from channel ');
    }
    if(!isUpdating){
        isUpdating = true;
        setTimeout( ()=>{
            require('../aws-online/aws-transmiter').updateControlStatus();
            isUpdating = false;
        },2000);

    }
    return {
        data: craftedJson,
        header: header[1]
    };
}

function SettingCraft(header, cmdarr) {
    var craftedJson = {};

    if(header[1] == 'cal'){
        var ec = parseInt(cmdarr[0]);
        var ph = parseFloat(cmdarr[1]);
        controlModel.calibration.ec = ec;
        controlModel.calibration.ph = ph;
        console.log('[Info] Recieved: calibration from channel ');
    }

    return {
        data: craftedJson,
        header: header[1]
    };
}

module.exports = {
    ExtractCommand,
    SplitCommand
}

// var cmd = "{st-sensors,0.00,0.00,0.00,0.00,-46.85,-6.00,-1.00,0}";
// var cmd2 = "{ct-chst,1,1,1,0}{ct-chst,2,0,4,0}{ct-chst,3,0,5,0}{ct-chst,4,2,6,0}"
// SplitCommand(cmd2);