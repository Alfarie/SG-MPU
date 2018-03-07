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
  }
};
</script>