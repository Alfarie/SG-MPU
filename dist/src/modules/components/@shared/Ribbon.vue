<template>
  <div id="ribbon">
				<span class="ribbon-button-alignment"> 
					<span id="refresh" class="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i class='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
						<i class="fa fa-refresh"></i>
					</span> 
				</span>
				
				<ol class="breadcrumb">
					<li v-for="path in getPath" :key="path">{{path}}</li>
				</ol>
			</div>
</template>

<script>
export default {
  computed: {
	  getPath(){
		  return  this.$route.path.replace("/", "").split("/")
	  }
  }
};
</script>
