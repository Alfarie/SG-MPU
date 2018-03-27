var err;

var moment = require('moment');
var fs = require('fs');
var loop = null;
var config, mcu;
var dir, loggerTime;
var shortLogger = [];

var start = function () {
    if (!err) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        loop = setInterval(LoggerLoop, loggerTime);
        console.log("[Info] Data logger initialized : " + loggerTime);
        console.log('[Info] Data logger directory: ' + dir);
    } else {
        console.log('[Info] Error occured: Data logger could not work correctly ');
    }
}

var stop = function () {
    clearInterval(loop);
}

var LoggerLoop = function () {
    var sensor = mcu.GetSensors();
    if (Object.keys(sensor).length != 0) {
        var t = sensor.time.split(":");
        var d = sensor.date.split("/");
        var datestr = "DATE" + moment(sensor.date).format('YYYY-MM-DD');
        var loggerStr = {
            'datetime': moment(sensor.date + " " + sensor.time).toDate(),
            'temperature': sensor.temperature,
            'humidity': sensor.humidity,
            'par': sensor.par,
            'soil': sensor.soil,
            'vpd': sensor.vpd,
            'co2': sensor.co2,
            'paracc': parseFloat((sensor.parAccumulation / 1000).toFixed(2))
        }
        fs.appendFile(dir + datestr, JSON.stringify(loggerStr) + ",\n", function (err) {
            if (err) console.log(err);
        });
    }
}

function GetSparkLogger() {
    /*
        date: 'DATEYYYY-MM-DD'
    */
    try {
        let date = moment(mcu.GetSensors().date).format('YYYY-MM-DD');
        let file = 'DATE' + date;
        let str = fs.readFileSync(dir + file).toString();
        str = str.substring(0, str.length - 2);
        str = "[" + str + "]";
        str = str.trim(",\n");
        let json = JSON.parse(str);
        let sparklineRecords = {
            soil: {
                max: 0,
                min: 9999,
                records: []
            },
            vpd: {
                max: 0,
                min: 9999,
                records: []
            },
            par: {
                max: 0,
                min: 9999,
                records: []
            },
            temperature: {
                max: 0,
                min: 9999,
                records: []
            },
            humidity: {
                max: 0,
                min: 9999,
                records: []
            },
            co2: {
                max: 0,
                min: 9999,
                records: []
            }
        };
        if (json.length > 0) {
            delete json[0].datetime;
            delete json[0].paracc;
            let keys = Object.keys(json[0]);
            json.forEach(d => {
                keys.forEach(key => {
                    if (d[key] >= sparklineRecords[key].max) sparklineRecords[key].max = d[key];
                    if (d[key] <= sparklineRecords[key].min) sparklineRecords[key].min = d[key];
                    sparklineRecords[key].records.push(d[key]);
                });
            });
        } else {
            json = []
        }
        return sparklineRecords
    } catch (ex) {
        console.log(ex);
        return []
    }
}

function GetLoggerByDate(date) {
    /*
        date: 'DATEYYYY-MM-DD'
    */
    try {
        var dt = date;
        var buffer = fs.readFileSync(dir + dt); // dir+ 'DATE2018-3-3'
        var str = buffer.toString();
        str = str.substring(0, str.length - 2);
        str = "[" + str + "]";
        tstr = str.trim(",\n");
        var jstr = JSON.parse(tstr);
        return jstr;
    } catch (error) {
        return {
            "status": "Error",
            "description": "No record"
        };
    }
}
function GetShortLogger(){
    return shortLogger;
}

function Initialize(p_mcu, p_config) {
    mcu = p_mcu;
    config = p_config;
    dir = config.loggerDirectory;
    loggerTime = config.loggerTime;

    mcu.Subject.GetSensorsSubject.subscribe(sensors => {
        // date time can be here
        shortLogger.push(sensors);
        if (shortLogger.length > 60) shortLogger.shift();
    });
    start();
}



module.exports = {
    Initialize,
    GetShortLogger,
    GetLoggerByDate,
    GetSparkLogger
}