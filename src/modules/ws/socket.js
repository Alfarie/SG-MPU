var io = null;

var emit = (event,data)=>{
    // console.log(event,data);
    io.to('0x01').emit(event,data);
}
var EmitSensor = ()=>{
    emit('SENSORS', require('../models/sensors').sensor);
}
module.exports = {
    socketio: function(socketio){
        io = socketio;
        io.on('connection', function (socket) {
            console.log("[socket-event] Client Connected");
            socket.join('0x01');
            
            socket.on('REQ_SETTING', function() {
                console.log('[socket-event] REQ_SETTING');
            });
            socket.on('SETTING', function(){
                console.log('[socket-event] SETTING');
            });
        });
        setInterval(EmitSensor, 2000);
        return io;
    },
    emit: emit
}