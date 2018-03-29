import Vue from 'vue';
const state = {
  paracc: 0
}

const getters = {
  getParacc: function(state) {
    return state.paracc;
  }
}

const mutations = {
    updateParacc: function(state, payload){
        state.paracc = payload;
    }
}

const actions = {
    updateParacc: function({commit}, payload){
       
    },
    uploadParacc: function({commit}, payload){

    }
}

export default {
  state,
  getters,
  mutations,
  actions
}
