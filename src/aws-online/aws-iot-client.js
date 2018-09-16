var awsIot = require('aws-iot-device-sdk');
var mac = require('./getmac');
var Rx = require('rxjs');
var onDelta = new Rx.Subject();
var device;
var thingShadows;
var clientTokenUpdate;
var thingName, clientId;

function Init() {
    IotDeviceInit();
}

async function IotDeviceInit(){
    var macAddr = await mac.getmac();
    thingName = macAddr;
    clientId = macAddr;
    var lwt_payload = {
        connection: false,
        mid: thingName
    }
    var cert_shadow = {
        keyPath: __dirname + '/cert/private.pem.key',
        certPath: __dirname + '/cert/certificate.pem.crt',
        caPath: __dirname + '/cert/root-CA.crt',
        host: 'a36i6p8e4cz1dq.iot.ap-southeast-1.amazonaws.com',
        clientId: '12345678910'
    }
    var cert_device = {
        keyPath: __dirname + '/cert/private.pem.key',
        certPath: __dirname + '/cert/certificate.pem.crt',
        caPath: __dirname + '/cert/root-CA.crt',
        host: 'a36i6p8e4cz1dq.iot.ap-southeast-1.amazonaws.com',
        clientId: '12345678911',
        will: {
            topic: 'LWT_UPDATE',
            payload: JSON.stringify(lwt_payload)
        }
    }
    
    cert_device['clientId'] = clientId + '-device';
    cert_shadow['clientId'] = clientId + '-shadow';
    
    device = awsIot.device(cert_device);
    thingShadows = awsIot.thingShadow(cert_shadow);

    thingShadows.on('connect', function () {
        console.log('[Info] AWS-IoT Shadow CONNECTED')
        thingShadows.register(thingName, {}, () => {
            console.log('[Info] Thing Registered');
        });
    });

    thingShadows.on('status', (thingName, stat, clientToken, stateObject) => {
        console.log('received ' + stat + ' on ' + thingName + ': ' +
            JSON.stringify(stateObject.state.reported));
    });

    thingShadows.on('error', (error) => {
        console.log(error);
    });

    thingShadows.on('delta', (thingName, stateObject) => {
        console.log('received delta on ' + thingName + ': ' +
            JSON.stringify(stateObject.state));
        var state = stateObject.state // desired 
        onDelta.next(stateObject)

    });

    device.on('connect', () => {
        console.log('[Info] AWS-IoT CONNECTED');
        Publish('UPDATE_DEVICE', {mid: macAddr, updateDevice: new Date() })
    });

    device.on('close', () => console.log('[Info] AWS-IoT CLOSED'));
    device.on('reconnect', () => console.log('[Info] AWS-IoT RECONNECT'));
    device.on('offline', () => console.log('[Info] AWS-IoT OFFLINE'));
    device.on('error', (error) => console.log('[Info] AWS-IoT ERROR', error));

    device.on('message', (topic, payload) => {
        console.log('message', topic, payload.toString());
    });
}

function Publish(topic, jsonMsg) {
    device.publish(topic, JSON.stringify(jsonMsg));
}

function Subscribe(topic, callback) {
    console.log('[INFO] AWS Subscribe ' + topic);
    device.subscribe(topic);
}

function UpdateThingShadow(data) {
    var state = { state: { reported: data, desired: null } };
    clientTokenUpdate = thingShadows.update(thingName, state);
    if (clientTokenUpdate === null) {
        console.log('[Error] update shadow failed, operation still in progress');
    }
    else {
        console.log('[Info] update shadow successful');
    }
}

Init();
module.exports = {
    Publish,
    Subscribe,
    UpdateThingShadow,
    onDelta
}
