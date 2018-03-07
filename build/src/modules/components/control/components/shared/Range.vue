<template>
   <div>
        <input type="text" :id="id" value="" name="range" />
    </div>
</template>

<script>
var $ = (window.jQuery = require("jquery"));
require("../../../../../assets/js/ion-rangeSlider/ion.rangeSlider.min.js");
export default {
  props: ["sliderobj" ,'id', 'value'],
  data() {
    return {
      range: ''
    };
  },
  watch:{
    sliderobj: function(data){
      var slider = $("#" + this.id).data("ionRangeSlider");
      slider.update(this.sliderobj);
    }
  },
  methods:{
    getValue: function(data){
      console.log(data);
    }
  },
  mounted() {
    this.range = $("#" + this.id);
    this.range.ionRangeSlider( this.sliderobj);

    this.range.on('change', (data)=>{
      this.$emit('input', data.target.value);
    });
  }
};
</script>
