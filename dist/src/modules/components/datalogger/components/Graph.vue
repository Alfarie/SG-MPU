<template>
  <section>
    <div id="graphdiv" style="width:100%; height:300px;"></div>
  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import moment from 'moment';
  export default {
    data() {
      return {
        strData: '',
        date: '',
        sensorFullName: {
          soil: 'Soil Moisture (%)',
          temperature: 'Temperature (C)',
          vpd: 'Vapor Pressure (Pa)',
          par: 'PAR (Watt/sqm)',
          humidity: 'Humidity (%)',
          paracc: 'PAR Accumulation (kJ/sqm)',
          co2: 'Carbon dioxide (ppm)'
        }
      }
    },
    computed: {
      ...mapGetters(["allDayLogger", 'selectedSensor'])
    },
    watch: {
      allDayLogger: function (data) {
        this.craftStringData();
      }
    },
    methods: {
      createGraph: function () {
        setTimeout(() => {
          new Dygraph(
            document.getElementById("graphdiv"),
            this.strData, {
              customBars: true,
              title: "Daily " + this.sensorFullName[this.selectedSensor] + " : in " + this.date,
              ylabel: this.sensorFullName[this.selectedSensor],
              legend: "always",
              labelsDivStyles: {
                textAlign: "right"
              },
              showRangeSelector: true
            }
          );
          console.log("[Info] Show Dygraphs");
        }, 500);
      },
      craftStringData: function () {
        this.strData = "Date," + this.selectedSensor.toUpperCase() + "\n";
        this.date = moment(this.allDayLogger[0].datetime).format('MMM Do YY');
        this.allDayLogger.forEach(log => {
          let datetime = moment(log.datetime).format('YYYY-MM-DD hh:mm:ss');
          let sensorData = (log[this.selectedSensor] - 5) + ";" + (log[this.selectedSensor]) + ";" + (log[this.selectedSensor] + 5);
          let str = datetime + "," + sensorData + "\n";
          this.strData += str;
        });
      }
    },
    mounted() {
      this.craftStringData();
      this.createGraph();
    }
  }
</script>