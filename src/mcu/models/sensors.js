var sensors = { /* ...Empty obj waiting for mcu...  */}
var datetime = {date: '2018-01-01', time: '00:00:00'}
function UpdateSensors(s){
    sensors = s;
}


module.exports = {
    sensors,
    datetime
}