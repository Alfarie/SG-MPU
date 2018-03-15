import Vue from 'vue';
import control from '../../components/control/components/models/control.js';
const state = {
    control: control.control
}

var controlName = ['manual', 'timer', 'setpoint', 'setbound', 'irrigation']
const getters = {
    control: (state)=>{
        return state.control;
    },
    getControlName: (state)=>{
        var data = []
        state.control.forEach(c=>{
            data.push( controlName[c.mode]);
        })
        return data;
    }
}

const mutations = {
    updateControl: (state, payload)=>{
        state.control = payload;
    }
}

const actions = {
    updateControl: ( {commit} , payload)=>{
        Vue.http.get('control/').then(
            (res)=>{
               commit('updateControl', res.body.control);
            }
        )
    },
    uploadControl: ({commit,state}, payload)=>{
        Vue.http.post('control/', {control: state.control, ch: payload-1});
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}