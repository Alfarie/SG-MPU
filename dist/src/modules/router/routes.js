// import GrobotSummary from '../components/summary/GrobotSummary.vue'
// import Summary from '../components/summary/components/Summary.vue'
// import Sensors from '../components/summary/components/Sensors/Sensors.vue'
// import RealTimeGraph from '../components/summary/components/RealTimeGraph.vue'
// import Activity from '../components/summary/components/Activity.vue'
// import McuStatus from '../components/summary/components/McuStatus/McuStatus.vue'
const GrobotSummary = resolve=>{
    require.ensure(['../components/summary/GrobotSummary.vue'], ()=>{
        resolve(require('../components/summary/GrobotSummary.vue')); 
    }, 'grobot-summary')
}
const Summary = resolve=>{
    require.ensure(['../components/summary/components/Summary.vue'], ()=>{
        resolve(require('../components/summary/components/Summary.vue')); 
    }, 'grobot-summary')
}
const McuStatus = resolve=>{
    require.ensure(['../components/summary/components/McuStatus/McuStatus.vue'], ()=>{
        resolve(require('../components/summary/components/McuStatus/McuStatus.vue')); 
    }, 'grobot-summary')
}


// import Control from '../components/control/Control.vue';
// import Manual from '../components/control/components/Manual.vue'
// import Timer from '../components/control/components/Timer.vue'
// import Setpoint from '../components/control/components/Setpoint.vue'
// import Setbound from '../components/control/components/Setbound.vue'
// import Irrigation from '../components/control/components/Irrigation.vue'
const Control = resolve=>{
    require.ensure(['../components/control/Control.vue'], ()=>{
        resolve(require('../components/control/Control.vue')); 
    }, 'grobot-control')
}
const Manual = resolve=>{
    require.ensure(['../components/control/components/Manual.vue'], ()=>{
        resolve(require('../components/control/components/Manual.vue')); 
    }, 'grobot-control')
}
const Timer = resolve=>{
    require.ensure(['../components/control/components/Timer.vue'], ()=>{
        resolve(require('../components/control/components/Timer.vue')); 
    }, 'grobot-control')
}
const Setpoint = resolve=>{
    require.ensure(['../components/control/components/Setpoint.vue'], ()=>{
        resolve(require('../components/control/components/Setpoint.vue')); 
    }, 'grobot-control')
}
const Setbound = resolve=>{
    require.ensure(['../components/control/components/Setbound.vue'], ()=>{
        resolve(require('../components/control/components/Setbound.vue')); 
    }, 'grobot-control')
}
const Irrigation = resolve=>{
    require.ensure(['../components/control/components/Irrigation.vue'], ()=>{
        resolve(require('../components/control/components/Irrigation.vue')); 
    }, 'grobot-control')
}



// import Setting from '../components/setting/Setting.vue';
// import SensorSetting from '../components/setting/components/Sensors/SensorSetting.vue';
// import ActivitySetting from '../components/setting/components/Activity.vue';
// import DateTime from '../components/setting/components/DateTime.vue';
// import Network from '../components/setting/components/Network/Network.vue';
// import Station from '../components/setting/components/Network/Station.vue';
// import Ap from '../components/setting/components/Network/Ap.vue';
const Setting = resolve=>{
    require.ensure(['../components/setting/Setting.vue'], ()=>{
        resolve(require('../components/setting/Setting.vue')); 
    }, 'setting')
}
const SensorSetting = resolve=>{
    require.ensure(['../components/setting/components/Sensors/SensorSetting.vue'], ()=>{
        resolve(require('../components/setting/components/Sensors/SensorSetting.vue')); 
    }, 'setting')
}
const ActivitySetting = resolve=>{
    require.ensure(['../components/setting/components/Activity.vue'], ()=>{
        resolve(require('../components/setting/components/Activity.vue')); 
    }, 'setting')
}
const DateTime = resolve=>{
    require.ensure(['../components/setting/components/DateTime.vue'], ()=>{
        resolve(require('../components/setting/components/DateTime.vue')); 
    }, 'setting')
}
const Network = resolve=>{
    require.ensure(['../components/setting/components/Network/Network.vue'], ()=>{
        resolve(require('../components/setting/components/Network/Network.vue')); 
    }, 'setting')
}
const Station = resolve=>{
    require.ensure(['../components/setting/components/Network/Station.vue'], ()=>{
        resolve(require('../components/setting/components/Network/Station.vue')); 
    }, 'setting')
}
const Ap = resolve=>{
    require.ensure(['../components/setting/components/Network/Ap.vue'], ()=>{
        resolve(require('../components/setting/components/Network/Ap.vue')); 
    }, 'setting')
}


// import DataLogger from '../components/datalogger/DataLogger.vue'
const DataLogger = resolve=>{
    require.ensure(['../components/datalogger/DataLogger.vue'], ()=>{
        resolve(require('../components/datalogger/DataLogger.vue')); 
    }, 'setting')
}

const ConnectionStatus = resolve=>{
    require.ensure(['../components/@shared/ConnectionStatus.vue'], ()=>{
        resolve(require('../components/@shared/ConnectionStatus.vue')); 
    }, 'connection-status')
}

export const routes = [
    {path: '/grobot-summary',name: 'grobot-summary', component: GrobotSummary, children:[
        {path: 'summary', name:"summary", component: Summary },
        {path: 'status', name:"mcu-status", component: McuStatus }
    ]},
    {path: '/grobot-control', name:'grobot-control', component: Control, children:[
        {path: ':ch/', name: "control-ch", component: Control},
        {path: ':ch/manual',name:"manual", component: Manual},
        {path: ':ch/timer',name:"timer", component: Timer},
        {path: ':ch/setpoint',name:"setpoint", component: Setpoint},
        {path: ':ch/setbound',name:"setbound", component: Setbound},
        {path: ':ch/irrigation',name:"irrigation", component: Irrigation},
    ]},
    {path: '/grobot-setting', name: 'grobot-setting', component: Setting , children: [
        {path: 'datetime', name:'setting-datetime', component: DateTime},
        {path: 'sensors', name:'setting-sensors', component: SensorSetting},
        {path: 'activity', name: 'setting-activity', component: ActivitySetting},
        {path: 'network', name: 'setting-network', component: Network, children:[
            {path: 'station', name: 'setting-network-station', component: Station},
            {path: 'ap', name: 'setting-network-ap', component: Ap}
        ]},
    ]},
    {path: '/grobot-datalogger', name: 'datalogger', component: DataLogger},
    {path: '/connection-status', name: 'connection-status', component: ConnectionStatus},
    {path: '/*', redirect: "/connection-status"}
]