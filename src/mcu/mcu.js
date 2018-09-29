var controlModel = require('./models/control');
var sensorModel = require('./models/sensors');
var statusModel = require('./models/status');
var config = require('../args/config');
var CmdProcess = require('./cmdprocessing');
var wifi = require('../wifi/wifi');

var serialport;
var read, write;
var commands;
var realTimeRequestLoop;

var Rx = require('rxjs');
var GetSensorsSubject = new Rx.Subject();
var McuUpdated = new Rx.Subject();

function GetControl() {
    return controlModel.control;
}

function GetWaterControl() {
    return controlModel.waterControl;
}

function GetCalibration() {
    return controlModel.calibration;
}

function GetSensors() {
    return sensorModel.sensors;
}

function GetDateTime(){
    return sensorModel.datetime
}

function GetStatus() {
    return statusModel;
}

function RequestRealTimeData(flag) {
    if (flag) {
        realTimeRequestLoop = setInterval(() => {
            write.next('{Gsensors}')
            write.next('{Gdatetime}')
            write.next('{Gparacc}')
            write.next('{Ggpio}')
        }, 1000);
    } else {
        clearInterval(realTimeRequestLoop);
    }
}

function RequestControlSequence() {
    console.log('[Info] Requesting: control');
    write.next('{Gcontrol,channelstatus,1,4}');
    write.next('{Gcontrol,timer,1,4}');
    write.next('{Gcontrol,setbound,1,4}'); 
    write.next('{Gcontrol,setpoint,1,4}'); 
    write.next('{Gcontrol,sbtiming,1,4}'); 
    write.next('{Gcontrol,irrigation,1,4}');
    write.next('{Gcontrol,advcond,1,4}');
    write.next('{Gcontrol,advsb,1,4}');
    write.next('{Gcontrol,advsbt,1,4}');
    // write.next('{Gwater-control}')
    // write.next('{getcal}')
    write.next('{done}')
}

function SetSerialPort(serial) {
    serialport = serial;
    read = serial.read;
    write = serial.write;

    serial.onConnect.subscribe(data => {
        console.log("[Info] Mcu checking status...");
        write.next("{checkstatus}");
    });

    serial.onDisconnect.subscribe(data => {
        console.log('[Info] Serial Port disconencted');
        console.log('[Info] Requesting data from mcu: cleared');
        RequestRealTimeData(false);
    })

    read.subscribe(data => {
        CommandVerify(data);
    });
}

//check is json format or plaintext
function CommandVerify(cmd) {
    if (cmd == 'RDY') {
        //Initialization Part
        console.log('[Info] Mcu status: RDY!');
        RequestRealTimeData(false);
        setTimeout(() => {
            RequestControlSequence();
            RequestRealTimeData(true);
        }, 2000);
    } else if (cmd.startsWith("INFO")) {
        let str = cmd.replace('INFO', '');
        console.log('[Info] Mcu board info: ', str);
    } else if (cmd.startsWith('UPD')) {
        var resarr = cmd.split('-');
        var type = resarr[1];
        var ch = (resarr.length > 2) ? resarr[2] : null;
        if (type == 'WATER') write.next('{Gwater-control}');
        else if (type == 'SETPOINT') write.next('{Gcontrol,setpoint,' + ch + ',1}');
        else if (type == 'SETBOUND') write.next('{Gcontrol,setbound,' + ch + ',1}');
        else if (type == 'IRR') write.next('{Gcontrol,irrigation,' + ch + ',1}');
        else if (type == 'TIMER') write.next('{Gcontrol,timer,' + ch + ',1}');
        else if (type == 'MANUAL') write.next('{Gcontrol,manual,' + ch + ',1}');
        else if (type == 'ADVCOND') write.next('{Gcontrol,advcond,' + ch + ',1}');
        else if (type == 'ADVSB') write.next('{Gcontrol,advsb,' + ch + ',1}');
        else if (type == 'ADVSBT') write.next('{Gcontrol,asbsbt,' + ch + ',1}');
        else if (type == 'SETCAL') write.next('{getcal}');
        if (ch) write.next('{Gcontrol,channelstatus,' + ch + ',1}');
    } else if (cmd == 'DONE') {
        console.log('[Info] Mcu status: REQUESTING DONE!');
        McuUpdated.next(true);
    }
    else if (cmd == 'WIFI-RST'){
        console.log('[Info] WIFI RESET TO AP MODE');
        wifi.ap.StartAP('SG-Default', 'raspberry');
    }
    // if cmd is not json format
    else {
        var cmdarr = CmdProcess.SplitCommand(cmd);
        cmdarr.forEach(cmd => {
            var jsonCmd = CmdProcess.ExtractCommand(cmd);
            if (jsonCmd) {
                if (jsonCmd.header == 'sensors')
                    GetSensorsSubject.next(jsonCmd.data);
                else if(jsonCmd.header == 'datetime')
                    sensorModel.datetime = jsonCmd.data;
                
            } else {
                console.log('[Warning] Unknown incoming data:', cmd);
            }
        });
    }
    serialport.setState('done');
}


//use by control-api.js
function SendCommand(chData) {
    var ch = chData.ch;
    var mode = chData.mode;
    var strmcd = "";
    if (mode == 0) {
        strcmd = "{manual," + ch + "," + chData.manual.status + "}";
    } else if (mode == 1) {
        // {timer,1,1,20-60,90-150,200-260}
        let list = chData.timer.list;
        let strlist = []
        strcmd = "{timer," + ch + "," + chData.timer.mode + ",";
        list.forEach(l => {
            strlist.push(l.join('-'))
        });
        strcmd += strlist.join(',');
        strcmd += "}";
    } else if (mode == 2) {
        //{setpoint,channel,setpoint_value, working, detecting, sensor}
        let setpoint = chData.setpoint;
        strcmd = "{setpoint," + ch + "," + setpoint.setpoint + "," + setpoint.working + "," + setpoint.detecting + "," + chData.sensor + "}"
    } 
    else if (mode == 3) {
        let setbound = chData.setbound;
        // {setbound, channel, upper,lower,sensor}
        strcmd = "{setbound," + ch + "," + setbound.upper + "," + setbound.lower + "," + chData.sensor + "}";
    } 
    else if (mode == 4) {
        let sbtiming = chData.sbtiming;
        // {setbound, channel, upper,lower,sensor}
        strcmd = "{sbtiming," + ch + "," + sbtiming.upper + "," + sbtiming.lower  + "," + sbtiming.detecting  + "," + sbtiming.working + "," + chData.sensor + "}";
    } 
    else if (mode == 5) {
        //{irrigation,ch, irr_mode,soil_up, soil_low, par_acc}
        let irr = chData.irrigation;
        strcmd = "{irrigation," + ch + "," + irr.mode + "," + irr.soil_upper + "," + irr.soil_lower + "," + irr.soil_detecting + "," + irr.soil_working + "," + irr.par_soil_setpoint + "," + irr.par_working + "," + irr.par_detecting  + "," + irr.par_acc + "}";
    } 
    else if (mode == 6) {
         //{advancecond, ch, setpoint, working, detecting, sensor, direction , sensor_cond, sensor_direction, sensor_set,
    //              sensor_flag, timer_flag, 480-1080,1100-1120}
        var advcond = chData.advcond;
        var sensor_flag = advcond.sensor_flag?1:0;
        var timer_flag = advcond.timer_flag?1:0;
        strcmd = "{advancecond," + ch + "," + advcond.setpoint + "," + advcond.working + "," + advcond.detecting + "," + advcond.sensor + "," + advcond.direction + "," + advcond.sensor_condition + "," + advcond.sensor_direction + "," + advcond.sensor_setpoint + "," + sensor_flag + "," + timer_flag + ",";
        // console.log(advcond.timer_list)
        var strlist = advcond.timer_list.map(l=>l.join('-'));
        strcmd = strcmd + strlist.join(",") + "}";
        
    }
    else if (mode == 7) {
         //{advancecond, ch, setpoint, working, detecting, sensor, direction , sensor_cond, sensor_direction, sensor_set,
    //              sensor_flag, timer_flag, 480-1080,1100-1120}
        var advsb = chData.advsb;
        var sensor_flag = advsb.sensor_flag?1:0;
        var timer_flag = advsb.timer_flag?1:0;
        strcmd = "{advancesb," + ch + "," + advsb.upper + "," + advsb.lower + "," + advsb.sensor + "," + advsb.direction + "," + advsb.sensor_condition + "," + advsb.sensor_direction + "," + advsb.sensor_setpoint + "," + sensor_flag + "," + timer_flag + ",";
        // console.log(advsb.timer_list)
        var strlist = advsb.timer_list.map(l=>l.join('-'));
        strcmd = strcmd + strlist.join(",") + "}";
    }
    else if (mode == 8) {
         //{advancecond, ch, setpoint, working, detecting, sensor, direction , sensor_cond, sensor_direction, sensor_set,
    //              sensor_flag, timer_flag, 480-1080,1100-1120}
        var advsbt = chData.advsbt;
        var sensor_flag = advsbt.sensor_flag?1:0;
        var timer_flag = advsbt.timer_flag?1:0;
        strcmd = "{advancesbt," + ch + "," + advsbt.upper + "," + advsbt.lower+ "," + advsbt.working + "," + advsbt.detecting + "," + advsbt.sensor + "," + advsbt.direction + "," + advsbt.sensor_condition + "," + advsbt.sensor_direction + "," + advsbt.sensor_setpoint + "," + sensor_flag + "," + timer_flag + ",";
        // console.log(advsbt.timer_list)
        var strlist = advsbt.timer_list.map(l=>l.join('-'));
        strcmd = strcmd + strlist.join(",") + "}";
    }
    console.log(strcmd);
    write.next(strcmd);
}

function SendDateTime(datetime) {
    /*
        dt: {date: "2017-01-01", time: "10:46"}
    */
    var date = datetime.date.split('-');
    var time = datetime.time.split(':');
    var payload = {
        day: parseInt(date[2]),
        month: parseInt(date[1]),
        year: parseInt(date[0]) % 2000,
        hour: parseInt(time[0]),
        min: parseInt(time[1])
    }

    let strcmd = '{datetime,' + payload.day + ',' +
        payload.month + ',' +
        payload.year + ',' +
        payload.hour + ',' +
        payload.min + '}';
    console.log(strcmd);
    write.next(strcmd);
}

function SendWaterProcess(control) {
    /*
        {
            isCir: true,
            isFill: true,
            cirTime: 900,
            waitingTime: 900
        }
    */
    var data = control.control
    var isCir = (data.isCir) ? 1 : 0;
    var isFill = (data.isFill) ? 1 : 0;
    var cirTime = data.cirTime;
    var waitingTime = data.waitTime;
    var strcmd = "{waterprocess," + isCir + "," + isFill + "," + data.cirTime + "," + data.waitTime + "}";
    console.log(strcmd);
    write.next(strcmd);
}

function SendCalibration(cal) {
    var strcmd = "{setcal," + cal.ec + "," + cal.ph + "}";
    console.log(strcmd);
    write.next(strcmd);
}

module.exports = {
    SetSerialPort,
    GetControl,
    GetWaterControl,
    GetCalibration,
    GetSensors,
    GetDateTime,
    GetStatus,
    SendCommand,
    SendWaterProcess,
    SendCalibration,
    SendDateTime,
    Subject: {
        GetSensorsSubject,
        McuUpdated
    }
}