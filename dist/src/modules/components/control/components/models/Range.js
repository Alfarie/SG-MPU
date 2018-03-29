export default {
    vpd:{
        name: 'vpd',
        hide_min_max: true,
        min: 0,
        max: 5000,
        from: 1500,
        type: 'single',
        step: 1,
        postfix: " Pa",
        grid: true
    },
    temperature: {
        name: 'temperature',
        hide_min_max: true,
        min: 0,
        max: 50,
        from: 25,
        type: 'single',
        step: 1,
        postfix: " C",
        grid: true
    },
    humidity: {
        name: 'humidity',
        hide_min_max: true,
        min: 0,
        max: 100,
        from: 50,
        type: 'single',
        step: 1,
        postfix: " %",
        grid: true
    },
    par: {
        name: 'par',
        hide_min_max: true,
        min: 0,
        max: 3,
        from: 1.0,
        type: 'single',
        step: 0.1,
        postfix: " MJ",
        grid: true
    },
    soil: {
        name: 'soil',
        hide_min_max: true,
        min: 0,
        max: 100,
        from: 50,
        type: 'single',
        step: 1,
        postfix: " %",
        grid: true
    },
    co2: {
        name: 'co2',
        hide_min_max: true,
        min: 0,
        max: 5000,
        from: 1000,
        to: 1200,
        type: 'single',
        step: 1,
        postfix: " ppm",
        grid: true
    }
}