<template>
  <div :id="chartprop.id" class="easy-pie-chart txt-color-orangeDark">
    <span class="percent">{{value}} {{chartprop.postFix}}</span>
  </div>
</template>

<script>
  var $ = (window.jquery = require('jquery'));
  require("../../../assets/js/jquery.easypiechart.min.js");
  export default {
    props:['chartprop', "value"],
    computed:{
        getValue: function(){
            return this.value;
        }
    },
    watch:{
        getValue: function(data){
            $('#'+ this.chartprop.id).data('easyPieChart').update(data);
        }
    },
    mounted () {
        $('#'+ this.chartprop.id).easyPieChart(
            this.chartprop.data
        )
        $('#'+ this.chartprop.id).data('easyPieChart').update(this.value);
    }
  };

</script>
