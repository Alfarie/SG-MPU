var portName = require('../../models/config').portName;
var production = require('../../models/config').production;
var fs = require('fs');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

var connectOption = 'specify';
var RECONNECT_INTERVAL = 2000;

var port = null;
var parser = null;
var isConnected = false;

var Rx = require('rxjs/Rx');
var write = new Rx.Subject();
var dispatch = require('./command_dispatcher');
var CommandProcess = dispatch.CommandProcess;
dispatch.setWrite(write);

function Exists(file) {
    return new Promise((resolve, reject) => {
        fs.exists(file, (exists) => {
            if (exists) {
                resolve(file)
            } else {
                reject(false);
            }
        })
    })
}

function Connect(portName) {
    return new Promise((resolve, reject) => {
        port = new SerialPort(portName, {
            baudRate: 115200,
            autoOpen: false,
            disconnectedCallback: function () {
                console.log('You pulled the plug!');
            }
        });
        port.open((err) => {
            if (err) {
                console.log(err);
                reject(false);
            }
        })
        parser = port.pipe(new Readline({
            delimiter: '\r\n'
        }));
        port.on('open', (err) => {
            console.log("[Info] ", portName, "is Opened. ")
            setTimeout(() => {
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
        resolve(true);
    })
}

function SerialPortConnect(file) {
    return new Promise((resolve, reject) => {
        Exists(file)
            .then(Connect)
            .then(res => { resolve(res) })
            .catch(err => { resolve(err) })
    })
}

function Initialize() {
    if (production) {
        setInterval(() => {
            if (!isConnected) {
                console.log('[Info] Connecting to ' + portName)
                SerialPortConnect(portName).then( res =>{
                    isConnected = res;
                })
            }
        }, RECONNECT_INTERVAL);
    }
    write.subscribe(data => {
        if (isConnected) {
            port.write(data);
        };
    });
}

module.exports = {
    write,
    connectOption,
    Initialize
}