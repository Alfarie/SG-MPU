webpackJsonp([15],{1118:function(t,a,e){var r=e(1119);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e(94)("294b4ff9",r,!0,{})},1119:function(t,a,e){a=t.exports=e(93)(!1),a.push([t.i,"td[data-v-5008f9f5]{font-size:16px;font-weight:400;text-align:left}",""])},1120:function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"col-lg-8 col-lg-offset-2"},[e("div",{staticClass:"jarviswidget jarviswidget-color-greenDark jarviswidget-sortable",attrs:{id:"wid-id-3"}},[t._m(0),t._v(" "),e("div",{attrs:{role:"content"}},[e("div",{staticClass:"jarviswidget-editbox"}),t._v(" "),e("div",{staticClass:"widget-body"},[e("form",{staticClass:"smart-form"},[e("header",[t._v("\n           Par Accumulation Chart\n         ")]),t._v(" "),t._m(1),t._v(" "),e("header",[t._v("\n           PAR Status\n         ")]),t._v(" "),e("fieldset",[e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table table-hover"},[t._m(2),t._v(" "),e("tbody",t._l(t.getChannelParAcc,function(a,r){return e("tr",{directives:[{name:"show",rawName:"v-show",value:5==t.control[r].mode,expression:"control[index].mode == 5"}],key:r},[e("td",{staticStyle:{width:"10%"}},[t._v(t._s(r+1))]),t._v(" "),e("td",{staticStyle:{width:"60%"}},[e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar",style:{width:a.par_acc/1e6/t.control[r].irrigation.par_acc*100+"%"},attrs:{role:"progressbar","aria-valuenow":"80","aria-valuemin":"0","aria-valuemax":"100"}},[t._v("\n                         "+t._s(a.par_acc/1e6)+"/"+t._s(t.control[r].irrigation.par_acc)+" MJ\n                       ")])])]),t._v(" "),e("td",[t._v("\n                     "+t._s(t._f("toFixed")(a.par_acc/1e6/t.control[r].irrigation.par_acc*100))+" %\n                   ")]),t._v(" "),e("td",[t._v("\n                     "+t._s(0==a.mode?"Soil":"PAR")+" \n                   ")])])}))])])]),t._v(" "),e("header",[t._v("\n           Infomation\n         ")]),t._v(" "),e("fieldset",[e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table table-hover"},[t._m(3),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("Current PAR")]),t._v(" "),e("td",[t._v(" "+t._s(t.getSensors.par)+"  ")])]),t._v(" "),e("tr",[e("td",[t._v("PAR Accumulation ")]),t._v(" "),e("td",[t._v(" "+t._s(t.getSensors.paracc)+"  ")])]),t._v(" "),e("tr",[e("td",[t._v("Average PAR")]),t._v(" "),e("td",[t._v(" "+t._s(t.parAccLog.avg)+"  ")])]),t._v(" "),e("tr",[e("td",[t._v("Minimum PAR")]),t._v(" "),e("td",[t._v(" "+t._s(t.parAccLog.min)+"  ")])]),t._v(" "),e("tr",[e("td",[t._v("Maximum PAR")]),t._v(" "),e("td",[t._v(" "+t._s(t.parAccLog.max)+"  ")])])])])])])])])])])])])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("header",{staticClass:"ui-sortable-handle",attrs:{role:"heading"}},[e("div",{staticClass:"jarviswidget-ctrls",attrs:{role:"menu"}},[e("a",{staticClass:"button-icon jarviswidget-fullscreen-btn"},[e("i",{staticClass:"fa fa-expand "})])]),t._v(" "),e("h2",[e("strong",[t._v("Par Accumulation")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("fieldset",[e("div",{staticStyle:{width:"100%",height:"300px"},attrs:{id:"paraccgraph"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{staticStyle:{padding:"10px"}},[t._v("CHANNEL")]),t._v(" "),e("th",{staticStyle:{padding:"10px"}},[t._v("Progress")]),t._v(" "),e("th",{staticStyle:{padding:"10px"}},[t._v("Percentage")]),t._v(" "),e("th",{staticStyle:{padding:"10px"}},[t._v("Mode")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{staticStyle:{padding:"10px"}},[t._v("STATUS")]),t._v(" "),e("th",{staticStyle:{padding:"10px"}},[t._v("OUTPUT (watt/m"),e("sup",[t._v("2")]),t._v(")")])])])}],s={render:r,staticRenderFns:i};a.a=s},357:function(t,a,e){"use strict";function r(t){e(1118)}Object.defineProperty(a,"__esModule",{value:!0});var i=e(960),s=e(1120),n=e(20),c=r,o=n(i.a,s.a,!1,c,"data-v-5008f9f5",null);a.default=o.exports},960:function(t,a,e){"use strict";var r=e(59),i=e.n(r),s=e(57);a.a={computed:i()({},Object(s.b)(["getSensors","parAccLog","getDateTime","getChannelParAcc","control"])),filters:{toFixed:function(t){return t?t.toFixed(2):""}},methods:{refresh:function(){this.$store.dispatch("getParAccLogger")},loggerInterval:function(){this.$store.dispatch("getLoggerInterval")},createGraph:function(t){var a=this;setTimeout(function(){new Dygraph(document.getElementById("paraccgraph"),t,{customBars:!0,title:"Daily Par Accumulation : in "+moment(a.getDateTime.date).format("DD-MMM"),ylabel:"Par Accumulation",legend:"always",labelsDivStyles:{textAlign:"right"},showRangeSelector:!0})},500)},craftParAccStringData:function(){var t="";t="Date,PARACC\n";moment(this.parAccLog.data[0].datetime).format("MMM Do YY");return this.parAccLog.data.forEach(function(a){var e=moment(a.datetime).format("YYYY-MM-DD HH:mm:ss"),r=a.paracc-1e4+";"+a.paracc+";"+(a.paracc+1e4);t+=e+","+r+"\n"}),t},createParGraph:function(t){var a=this;setTimeout(function(){new Dygraph(document.getElementById("pargraph"),t,{customBars:!0,title:"Daily PAR : in "+moment(a.getDateTime.date).format("DD-MMM"),ylabel:"PAR",legend:"always",labelsDivStyles:{textAlign:"right"},showRangeSelector:!0})},500)},craftParStringData:function(){var t="";t="Date,PARACC\n";moment(this.parAccLog.data[0].datetime).format("MMM Do YY");return this.parAccLog.data.forEach(function(a){var e=moment(a.datetime).format("YYYY-MM-DD HH:mm:ss"),r=a.par-100+";"+a.par+";"+(a.par+100);t+=e+","+r+"\n"}),t}},mounted:function(){var t=this;this.$store.dispatch("updateControl"),this.$store.dispatch("getParAccLogger"),this.$store.dispatch("popupParAcc"),setTimeout(function(){var a=t.craftParAccStringData();t.createGraph(a);var e=t.craftParStringData();t.createParGraph(e)},2e3)}}}});
//# sourceMappingURL=15.build.js.map