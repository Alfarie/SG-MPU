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
        <strong>Sensors</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">

        <h2 class="alert alert-success"> Sensors configure & calibration.</h2>

        <form class="smart-form">
          <section>
            <header>Reset PAR Accumulation (MJ)</header>
            <app-range :sliderobj="parobj" id="irrigation" v-model="par" style="margin-bottom: 20px;"></app-range>
          </section>
          <footer>
            <button type="button" class="btn btn-primary">
              Submit
            </button>
            <button type="button" class="btn btn-default" onclick="window.history.back();">
              Set to Default
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Range from '../../../control/components/shared/Range.vue';
  import RangeData from "../../../control/components/models/Range.js";
  export default {
    components: {
      appRange: Range
    },
    data(){
      return {
        parobj: RangeData['par'],
        par: ''
      }
    },
    methods:{
      
    },
   
  };

</script>
