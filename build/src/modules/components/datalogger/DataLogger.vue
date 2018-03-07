<template>
  <div class="containter">
      <h1>Data Logger</h1>
        <article class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
       <app-select-panel></app-select-panel>
        </article>
    </div>
</template>


<script>

import SelectPanel from './components/SelectPanel.vue'
export default{
  components: { 
    appSelectPanel : SelectPanel
  }
}
</script>