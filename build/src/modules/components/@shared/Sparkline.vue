<template>
  <span :id="id">loading..</span>
</template>

<script>
require("../../../assets/js/plugin/sparkline/jquery.sparkline.min.js");
export default {
  props: ["id", "color", "value"],
  mounted() {
    var myvalues =  this.value
    $("#" + this.id).sparkline(myvalues, {
      type: "line",
      width: "70",
      height: "43",
      lineColor: "#a1a1ea",
      fillColor: "#ffffff"
    });
  }
};
</script>
