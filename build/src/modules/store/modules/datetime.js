import Vue from 'vue'
const state = {
    date: '2017-1-1',
    time: '00:00:00'
}

const getters = {
   getDateTime(state){
       return {
           date: state.date,
           time: state.time
       }
   }
}

const mutations = {
    setDateTime(state, payload){
        state.date = payload.date;
        state.time = payload.time;
    }
}

const actions = {
    updateDateTime(context, payload){
        Vue.http.post('setting/datetime/', payload)
    }
}

export default{
    state,
    getters,
    actions
}