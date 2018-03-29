var $ = (window.jquery = require('jquery'));
export default {
  vpd: {
    id: 'vpd-pie',
    max: 5000,
    min: 0,
    postFix: ' Pa',
    data: {
      barColor: '#7df442',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      lineWidth: 3,
      size: 70,
      animate: 1000,
      onStart: $.noop,
      onStop: $.noop
    }
  },
  soil: {
    id: 'soil-pie',
    max: 100,
    min: 0,
    postFix: '%',
    data: {
      barColor: '#7df442',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      lineWidth: 3,
      size: 70,
      animate: 1000,
      onStart: $.noop,
      onStop: $.noop
    }
  },
  par: {
    id: 'par-pie',
    max: 200,
    min: 0,
    postFix: 'W/sqm',
    data: {
      barColor: '#7df442',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      lineWidth: 3,
      size: 70,
      animate: 1000,
      onStart: $.noop,
      onStop: $.noop
    }
  },
  humidity: {
    id: 'humi-pie',
    max: 100,
    min: 0,
    postFix: '%',
    data: {
      barColor: '#7df442',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      lineWidth: 3,
      size: 70,
      animate: 1000,
      onStart: $.noop,
      onStop: $.noop
    }
  },
  temperature: {
    id: 'temp-pie',
    max: 50,
    min: 0,
    postFix: 'C',
    data: {
      barColor: '#7df442',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      lineWidth: 3,
      size: 70,
      animate: 1000,
      onStart: $.noop,
      onStop: $.noop
    }
  },
  co2: {
    id: 'co2-pie',
    max: 5000,
    min: 0,
    postFix: ' ppm',
    data: {
      barColor: '#7df442',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      lineWidth: 3,
      size: 70,
      animate: 1000,
      onStart: $.noop,
      onStop: $.noop
    }
  }
}
