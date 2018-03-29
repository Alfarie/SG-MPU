
import {router} from '../../router/router.js'
const state = {
    connect: false
}

const getters = {
    ConnectionStatus: (state)=>{
        return state.connect;
    }
}

const mutations = {
    SOCKET_CONNECT: (state,  status ) => {
        console.log('SOCKET.IO: Connected');
        state.connect = true;
        router.push({name: 'summary'});
    },
    SOCKET_DISCONNECT: (state, status)=>{
        console.log('SOCKET.IO: disconnceted');
        state.connect = false;
        router.push({name: 'connection-status'});
    }
}

export default {
    state,
    getters,
    mutations
}