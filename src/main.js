var args = require('./args/processing');
var exit = false;
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if (!args.argProcess(val)) {
        exit = true;
    }
});

if (!exit) {
    var ws = require('./ws/ws');
    var config = require('./args/config');
    var serial = require('./serial/serial');
    var aws = require('./aws-online');
    // var online = require('./aws-online/online');
    // var memory = require('./memory/memory')
    // var moment = require('moment');
    serial.Initialize();

    var mcu = require('./mcu/mcu');
    mcu.SetSerialPort(serial);

    if(!config.production){
        // var demo = require('./mcu/demo');
        // demo.Initialize(mcu);

        var demo = require('./mcu/demo-display')
    }
    
    mcu.Subject.GetSensorsSubject.subscribe( sensors =>{
        ws.io.to('0x01').emit('SENSORS', sensors);
        ws.io.to('0x01').emit('DATETIME', mcu.GetDateTime());
        // ws.io.to('0x01').emit('CONNECTION', online.GetStateBoolean() );
        ws.io.to('0x01').emit('GPIO', mcu.GetStatus().gpio);
        ws.io.to('0x01').emit('PARACC', mcu.GetStatus().paracc);
    });

    // setInterval( ()=>{
    //     firebase.UpdateSensors(mcu.GetSensors());
    //     firebase.UpdateDateTime(mcu.GetDateTime());
    //     firebase.UpdateControl({
    //         control: mcu.GetControl()
    //     });
    //     firebase.UpdateMcuStatus({
    //         paracc: mcu.GetStatus().paracc,
    //         gpio: mcu.GetStatus().gpio
    //     });
    //     firebase.UpdateMPUTime()
    // },2000);

    // setInterval( ()=>{
    //     var data = mcu.GetSensors();
    //     data['date'] = moment().format('YYYY-MM-DD');
    //     data['time'] = moment().format('HH:mm:ss');
    //     data['datetime'] = moment().format('YYYY-MM-DD HH:mm:ss');
    //     firebase.UpdateSensorsDB(data);
    // },60000);

    var logger = require('./datalogger/datalogger');
    logger.Initialize(mcu,config);

    ws.http.listen(ws.port, function () {
        console.log('[Info] listening *:' + ws.port);
    });
}