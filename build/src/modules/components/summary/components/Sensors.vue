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
                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">

                      <div style="width:75%;">
                        <canvas id="canvas"></canvas>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <span class="text"> Par Accumulation
                          <span class="pull-right">(0.7/1.0 MJ) 77%</span>
                        </span>
                        <div class="progress">
                          <div class="progress-bar bg-color-greenLight" style="width: 77%;"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="show-stat-microcharts">
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 sensor-panel">

                      <pie-chart :chartprop="chartData.soil" v-model="getSensors.soil"></pie-chart>


                      <span class="easy-pie-title"> Soil moisture
                        <i class="fa fa-caret-up icon-color-bad"></i>
                      </span>

                      <ul class="smaller-stat hidden-sm pull-right">
                        <li>
                          <span class="label bg-color-greenLight">
                            <i class="fa fa-caret-up"></i> 97%</span>
                        </li>
                        <li>
                          <span class="label bg-color-blueLight">
                            <i class="fa fa-caret-down"></i> 44%</span>
                        </li>
                      </ul>
                      <div class="sparkline txt-color-greenLight hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px"
                        data-sparkline-width="70px" data-fill-color="transparent">
                        363, 247, 270, 363, 247,130, 363, 247, 130, 187, 250, 257,
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 sensor-panel">
                      <pie-chart :chartprop="chartData.par" v-model="getSensors.par"></pie-chart>
                      <span class="easy-pie-title"> PAR
                        <i class="fa fa-caret-up icon-color-bad"></i>
                      </span>
                      <ul class="smaller-stat hidden-sm pull-right">
                        <li>
                          <span class="label bg-color-greenLight">
                            <i class="fa fa-caret-up"></i> 66.5</span>
                        </li>
                        <li>
                          <span class="label bg-color-blueLight">
                            <i class="fa fa-caret-down"></i> 2.0</span>
                        </li>
                      </ul>
                      <div class="sparkline txt-color-greenLight hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px"
                        data-sparkline-width="70px" data-fill-color="transparent">
                        210, 300, 270, 363, 247, 270, 363, 247,130, 187, 250, 257, 200
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 sensor-panel">
                      <pie-chart :chartprop="chartData.vpd" v-model="getSensors.vpd"></pie-chart>
                      <span class="easy-pie-title"> VPD
                        <i class="fa fa-caret-up icon-color-bad"></i>
                      </span>
                      <ul class="smaller-stat hidden-sm pull-right">
                        <li>
                          <span class="label bg-color-greenLight">
                            <i class="fa fa-caret-up"></i> 3222</span>
                        </li>
                        <li>
                          <span class="label bg-color-blueLight">
                            <i class="fa fa-caret-down"></i> 44%</span>
                        </li>
                      </ul>
                      <div class="sparkline txt-color-blue hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px"
                        data-sparkline-width="70px" data-fill-color="transparent">
                        130, 187, 250, 257, 200, 210, 300, 270, 363, 247, 270, 363, 247
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 sensor-panel">
                      <pie-chart :chartprop="chartData.temperature" v-model="getSensors.temp"></pie-chart>
                      <span class="easy-pie-title"> Temperature
                        <i class="fa fa-caret-up icon-color-bad"></i>
                      </span>
                      <ul class="smaller-stat hidden-sm pull-right">
                        <li>
                          <span class="label bg-color-greenLight">
                            <i class="fa fa-caret-up"></i> 97%</span>
                        </li>
                        <li>
                          <span class="label bg-color-blueLight">
                            <i class="fa fa-caret-down"></i> 44%</span>
                        </li>
                      </ul>
                      <div class="sparkline txt-color-red hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px"
                        data-sparkline-width="70px" data-fill-color="transparent">
                        130, 187, 250, 257, 200, 210, 300, 270, 363, 247, 270, 363, 247
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 sensor-panel">
                      <pie-chart :chartprop="chartData.humidity" v-model="getSensors.humi"></pie-chart>

                      <span class="easy-pie-title"> Humidity
                        <i class="fa fa-caret-up icon-color-bad"></i>
                      </span>
                      <ul class="smaller-stat hidden-sm pull-right">
                        <li>
                          <span class="label bg-color-greenLight">
                            <i class="fa fa-caret-up"></i> 97%</span>
                        </li>
                        <li>
                          <span class="label bg-color-blueLight">
                            <i class="fa fa-caret-down"></i> 44%</span>
                        </li>
                      </ul>
                      <div class="sparkline txt-color-darken hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px"
                        data-sparkline-width="70px" data-fill-color="transparent">
                        270, 363, 247, 130, 187, 250, 257, 200, 210, 300, 270, 363, 247
                      </div>

                    </div>




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

  var $ = (window.jquery = require("jquery"));
  require("../../../../assets/js/jquery.easypiechart.min.js");
  require("../../../../assets/js/Chart.bundle.min.js");

  import PieChart from "../../@shared/PieChart.vue";
  import PieData from "../../../models/PieChart.js";
  export default {
    data() {
      return {
        soil: 30,
        chartData: PieData
      };
    },
    components: {
      PieChart
    },
    computed: {
      ...mapGetters(["getSensors"])
    },
    mounted() {
      
    }
  };

</script>


<style scoped>
  .sensor-panel:hover{
    background-color: #c1c1c1;
    box-shadow: 0 4px 2px rgba(.2, .2, .2, 0.2);
  }
</style>
