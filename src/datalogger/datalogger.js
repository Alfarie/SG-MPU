var err;

var moment = require('moment');
var fs = require('fs');
var db = require('../dbs/db');
var statusModel = require('../mcu/models/status');
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
        // console.log(sensor);
        // { soil: 0, temperature: 0, humidity: 0, vpd: 0, par: 1000, co2: 0 }
        var loggerStr = {
            datetime: moment(statusModel.datetime.date + " " + statusModel.datetime.time).format('YYYY-MM-DD HH:mm:ss'),
            soil: sensor.soil,
            temperature: sensor.temperature,
            humidity: sensor.humidity,
            vpd: sensor.vpd,
            par: sensor.par,
            co2: sensor.co2,
            paracc: sensor.paracc
        }
        // fs.appendFile(dir + datestr, JSON.stringify(loggerStr) + ",\n", function (err) {
        //     if (err) console.log(err);
        // });
        let sql = `INSERT INTO sensors_logger(timestamp,datetime,soil,temperature,humidity,vpd,par,co2,paracc)
                VALUES(?,?,?,?,?,?,?,?,?);`
        let params = [
            moment(statusModel.datetime.date + " " + statusModel.datetime.time).unix(),
            loggerStr.datetime,
            loggerStr.soil,
            loggerStr.temperature,
            loggerStr.humidity,
            loggerStr.vpd,
            loggerStr.par,
            loggerStr.co2,
            loggerStr.paracc
        ]
        db.ExecSql(sql, params).catch(error => console.log(error, params[1],loggerStr.paracc))
    }
}

function GetSparkLogger() {
    /*
        date: 'DATEYYYY-MM-DD'
    */
    // try {
    //     let date = moment(mcu.GetSensors().date).format('YYYY-MM-DD');
    //     let file = 'DATE' + date;
    //     let str = fs.readFileSync(dir + file).toString();
    //     str = str.substring(0, str.length - 2);
    //     str = "[" + str + "]";
    //     str = str.trim(",\n");
    //     let json = JSON.parse(str);
    //     let sparklineRecords = {
    //         soil: {
    //             max: 0,
    //             min: 9999,
    //             records: []
    //         },
    //         vpd: {
    //             max: 0,
    //             min: 9999,
    //             records: []
    //         },
    //         par: {
    //             max: 0,
    //             min: 9999,
    //             records: []
    //         },
    //         temperature: {
    //             max: 0,
    //             min: 9999,
    //             records: []
    //         },
    //         humidity: {
    //             max: 0,
    //             min: 9999,
    //             records: []
    //         },
    //         co2: {
    //             max: 0,
    //             min: 9999,
    //             records: []
    //         }
    //     };
    //     if (json.length > 0) {
    //         delete json[0].datetime;
    //         delete json[0].paracc;
    //         let keys = Object.keys(json[0]);
    //         json.forEach(d => {
    //             keys.forEach(key => {
    //                 if (d[key] >= sparklineRecords[key].max) sparklineRecords[key].max = d[key];
    //                 if (d[key] <= sparklineRecords[key].min) sparklineRecords[key].min = d[key];
    //                 sparklineRecords[key].records.push(d[key]);
    //             });
    //         });
    //     } else {
    //         json = []
    //     }
    //     return sparklineRecords
    // } catch (ex) {
    //     console.log(ex);
    //     return []
    // }

    return [];
}

function GetLoggerByDate(date) {
    /*
        date: 'DATEYYYY-MM-DD'
    */
    let today = moment(date.replace('DATE', '') + " 00:00:00");
    let limitday = moment(date.replace('DATE', '') + " 23:59:59");

    let sql = 'SELECT * FROM sensors_logger WHERE timestamp between ? AND ?;'
    let params = [today.unix(), limitday.unix()];

    return new Promise((resolve, reject) => {
        db.GetSql(sql, params).then(
            rows => {
                resolve(rows);
            }
        )
    });
}

function GetLoggerByDateInterval(date, seconds) {
    /*
        date: 'DATEYYYY-MM-DD'
    */
    let today = moment(date.replace('DATE', '') + " 00:00:00");
    let limitday = moment(date.replace('DATE', '') + " 23:59:59");
    let sql = 'SELECT * FROM sensors_logger WHERE timestamp between ? AND ?;'
    let params = [today.unix(), limitday.unix()];

    return new Promise((resolve, reject) => {
        db.GetSql(sql, params).then(
            rows => {
                //    resolve(rows);
                var skipTime = seconds;
                var i = 0;
                var length = rows.length;
                var data = []
                while (i < length) {
                    if (skipTime == 0) {
                        data.push(rows[i]);
                        skipTime = seconds;
                    }
                    else {
                        skipTime--;
                    }
                    i++;
                }
                resolve(data);
            }
        )
    });
}

function GetShortLogger() {
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
    setTimeout(() => start(), 3000);
}

module.exports = {
    Initialize,
    GetShortLogger,
    GetLoggerByDate,
    GetLoggerByDateInterval,
    GetSparkLogger
}