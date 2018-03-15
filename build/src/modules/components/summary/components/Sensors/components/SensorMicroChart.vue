<template>
  <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 sensor-panel">

    <pie-chart :chartprop="chartData[id]" v-model="getSensors[id]"></pie-chart>

    <span class="easy-pie-title"> 
      <slot name="sensor-name"></slot>
      <i class="fa fa-caret-up icon-color-bad"></i>
    </span>

    <ul class="smaller-stat hidden-sm pull-right" style="margin-top: 15px;">
      <li>
        <span class="label bg-color-greenLight">
          <i class="fa fa-caret-up"></i> {{max}}</span>
      </li>
      <li>
        <span class="label bg-color-blueLight">
          <i class="fa fa-caret-down"></i> {{min}}</span>
      </li>
    </ul>
   
    <div class="pull-right" style="margin: 15px;" v-if="records.length != 0">
      <app-sparkline :id="id +'-sparkline'" :value="records"></app-sparkline>
    </div>
  </div>
</template>


<script>
  import {
    mapGetters
  } from "vuex";

  import PieData from "../../../../../models/PieChart.js";
  import PieChart from "../../../../@shared/PieChart.vue";
  import Sparkline from '../../../../@shared/Sparkline.vue'
  export default {
    props: ['id'],
    data() {
      return {
        chartData: PieData
      };
    },
    components: {
      PieChart,
      appSparkline: Sparkline
    },
    computed:{
        ...mapGetters(['getSensors', 'sparklineLogger']),
        max: function(){
          try{
            let value = this.sparklineLogger[this.id].max;
            if(value != undefined) return value;
            else return '--'
          }catch(ex)
          {
            return '--'
          }
          
        },
        min: function(){
          try{
            let value = this.sparklineLogger[this.id].min;
            if(value != undefined) return value;
            else return '--'
          }catch(ex)
          {
            return '--'
          }
        },
        records: function(){
          try{
            let value = this.sparklineLogger[this.id].records;
            if(value != undefined) return value;
            else return []
          }catch(ex)
          {
            return []
          }
        }
    }
  }

</script>
