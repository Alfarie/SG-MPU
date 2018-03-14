var setting = require('../models/setting');


var argProcess = function(arg){
    if(arg.startsWith("--SerialPort")){
        let port = arg.split("=")[1];
        setting.portName = port;
    }
}


module.exports = {
    argProcess: argProcess
}


