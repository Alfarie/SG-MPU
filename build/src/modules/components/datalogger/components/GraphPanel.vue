<template>

  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable">
    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Graph</strong>
      </h2>
    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <h2 v-if="loggerFetchingStatus == 'fetched'" class="alert alert-success"> Found data record: {{allDayLogger.length}} records</h2>
        <h2 v-if="loggerFetchingStatus == 'fetching'" class="alert alert-info"> 
            <i class="fa fa-cogs fa-spin"></i> Fetching data... : {{selectedSensor | toUpperCase}}
        </h2>
        <form class="smart-form">
          <fieldset>
            <div class="row" v-if="allDayLogger.length != 0">
              <graph></graph>
            </div>
          </fieldset>
          <footer>
            <button type="button" class="btn btn-primary">
              <i class="fa fa-save "></i> Export to .xls
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import moment from "moment";

  import Graph from "./Graph.vue";

  export default {
    components: {
      Graph
    },
    computed: {
      ...mapGetters(["allDayLogger", "loggerFetchingStatus", 'selectedSensor'])
    }
  };

</script>
