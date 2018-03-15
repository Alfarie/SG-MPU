const state = {
    sensors: {
        soil: 0,
        vpd: 0,
        temperature: 0,
        humidity: 0,
        par: 0
    },
    sensorName:['soil', 'vpd', 'temperature', 'humidity']
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