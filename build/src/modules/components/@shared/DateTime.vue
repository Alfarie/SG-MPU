<template>
    <div class="container-fluid" style="margin-top: 10px;">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
            <ul id="sp" class="">
                <li class="sp-info">
                    <h5> Date <span class="txt-color-purple"><i class="fa fa-calendar"></i> {{getSensors.date}}</span></h5>
                    <div class="txt-color-purple hidden-mobile hidden-md hidden-sm">
                    </div>
                </li>
                <li class="sp-info">
                    <h5 >Time <span class="txt-color-blue"><i class="fa fa-clock-o"></i> {{getSensors.time}}</span></h5>
                    <div class="hidden-mobile hidden-md hidden-sm">
                    </div>
                </li>
            </ul>
        </div>
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

<style scoped>
h5 {
  font-family: "Open Sans", Arial, Helvetica, Sans-Serif;
}
#sp {
  text-align: center;
  background: #e0e0e0;
  padding: 5px 0;
  margin-bottom: 15px;
  box-sizing: border-box;
}
#sp li {
  display: inline-block;
  max-height: 47px;
  overflow: hidden;
  text-align: left;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
}

#sp li h5 {
  color: #555;
  float: left;
  font-size: 15px;
  font-weight: 400;
  margin: -3px 0 0 0;
  padding: 0;
  border: none;
  text-transform: uppercase;
}

#sp li span {
  color: #636363;
  display: block;
}

#sp li {
  border-left: 1px dotted #c7c7c7;
  padding: 0 10px;
}

#sp li:last-child {
  padding-right: 0;
}

#sp li:first-child {
  border-left: none;
  padding-left: 0;
}

.sp-info {
  min-width: 70px;
}

.sp-info span {
  font-size: 18px;
  line-height: 20px;
  margin: 0;
  text-transform: none;
}

.sp-info .sparkline {
  display: block;
  float: right;
  margin: 3px 0 0 20px;
}
</style>

