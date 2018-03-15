import Vue from 'vue';

Vue.filter('toUpperCase', (value) => {
  return value.toUpperCase();
});
Vue.filter('minToTime', (value) => {
  let h = (Math.floor(value / 60));
  h = h < 10 ? '0' + h : h;
  let min = value % 60;
  min = min < 10 ? '0' + min : min;
  return h + ':' + min;
});
