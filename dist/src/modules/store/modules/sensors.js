const state = {
    sensors: {
        soil: 0,
        vpd: 0,
        temperature: 0,
        humidity: 0,
        par: 0,
        co2: 0
    },
    // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2
    sensorName:['vpd','soil', 'par', 'temperature', 'humidity', 'co2']
}
const getters = {
    getSensors(state){
        return state.sensors;
    },
    getSensorName(state){
        return state.sensorName;
    }
}

const mutations = {
    SOCKET_SENSORS:(state, data)=>{
        state.sensors = data[0];
    }
}

export default{
    state,
    getters,
    mutations
}