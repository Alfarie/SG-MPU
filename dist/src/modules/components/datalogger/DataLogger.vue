<template>
  <div class="containter">
      <h1>Data Logger</h1>
        <article class="col-xs-12 col-sm-6 col-md-6 col-lg-6">

          <app-select-panel @select="selectSensor($event)" @date="selectDate($event)"></app-select-panel>
          
          <div>
             <graph-panel  v-if="loggerFetchingStatus != 'no-record' " :date="date"></graph-panel>
          </div>
         
        </article>
    </div>
</template>
<script>
import SelectPanel from "./components/SelectPanel.vue";
import GraphPanel from "./components/GraphPanel.vue";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      sensor: "soil",
      date: ''
    };
  },
  computed:{
    ...mapGetters(['allDayLogger','loggerFetchingStatus'])
  },
  methods: {
    selectSensor: function(data){
      this.sensor = data;
    },
    selectDate: function(date){
      console.log(date);
      this.date = date;
    }
  },
  components: {
    appSelectPanel: SelectPanel,
    GraphPanel
  }
};
</script>