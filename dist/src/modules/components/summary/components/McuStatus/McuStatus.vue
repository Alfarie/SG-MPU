<template>
 <div class="container">
      <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3" data-widget-colorbutton="false"
    data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" role="widget">

    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>MCU Status</strong>
        <i>panel</i>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <header>
            GPIO
          </header>
          <fieldset>
              <div class="table-responsive">
											<table class="table table-hover">
												<thead>
													<tr>
														<th style="padding: 10px;">CHANNEL</th>
														<th style="padding: 10px;">GPIO STATUS</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(value,ind) in gpio" :key="value + ' ' + ind">
														<td style="padding: 5px; font-size: 20px;"> {{ind+1}} </td>
														<td style="padding: 5px;"><button-status :value="value"></button-status></td>
													</tr>
												</tbody>
											</table>
										</div>
          </fieldset>

          <header>
            Memory
          </header>
          <fieldset>
              <div class="table-responsive">
											<table class="table table-hover">
												<thead>
													<tr>
														<th style="padding: 10px;">Module Name</th>
														<th style="padding: 10px;">Memory</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td style="padding: 5px; font-size: 20px;">MCU</td>
														<td style="padding: 5px; font-size: 20px; color: green;">{{memory}} Byte</td>
													</tr>
                          <tr>
														<td style="padding: 5px; font-size: 20px; ">MPU</td>
														<td style="padding: 5px; font-size: 20px; color: green;">112 MB</td>
													</tr>
												</tbody>
											</table>
										</div>
          </fieldset>

          <footer>
            <button type="button" class="btn btn-default">
              Refresh
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
 </div>
</template>


<script>
import { mapGetters } from "vuex";
import ButtonStatus from "./components/ButtonStatus";
export default {
  components: {
    ButtonStatus
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["GetStatus"]),
    gpio: function() {
      return this.GetStatus.gpio;
    },
    memory: function() {
      return this.GetStatus.memory;
    }
  }
};
</script>


<style scoped>
th,
td {
  padding: 1px;
  text-align: center;
}
</style>
