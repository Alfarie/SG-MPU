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
        <strong>Set Bound</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
        
          <label class="select" style="margin-bottom: 20px;">
            <select class="input-lg" v-model="select">
              <option value="-1">Select Sensor</option>
              <option value="0">Soil</option>
              <option value="1">VPD</option>
              <option value="2">temperature</option>
              <option value="3">humidity</option>
            </select>
            <i></i>
          </label>
  <!-- <h1>{{control[ch-1].setbound}}</h1> -->
          <app-range :sliderobj="obj" id="setbound" v-model="value" style="margin-bottom: 20px;"></app-range>


          <footer>
            <button @click="submit" type="button" class="btn btn-primary">
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
import RangeData from "./models/DoubleRange.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      obj: {},
      select: 1,
      value: 0
    };
  },
  methods: {
    submit: function() {
      this.control[this.ch - 1].mode = 3;
      this.$store.dispatch("uploadControl", this.ch);
    },
    update: function() {
      this.select = this.control[this.ch - 1].sensor;
      var sensor = this.getSensorName[this.select];
      let objData = RangeData[sensor];
      objData.from = this.control[this.ch - 1].setbound.start;
      objData.to = this.control[this.ch - 1].setbound.stop;
      this.obj = objData;
    }
  },
  computed: {
    ...mapGetters(["control", "getSensorName"]),
    ch: function() {
      return this.$route.params.ch;
    }
  },
  components: {
    appRange: Range
  },
  watch: {
    value: function() {
      let arr = this.value.split(";");
      this.control[this.ch - 1].setbound.start = arr[0];
      this.control[this.ch - 1].setbound.stop = arr[1];
    },
    ch: function() {
      this.update();
    },
    select: function(data) {
      console.log(data);
      var sensor = this.getSensorName[data];
      let objData = RangeData[sensor];
      objData.from = this.control[this.ch - 1].setbound.start;
      objData.to = this.control[this.ch - 1].setbound.stop;
      this.obj = objData;
    }
  },
  beforeMount() {
    this.update();
  }
};
</script>
