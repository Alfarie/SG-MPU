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
        <strong>Network</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">

        <h2 class="alert alert-success"> Wifi Setting.</h2>

        <form class="smart-form">

          <section>
            <label class="label">Select Mode</label>
            <div class="inline-group">
              <label class="radio">
                <input type="radio" name="radio-inline" value="station" v-model="wifiMode">
                <i></i>Station</label>
              <label class="radio">
                <input type="radio" name="radio-inline" value="ap" v-model="wifiMode">
                <i></i>AP</label>
            </div>
          </section>

          <router-view></router-view>
          <footer>
            <button type="submit" class="btn btn-primary">
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
export default {
  data() {
    return {
      wifiMode: "station",
      routeList: {
        'ap': 'setting-network-ap',
        'station': 'setting-network-station'
      }
    };
  },
  watch: {
    wifiMode: function(data){
      this.$router.push({name: this.routeList[data]})
    }
  }
};
</script>
