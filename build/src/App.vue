<template>
  
  <div>
    <app-header></app-header>
    <app-nav></app-nav>
    <div id="main" role="main">
      <app-ribbon></app-ribbon>
        <date-time></date-time>
          <router-view></router-view>
        
        

     
    </div>
    <app-footer></app-footer>
  </div>
  
</template>

<script>
import Header from './modules/components/@shared/Header'
import Footer from './modules/components/@shared/Footer'
import Nav from './modules/components/@shared/Nav'
import Ribbon from './modules/components/@shared/Ribbon'
import DateTime from './modules/components/@shared/DateTime'
export default {
  components:{
    appHeader :Header,
    appFooter :Footer,
    appNav : Nav,
    appRibbon : Ribbon,
    DateTime
  },
  mounted () {
    // 
  },
  beforeCreate(){
    this.$store.dispatch('updateControl');
  }
}
</script>

<style>

</style>
