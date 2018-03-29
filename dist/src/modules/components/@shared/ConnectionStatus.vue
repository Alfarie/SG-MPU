<template>
  <div class="container text-center" :class="[ {'red': !ConnectionStatus}, {'green': ConnectionStatus}]" style="font-size: 20px;" >
    <img src="/src/assets/img/server.png"  alt="" srcset="">
     Server Status: {{status}}
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["ConnectionStatus"]),
    status: function(){
      return (this.ConnectionStatus)?'Connected':'Disconnected'
    }
  }
};
</script>

<style scoped>
  .red{
    color: red;
  }
  .green{
    color: green;
  }
</style>
