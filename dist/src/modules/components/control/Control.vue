<template>
  <div class="containter">
        <article class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <app-select-channel></app-select-channel>
            <app-select-control v-if="$route.params.ch"></app-select-control>
            <router-view></router-view>
        </article>
    </div>
</template>

<script>
import SelectChannel from './components/shared/SelectChannel.vue'
import SelectControl from './components/shared/SelectControl.vue'
import Manual from './components/Manual.vue'
import Setpoint from './components/Setpoint.vue'
export default {
    components:{
        appSelectChannel: SelectChannel,
        appSelectControl: SelectControl,
        appManual: Manual,
        appSetpoint: Setpoint
    },
    mounted () {
        this.$store.dispatch('updateControl');
    }
};
</script>