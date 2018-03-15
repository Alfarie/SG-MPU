<template>
  <div>
    <canvas :id="id"></canvas>
  </div>

</template>

<script>
  import moment from "moment";
  import Chart from "chart.js";
  import {mapGetters} from 'vuex'
  export default {
    props: ["id", "dataObj", "sensor"],
    data() {
      return {
        isCreated: false,
        config: {
          type: "line",
          data: {
            datasets: [{
              label: this.dataObj.label,
              backgroundColor: "#62f442",
              borderColor: "#62f442",
              borderWidth: 2,
              radius: 2,
              data: this.dataObj.data,
              fill: false
            }]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: this.dataObj.title
            },
            scales: {
              xAxes: [{
                type: "time",
                display: true
              }],
              yAxes: [{
                display: true,
                ticks: {
                  max: this.dataObj.max,
                  min: this.dataObj.min
                }
              }]
            }
          }
        }
      }
    },
    watch: {
      dataObj: function (data) {
        this.config.data.datasets[0].data = data.data;
        this.config.data.datasets[0].label = data.label;
        this.config.options.title.text = data.title;
        this.config.options.scales.yAxes[0].ticks.max = data.max;
        this.config.options.scales.yAxes[0].ticks.min = data.min;
        this.updateChart();
      },
      sensor: function(data){
        // this.config.data.datasets[0].data.push(data);
        // this.updateChart();
      }
    },
    methods: {
      createChart: function () {
        var ctx = document.getElementById(this.id).getContext("2d");
        window.myLine = new Chart(ctx, this.config);
      },
      updateChart: function () {
        console.log(this.config.data.datasets[0]);
        if (!this.isCreated) {
          this.createChart();
          this.isCreated = true;
        } else {
          console.log('update');
          window.myLine.update();
        }
      }
    },
    mounted() {
      this.updateChart();
      console.log('mounted');
    }
  };

</script>

<style scoped>
  canvas {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

</style>
