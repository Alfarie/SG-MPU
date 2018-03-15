import Vue from 'vue'
import Vuex from 'vuex'

import sensors from './modules/sensors'
import datetime from './modules/datetime'
import socket from './modules/socket'
import control from './modules/control'
import logger from './modules/logger'

Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        sensors,
        datetime,
        socket,
        control,
        logger
    }
})
