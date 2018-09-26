var mcu = require('../mcu/mcu');
var awsclient = require('./aws-iot-client');

awsclient.onDelta.asObservable().subscribe( stateObject => {
    var state = stateObject.state;
    if(state.control){
        var chStr = Object.keys(state.control)[0];
        var ch = parseInt(chStr.replace('ch',''));
        var ctrlCh = JSON.parse(JSON.stringify(mcu.GetControl()[ch-1]))
        var objChange = Object.keys(state.control[chStr]);
        objChange.forEach( key =>{
            if( Object.keys(state.control[chStr][key]).length > 0){
                Object.keys(state.control[chStr][key]).forEach( key2 =>{
                    ctrlCh[key][key2] = state.control[chStr][key][key2]
                })
            }
            else{
                ctrlCh[key] = state.control[chStr][key];
            }
        });
        mcu.SendCommand(ctrlCh)
    }
    if(state.datetime){
        mcu.SendDateTime(state.datetime);
        awsclient.clearDesired();
    }
});