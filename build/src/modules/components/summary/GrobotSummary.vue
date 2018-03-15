<template>
    <div class="containter">
        <router-view></router-view>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getSensors"])
  },
  beforeCreate () {
    this.$store.dispatch('updateShortLogger');
    this.$store.dispatch('updateSparklineLogger');
  }
};
</script>