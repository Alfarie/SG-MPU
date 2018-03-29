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
        <strong>Set point</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <header>
            Timing
          </header>
          <fieldset>

            <section>
              <label class="label">Working time</label>
              <label class="input">
                <input type="number" class="input-md" v-model="control[ch-1].setpoint.working">
              </label>
            </section>
            <section>
              <label class="label">Detecting time</label>
              <label class="input">
                <input type="number" class="input-md" v-model="control[ch-1].setpoint.detecting">
              </label>
            </section>

          </fieldset>


          <header style="margin-bottom: 20px;">Set Point</header>
          <label class="select" style="margin-bottom: 20px;">
            <select class="input-lg" v-model='select'>
              <!-- // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2 -->
              <option value="-1">Select Sensor</option>
              <option value="0">VPD</option>
              <option value="1">Soil</option>
              <option value="3">temperature</option>
              <option value="4">humidity</option>
              <option value="5">co2</option>
            </select>
            <i></i>
          </label>
          
          <app-range :sliderobj="obj" id="setpointslider" v-model="control[ch-1].setpoint.setpoint" style="margin-bottom: 20px;"></app-range>


          <footer>
            <button type="button" @click="submit" class="btn btn-primary">
              Submit
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
  import Range from "./shared/Range.vue";
  import RangeData from "./models/Range.js";
  import {mapGetters} from 'vuex';
  
  export default {
    data() {
      return {
        obj: {},
        select: 0
      };
    },
    methods: {
      submit: function(){
        this.control[this.ch - 1].mode = 2;
        this.$store.dispatch('uploadControl', this.ch);
      },
      update: function(){
        this.control[this.ch-1].sensor = this.select;
        var sensor = this.getSensorName[this.select];
        let objData = RangeData[sensor];
        objData.from = this.control[this.ch-1].setpoint.setpoint;
        this.obj = objData;
      }
    },
    computed:{
      ...mapGetters(['control', 'getSensorName']),
      ch: function(){
        return this.$route.params.ch;
      }
    },
    watch:{
      select: function(data){
       this.update();
      }
    },
    components: {
      appRange: Range
    },
    mounted () {
      this.select = this.control[this.$route.params.ch-1].sensor;
      this.update();
    }
  };

</script>
