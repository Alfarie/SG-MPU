<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="row">
        <real-time-chart id="sum-chart" :dataObj="dataObj" :sensor="selectedSensor"></real-time-chart>
    </div>
    <form class="smart-form">
      <fieldset>
        <label class="select" style="margin-bottom: 20px;">
          <select class="input-lg" v-model='select'>
            <option value="soil">Select Chart</option>
            <option value="soil"> Soil</option>
            <option value="par"> Par</option>
            <option value="vpd"> VPD</option>
            <option value="temperature"> temperature</option>
            <option value="humidity"> humidity</option>
            <option value="co2"> CO<sub>2</sub></option>
          </select>
        </label>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import RealTimeChart from '../../../../@shared/RealTimeChart.vue';
  import {
    realTimeChartObj
  } from '../../../../../models/RealTimeChart.js'
  import {
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        select: 'vpd',
        dataObj: [],
        selectedSensor: {}
      }
    },
    methods: {
      update: function () {
        this.dataObj = realTimeChartObj[this.select];
        this.dataObj.data = []
        this.shortLogger.forEach(logger => {
          let data = {
            x: moment(logger.date + " " + logger.time).toDate(),
            y: logger[this.select]
          }
          this.dataObj.data.push(data);
        })
      }
    },
    computed: {
      ...mapGetters(['shortLogger', 'getSensors'])
    },
    watch: {
      shortLogger: function (data) {
        this.update();
      },
      select: function (data) {
        this.update();
      },
      getSensors: function (sensor) {
        let data = {
            x: moment(sensor.date + " " + sensor.time).toDate(),
            y: sensor[this.select]
        }
        this.selectedSensor = data;
      }
    },
    mounted() {
      this.$store.dispatch('updateShortLogger');
    },
    components: {
      RealTimeChart
    }
  };

</script>
