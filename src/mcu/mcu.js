var controlModel = require('./models/control');
var sensorModel = require('./models/sensors');
var statusModel = require('./models/status');
var config = require('../args/config');


var serialport;
var read,write;
var commands;
var realTimeRequestLoop;

var Rx = require('rxjs');
var GetSensorsSubject = new Rx.Subject();
var McuUpdated = new Rx.Subject();

function GetControl(){
    return controlModel.control;
}

function GetSensors(){
    return sensorModel.sensors;
}

function GetStatus(){
    return statusModel;
}

function RequestRealTimeData(cmd){
    if(cmd){
        realTimeRequestLoop = setInterval( ()=>{
            write.next('{sensors}')
            write.next('{control,channelstatus}')
            write.next('{channelparacc}')
            write.next('{freememory}')
        },1000);
    }
    else{
        clearInterval(realTimeRequestLoop);
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

//check is json format or plaintext
function CommandVerify(cmd){
    try{
        let json = JSON.parse(cmd);
        ExecJsonCommand(json);
    }   
    catch(ex){
        // console.log(ex);
        if(cmd == 'RDY'){
            //Initialization Part
            console.log('[Info] Mcu status: RDY!');
            RequestControlSequence();
            RequestRealTimeData(true);
        }
        else if(cmd.startsWith("INFO")){
            let str = cmd.replace('INFO', '');
            console.log('[Info] Mcu board info: ', str);
        }
        else if(cmd == 'UPD'){
            console.log('[Info] Mcu status: UPD!');
            RequestControlSequence();
        }
        else if(cmd == 'DONE'){
            console.log('[Info] Mcu status: REQUESTING DONE!');
            McuUpdated.next(true);
        }
        else{
            console.log('[Warning] Unknown incoming data:', cmd);
        }
    }
}

function ExecJsonCommand(json){
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
            statusModel.gpio[ind] = d.status;
        })
    }
    else if( type == 'sensors'){
        /*
            data: json sensors object from mcu
        */
       sensorModel.sensors = data;
       GetSensorsSubject.next(data);
    }
    else if(type == 'channel-paracc'){
        /*
            data:  Array(4) [Object, Object, Object, Object]
                        acc:0
                        isuse:0
                        max:1500000
                        mode:0
        */
       statusModel.paracc = data;
    }
    else if(type == 'free-memory'){
        statusModel.freeMemory = data;
    }
}

//use by control-api.js
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
        strcmd = "{setbound," + ch + "," + setbound.upper + "," + setbound.lower + "," + chData.sensor + "}";
    } else if (mode == 4) {
        //{irrigation,ch, irr_mode,soil_up, soil_low, par_acc}
        let irr = chData.irrigation;
        strcmd = "{irrigation," + ch + "," + irr.mode + "," + irr.soil_upper + "," + irr.soil_lower + "," + irr.par_accum + "," + irr.working + "}";
    }
    console.log(strcmd);
    write.next(strcmd);
}

function SendDateTime(datetime){
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
   write.next(strcmd);
}

module.exports = {
    SetSerialPort,
    GetControl,
    GetSensors,
    GetStatus,
    SendCommand,
    ExecJsonCommand,
    SendDateTime,
    Subject: {
        GetSensorsSubject,
        McuUpdated
    }
}