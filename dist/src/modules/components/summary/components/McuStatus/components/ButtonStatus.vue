<template>
  <p>
      <a class="btn btn-success btn-sm" :class="{disabled: !getValue}">ON</a>
      <a class="btn btn-danger btn-sm"  :class="{disabled: getValue}">OFF</a>
  </p>
</template>


<script>
export default {
    props: ['value'],
    computed:{
        getValue:function(){
            return (this.value ==0 )?false:true;
        }
    }
};
</script>