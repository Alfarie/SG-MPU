import GrobotSummary from './modules/components/summary/GrobotSummary.vue'
import Summary from './modules/components/summary/components/Summary.vue'
import Sensors from './modules/components/summary/components/Sensors/Sensors.vue'
import RealTimeGraph from './modules/components/summary/components/RealTimeGraph.vue'
import Activity from './modules/components/summary/components/Activity.vue'

import Control from './modules/components/control/Control.vue';
import Manual from './modules/components/control/components/Manual.vue'
import Timer from './modules/components/control/components/Timer.vue'
import Setpoint from './modules/components/control/components/Setpoint.vue'
import Setbound from './modules/components/control/components/Setbound.vue'
import Irrigation from './modules/components/control/components/Irrigation.vue'


import Setting from './modules/components/setting/Setting.vue';
import SensorSetting from './modules/components/setting/components/Sensors/SensorSetting.vue';
import ActivitySetting from './modules/components/setting/components/Activity.vue';
import DateTime from './modules/components/setting/components/DateTime.vue';
import Network from './modules/components/setting/components/Network/Network.vue';
import Station from './modules/components/setting/components/Network/Station.vue';
import Ap from './modules/components/setting/components/Network/Ap.vue';


import DataLogger from './modules/components/datalogger/DataLogger.vue'

export const routes = [
    {path: '/grobot-summary',name: 'grobot-summary', component: GrobotSummary, children:[
        {path: 'summary', name:"summary", component: Summary },
        {path: 'sensors', name:"sensors", component: Sensors },
        {path: 'realtime-graph', name:"realtime-graph", component: RealTimeGraph },
        {path: 'activity', name:"activity", component: Activity },
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
    {path: '/*', redirect: "/grobot-summary/summary"}
]