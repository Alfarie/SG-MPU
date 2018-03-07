var portName = require('../models/setting').portName;
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

var fs = require('fs');
var port = null;
var parser = null;
var isConnected = false;
var Rx = require('rxjs/Rx');
var write = new Rx.Subject();

var dispatch = require('./command_dispatcher');
var CommandProcess = dispatch.CommandProcess;
dispatch.setWrite(write);

var scanPort = function() {
    var flag = false;
    console.log("[Info] Scanning for serialport mcu...")
    for (var i = 20; i >= 0; i--) {
        var str = portName + i;
        if (fs.existsSync(str)) {
            port = new SerialPort(str, {
                baudRate: 115200,
                disconnectedCallback: function() { console.log('You pulled the plug!'); }
            });
            parser = port.pipe(new Readline({ delimiter: '\r\n' }));
            port.on('open', (err) => {
                console.log("[Info] ", str, "is Opened. ")
                setTimeout( ()=>{ 
                    isConnected = true; 
                    console.log('[Info] Request control.');
                    port.write('{control}')
                }, 2000);
            })
            port.on('close', (err) => {
                console.log(err);
                isConnected = false;
            })
            parser.on('data', (data) => {
                CommandProcess(data);
            })
            flag = true;
            break;
        }
    }
    return flag;
}

scanPort();
setInterval(() => {
    if (!isConnected) {
        scanPort();
    }
}, 5000);

write.subscribe( data => {
   if(isConnected){
       port.write(data);
   };
})

module.exports = {
   write: write
}