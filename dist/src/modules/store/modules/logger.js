import Vue from 'vue'
const state = {
    shortLogger: [],
    allDayLogger: [],
    sparklineLogger: [],
    selectedSensor: 'soil',
    loggerFetchingStatus: 'no-record' // no-record, fetching, fetched
}
const getters = {
    shortLogger: function(state){
        return state.shortLogger;
    },
    allDayLogger: function(state){
        return state.allDayLogger;
    },
    sparklineLogger: function(state){
        return state.sparklineLogger;
    },
    selectedSensor: function(state){
        return state.selectedSensor;
    },
    loggerFetchingStatus: function(state){
        return state.loggerFetchingStatus;
    }
}

const mutations = {
    updateShortLogger: function(state,payload){
        state.shortLogger = payload;
    },
    updateAllDayLogger: function(state, payload){
        state.allDayLogger = payload;
    },
    updateSparklineLogger: function(state, payload){
        state.sparklineLogger = payload;
    },
    updateLoggerFetchingStatus: function(state, payload){
        state.loggerFetchingStatus = payload;
    },
    updateSelectedSensor: function(state, payload){
        state.selectedSensor = payload;
    }
}


const actions = {
    updateShortLogger: function({commit}, payload){
        Vue.http.get('logger/finds/short').then(
            (res)=>{
                commit('updateShortLogger',res.body);
            }
        )
    },
    updateAllDayLogger: function({commit}, payload){
        Vue.http.get('logger/finds/db/date?date=' + payload).then(
            (res)=>{
                let result = res.body;
                if(result.status == 'Error'){
                    commit('updateAllDayLogger', []);
                }
                else{
                    commit('updateAllDayLogger', res.body);
                }
                commit('updateLoggerFetchingStatus', 'fetched')
               
            }
        )
    },
    updateSparklineLogger: function({commit}, payload){
        Vue.http.get('logger/finds/sparks').then(
            (res)=>{
                let result = res.body;
                console.log(result);
                commit('updateSparklineLogger', result);
            }
        )
    },
    exportCsv: function({commit}, payload){
        Vue.http.get('logger/finds/date/csv?date=' + payload).then(
            (res)=>{
                let result = res.body;
            }
        )
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}