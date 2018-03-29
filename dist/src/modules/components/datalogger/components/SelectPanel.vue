<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3" data-widget-colorbutton="false"
    data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" role="widget">

    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Logger</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row">

              <section>
                <label>Choose Date</label>
                <input type="date" name="" id="" class="form-control" v-model="date">
              </section>

              <section>
                <label>Choose Sensor</label>
                  <label class="select" style="margin-bottom: 20px;">
                      <select class="input-lg" @input="selectSensor">
                        <option value="soil">Soil</option>
                        <option value="vpd">VPD</option>
                        <option value="par">PAR</option>
                        <option value="paracc">PAR Accumulation</option>
                        <option value="temperature">Temperature</option>
                        <option value="humidity">Relative Humidity</option>
                        <option value="co2">Carbon dioxide</option>
                      </select>
                      <i></i>
                    </label>
              </section>
            </div>
          </fieldset>
          <footer>
            <button type="button" class="btn btn-primary" @click="fetchData">
              Fetch Data 
            </button>
            <button type="button" class="btn btn-default" onclick="window.history.back();">
              Set default
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  var $ = (window.jQuery = require("jquery"));
  require('../../../../assets/js/plugin/clockpicker/clockpicker.min.js');
  export default {
    data(){
      return {
        sensor: 'soil',
        date: moment().format('YYYY-MM-DD')
      }
    },
    methods:{
      selectSensor: function(data){
        let sensor = data.target.value
        this.$emit('select', sensor);
        this.$store.commit('updateSelectedSensor', sensor);
      },
      fetchData: function(){
        this.$store.commit('updateLoggerFetchingStatus', 'fetching');
        this.$store.commit('updateAllDayLogger', []);
        this.$emit('date', this.date);
        setTimeout( ()=>{
          this.$store.dispatch('updateAllDayLogger', 'DATE'+this.date);
        },2000)
      }
    }
  };

</script>
