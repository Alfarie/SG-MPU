<template>
  <section id="widget-grid">
    <div class="row">
      <article class="col-sm-12">
        <!-- new widget -->
        <div class="jarviswidget" id="wid-id-0" data-widget-togglebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false"
          data-widget-colorbutton="false" data-widget-deletebutton="false">

          <header>
            <span class="widget-icon">
              <i class="glyphicon glyphicon-stats txt-color-darken"></i>
            </span>
            <h2>Sensors Live Feed</h2>

            <ul class="nav nav-tabs pull-right in" id="myTab">
              <li class="active">
                <a data-toggle="tab" href="#s1">
                  <i class="fa fa-clock-o"></i>
                  <span class="hidden-mobile hidden-tablet">Live Sensors</span>
                </a>
              </li>
            </ul>
          </header>

          <!-- widget div-->
          <div class="no-padding">
            <!-- widget edit box -->
            <div class="jarviswidget-editbox">

            </div>
            <!-- end widget edit box -->

            <div class="widget-body">
              <!-- content -->
              <div id="myTabContent" class="tab-content">
                <div class="tab-pane fade active in padding-10 no-padding-bottom" id="s1">
                  <div class="row no-space">
                    <real-time-graph></real-time-graph>
                  </div>

                  <div class="show-stat-microcharts">
                    
                    <sensor-micro-chart id="soil">
                      <span slot="sensor-name"> Soil Moisture </span>
                    </sensor-micro-chart>

                    <sensor-micro-chart id="par">
                      <span slot="sensor-name"> PAR </span>
                    </sensor-micro-chart>

                    <sensor-micro-chart id="vpd">
                      <span slot="sensor-name"> VPD </span>
                    </sensor-micro-chart>

                    <sensor-micro-chart id="temperature">
                      <span slot="sensor-name"> Temperature </span>
                    </sensor-micro-chart>
                    
                    <sensor-micro-chart id="humidity">
                      <span slot="sensor-name"> RH </span>
                    </sensor-micro-chart>
                  </div>

                  
                </div>

              </div>
            </div>

          </div>
        </div>

      </article>
    </div>
  </section>

</template>


<script>
  import {
    mapGetters
  } from "vuex";

  import PieData from "../../../../models/PieChart.js";
  import PieChart from "../../../@shared/PieChart.vue";
  import Sparkline from '../../../@shared/Sparkline.vue'
  import SensorMicroChart from './components/SensorMicroChart.vue'
  import RealTimeGraph from './components/RealTimeGraph.vue'
  export default {
    data() {
      return {
        soil: 30,
        chartData: PieData
      };
    },
    components: {
      RealTimeGraph,
      SensorMicroChart
    },
    computed: {
      ...mapGetters(["getSensors"])
    },
    mounted() {
      
    }
  };

</script>


<style scoped>
  /* .sensor-panel:hover{
    background-color: #c1c1c1;
    box-shadow: 0 4px 2px rgba(.2, .2, .2, 0.2);
  } */
</style>
