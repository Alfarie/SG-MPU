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
        <strong>Irrigation</strong>
        <i>panel</i>
      </h2>
    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
        
          <label class="select" style="margin-bottom: 20px;">
            <select class="input-lg">
              <option value="0">Select Mode</option>
              <option value="soil">Soil</option>
              <option value="vpd">PAR</option>
              <option value="temperature">Soil & par</option>
            </select>
            <i></i>
          </label>
        <!-- <h1>{{control[ch-1].irrigation}}</h1> -->
          <header>Soil</header>
          <app-range :sliderobj="soilobj" id="soil" v-model="soil" style="margin-bottom: 20px;"></app-range>
          <header>Par</header>
          <app-range :sliderobj="parobj" id="irrigation" v-model="par" style="margin-bottom: 20px;"></app-range>
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
  import DoubleRangeData from "./models/DoubleRange.js";
  import RangeData from "./models/Range.js";
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        soilobj: DoubleRangeData['soil'],
        parobj: RangeData['par'],
        soil: '',
        par: ''
      };
    },
    methods:{
      submit: function(){
        this.control[this.ch - 1].mode = 4;
        this.$store.dispatch('uploadControl', this.ch);
      },
      update: function(){
        this.soilobj.from = this.control[this.ch-1].irrigation.soil.start;
        this.soilobj.to = this.control[this.ch-1].irrigation.soil.stop;
        this.parobj.from = this.control[this.ch-1].irrigation.par_accum;
      }
    },
    components: {
      appRange: Range
    },
    computed: {
      ...mapGetters(['control']),
      ch: function(){
        return this.$route.params.ch;
      }
    },
    watch: {
      soil: function(){
        let arr = this.soil.split(';');
        this.control[this.ch-1].irrigation.soil.start = parseInt(arr[0]);
        this.control[this.ch-1].irrigation.soil.stop = parseInt(arr[1]);
      },
      par: function(){
        this.control[this.ch-1].irrigation.par_accum = this.par;
      },
      ch: function(data){
        this.update();
      }
    },
    beforeMount () {
      this.update();
    }
  };

</script>
