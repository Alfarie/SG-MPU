var controlModel = require('./models/control');
var sensorModel = require('./models/sensors');
var config = require('../args/config');


var serialport;
var read,write;
var commands;
var sensorRequestSetInterlval;

var Rx = require('rxjs');
var GetSensorsSubject = new Rx.Subject();
var McuUpdated = new Rx.Subject();

function GetControl(){
    return controlModel.control;
}

function GetSensors(){
    return sensorModel.sensors;
}

function RequestSensors(cmd){
    if(cmd){
        sensorRequest = setInterval( ()=>{write.next('{sensors}')},1000);
    }
    else{
        clearInterval(sensorRequest);
    }
}

function RequestControlSequence(){
    console.log('[Info] Requesting: control');
    write.next('{control,channelstatus}');
    write.next('{control,manual}');
    write.next('{control,timer}');
    write.next('{control,setpoint}');
    write.next('{control,setbound}');
    write.next('{control,irrigation}');
    write.next('{done}')
}

function SetSerialPort(serial){
    serialport = serial;
    read = serial.read;
    write = serial.write;

    serial.onConnect.subscribe (data=>{
        console.log("[Info] Mcu checking status...");
        write.next("{checkstatus}");
    });

    read.subscribe( data=>{
        CommandVerify(data);
    });
}

function CommandVerify(cmd){
    try{
        let json = JSON.parse(cmd);
        ExecCommand(json);
    }   
    catch(ex){
        // console.log(ex);
        if(cmd == 'RDY'){
            //Initialization Part
            console.log('[Info] Mcu status: RDY!');
            RequestControlSequence();
            RequestSensors(true);
        }
        else if(cmd == 'UPD'){
            console.log('[Info] Mcu status: UPD!');
            RequestControlSequence();
        }
        else if(cmd == 'DONE'){
            console.log('[Info] Mcu status: REQUEST DONE!');
            McuUpdated.next(true);
        }
        else{
            console.log('[Warning] Unknown incoming data:', cmd);
        }
    }
}

function ExecCommand(json){
    var type = json.type;
    var data = json.data;
    // control setting format: 'control-[type]'
    if( type.startsWith('control')){
        /*
            split 'contorl-[type]' to only [type]
            ct: control type [manual, timer, setpoint, setbound, irrigation]
        */
        let ct = type.split('-')[1];
        data.forEach( (chdata,ind ) =>{
            let ch = ind + 1;
            let d = data[ind];
            controlModel.control[ind][ct] = d[ct];
        })
        console.log('[Info] Recieved: ' + type);
    }
    else if( type == 'channel-status'){
        data.forEach( (d,ind)=>{
            controlModel.control[ind].ch = ind + 1;
            controlModel.control[ind].mode = d.mode;
            controlModel.control[ind].sensor = d.sensor;
        })
    }
    else if( type == 'sensors'){
        /*
            data: json sensors object from mcu
        */
       sensorModel.sensors = data;
       GetSensorsSubject.next(data);
    }
}

function SendCommand(chData){
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
    } else if (mode == 3) {
        let setbound = chData.setbound;
        // {setbound, channel, upper,lower,sensor}
        strcmd = "{setbound," + ch + "," + setbound.lower + "," + setbound.upper + "," + chData.sensor + "}";
    } else if (mode == 4) {
        //{irrigation,ch, irr_mode,soil_up, soil_low, par_acc}
        let irr = chData.irrigation;
        strcmd = "{irrigation," + ch + "," + irr.mode + "," + irr.soil_upper + "," + irr.soil_lower + "," + irr.par_accum + "}";
    }
    console.log('[Info] Updating: ' + ch + ' ' + mode);
    console.log(strcmd);
    write.next(strcmd);
}

module.exports = {
    SetSerialPort,
    GetControl,
    GetSensors,
    SendCommand,
    ExecCommand,
    Subject: {
        GetSensorsSubject,
        McuUpdated
    }
}