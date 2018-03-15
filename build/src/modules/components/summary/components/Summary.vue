<template>
  <div class="container-fluid">
      <app-sensors></app-sensors>
  </div>
</template>

<script>

import Sensors from "./Sensors/Sensors";
export default {
  components: {
    appSensors: Sensors
  }
};
</script>
