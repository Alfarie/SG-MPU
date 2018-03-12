var express = require('express')
var router = express.Router();
var fs = require('fs');
var sensors = require('../../models/sensors');
var dir = require('../../models/config').logger_dir;
var moment = require('moment');
router.get('/short-logger', function(req, res){
    res.json(sensors.shortLogger)
})

router.get('/getdata', function(req, res) {
    var qstr = req.query;
    if (qstr.date == undefined) {
        res.json({ "status": "query error" })
        return;
    }
    var date = qstr.date;
    try {
        var buffer = fs.readFileSync( dir + date);
        var str = buffer.toString();
        str = str.substring(0, str.length - 2);
        str = "[" + str + "]";
        tstr = str.trim(",\n");
        var jstr = JSON.parse(tstr);
        delete jstr, str;
        res.json(jstr);
    } catch (error) {
        console.log(error)
        res.json({ "status": "Error", "description": "No record" })
    }
});

router.get('/checkdate', function(req, res) {
    if (req.query.my == undefined) {
        res.json({ "status": "invalid request format" });
        return;
    }

    var MY = req.query.my;
    var dateList = [];

    fs.readdir(dir , function(err, files) {
        try {
            files.forEach(function(file) {
                
                let datefile = file.replace('DATE', '');
                if (datefile.substring(0, 7) == MY) {
                    let buffer = fs.readFileSync( dir + file);
                    let str = buffer.toString();
                    str = str.substring(0, str.length - 2);
                    str = "[" + str + "]";
                    str = str.trim(",\n");
                    let json =  JSON.parse(str);
                    let data = {
                        file: file,
                        date: moment(datefile).format('YYYY-MM-DD'),
                        records: json.length
                    }
                    dateList.push(data);
                }
            });

            res.json(dateList);
            delete dateList;
            res.end();
        } catch (ex) {
            console.log(ex);
            res.json([])
        }
    });
})

router.get('/shortlogger', function(req, res) {
    res.json(sensors.shortLogger);
})

module.exports = router;