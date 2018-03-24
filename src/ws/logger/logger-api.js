var express = require('express')
var router = express.Router();
var fs = require('fs');
var logger = require('../../datalogger/datalogger');
router.get('/finds/date', function (req, res) {
    var qstr = req.query;
    if (qstr.date == undefined) {
        res.json({
            "status": "query error"
        })
        return;
    }
    res.json(logger.GetLoggerByDate(qstr.date));
});

router.get('/finds/date/csv', function (req, res) {
    var qstr = req.query;
    if (qstr.date == undefined) {
        res.json({
            "status": "query error"
        })
    }
    var json = logger.GetLoggerByDate(qstr.date);
    console.log(json);

    let keys = Object.keys(json[0]);
    res.csv(
        json, {
            fields: keys
        });
});


router.get('/finds/short', function (req, res) {
    res.json(logger.GetShortLogger());
});

router.get('/finds/sparks', function (req, res) {
    res.json(logger.GetSparkLogger());
})



router.get('/finds/loggers/months', function (req, res) {
    if (req.query.my == undefined) {
        res.json({
            "status": "invalid request format"
        });
        return;
    }
    var MY = req.query.my;
    var dateList = [];

    fs.readdir(dir, function (err, files) {
        try {
            files.forEach(function (file) {
                // 2018-3-18
                // 2018-3-1
                // 2018-03-18
                let datefile = file.replace('DATE', '');
                if (datefile.substring(0, 7) == MY) {
                    let buffer = fs.readFileSync(dir + file);
                    let str = buffer.toString();
                    str = str.substring(0, str.length - 2);
                    str = "[" + str + "]";
                    str = str.trim(",\n");
                    let json = JSON.parse(str);
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



module.exports = router;