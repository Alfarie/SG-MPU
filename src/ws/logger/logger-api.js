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
})



module.exports = router;