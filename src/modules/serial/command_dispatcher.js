var control = require('../models/control').control;
var sensors = require('../models/sensors');
var saveFile = require('../models/control.js').saveFile;
var write = null;


var RequestSensor = function(){
    write.next("{sensors}");
}

var SendDateTime = function(datetime){
    var date = datetime.date.split('-');
    var time = datetime.time.split(':');
    console.log(date,time);
    var payload = {
        day: parseInt(date[2]),
        month: parseInt(date[1]),
        year: parseInt(date[0]) % 2000,
        hour: parseInt(time[0]),
        min: parseInt(time[1])
    }

    console.log(payload);
    let strcmd = '{datetime,' + payload.day +',' + 
                             payload.month +','+
                             payload.year +',' + 
                             payload.hour +','+ 
                             payload.min + '}';
    write.next(strcmd);
}

var ControlFilter = function (data) {
    control[data.ch - 1].mode = data.mode;
    control[data.ch - 1].ch = data.ch;
    control[data.ch - 1].sensor = data.sensor;
    if (data.mode == 0) {
        control[data.ch - 1].manual = data.manual;
    } else if (data.mode == 1) {
        control[data.ch - 1].timer = data.timer;
    } else if (data.mode == 2) {
        control[data.ch - 1].setpoint = data.setpoint;
    } else if (data.mode == 3) {
        control[data.ch - 1].setbound = data.setbound;
    } else if (data.mode == 4) {
        control[data.ch - 1].irrigation = data.irrigation;
    }
    saveFile(control);
}
module.exports = {
    setWrite(wr){
        write = wr;
        
        setInterval(RequestSensor, 1000);
    },
    CommandProcess: function (cmd) {
        try {
            var jsonData = JSON.parse(cmd);
            if (jsonData.type == 'control') {
                jsonData.data.forEach((d) => {
                    ControlFilter(d);
                });
            }
            if(jsonData.type == 'sensor'){
                sensors.sensor = jsonData.data;
                
            }
        } catch (e) {
            
        }
    },
    SendCommand(chData,updateChannel){
        var ch = chData.ch;
        var mode = chData.mode;
        var strcmd = ""
    
        if(ch != (updateChannel+1)){
            ControlFilter(chData);
            return;
        }
        if(mode == 0){
            strcmd = "{manual," + ch + "," + chData.manual.status + "}";
        }
        else if(mode == 1){
            // {timer,1,1,20-60,90-150,200-260}
            let list = chData.timer.list;
            let strlist = []
            strcmd = "{timer," + ch + "," + chData.timer.mode + ",";
            list.forEach( l =>{
                strlist.push(l.join('-'))
            })
            strcmd += strlist.join(',');
            strcmd += "}";
        }
        else if(mode == 2){
            //{setpoint,channel,setpoint_value, working, detecting, sensor}
            let setpoint = chData.setpoint;
            strcmd = "{setpoint," + ch + "," +  setpoint.setpoint + "," + setpoint.working + "," + setpoint.detecting + "," + chData.sensor + "}"
        }
        else if(mode == 3){
            let setbound = chData.setbound;
            // {setbound, channel, upper,lower,sensor}
            strcmd = "{setbound," + ch + "," + setbound.start + "," + setbound.stop + "," + chData.sensor + "}";
        }
        else if(mode == 4){
            //{irrigation,ch, irr_mode,soil_up, soil_low, par_acc}
            let irr = chData.irrigation;
            strcmd = "{irrigation," + ch + "," + irr.mode + "," + irr.soil.start + "," + irr.soil.stop + "," + irr.par_accum + "}";
        }
        ControlFilter(chData);
        write.next(strcmd);
        
    },
    SendDateTime: SendDateTime
};