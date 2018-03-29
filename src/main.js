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
    
    serial.Initialize();

    var mcu = require('./mcu/mcu');
    mcu.SetSerialPort(serial);

    if(!config.production){
        var demo = require('./mcu/demo');
        demo.Initialize(mcu);
    }

    mcu.Subject.GetSensorsSubject.subscribe( sensors =>{
        ws.io.to('0x01').emit('SENSORS', sensors);
        ws.io.to('0x01').emit('MEMORY', mcu.GetStatus().freeMemory);
        ws.io.to('0x01').emit('GPIO', mcu.GetStatus().gpio);
        ws.io.to('0x01').emit('PARACC', mcu.GetStatus().paracc);
        
    })

    var logger = require('./datalogger/datalogger');
    logger.Initialize(mcu,config);

    ws.http.listen(ws.port, function () {
        console.log('[Info] listening *:' + ws.port);
    });
}