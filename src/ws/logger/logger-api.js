var express = require('express')
var router = express.Router();
var fs = require('fs');
var logger = require('../../datalogger/datalogger');

router.get('/gets/date', function (req, res) {
    var qstr = req.query;
    if (qstr.date == undefined) {
        res.json({
            "status": "query error"
        })
        return;
    }
    logger.GetLoggerByDate(qstr.date).then(
        rows => {
            res.json(rows);
        }
    )
});

router.get('/gets/date/intervals', function (req, res) {
    var qstr = req.query;
    if (qstr.date == undefined && qstr.second == undefined) {
        res.json({
            "status": "query error"
        })
        return;
    }
    logger.GetLoggerByDateInterval(qstr.date, qstr.second).then(
        rows => {
            res.json(rows);
        }
    )
});

router.get('/gets/date/paracc', function (req, res) {
    var qstr = req.query;
    if (qstr.date == undefined) {
        res.json({
            "status": "query error"
        })
        return;
    }
    
    logger.GetLoggerByDate(qstr.date).then(
        rows => {
            var data = []
            var paracc = 0;
            var min = 10000;
            var max = 0;
            var skip = 5;
            rows.forEach( row =>{
                min = ( row.par < min )? row.par: min;
                max = ( row.par > max )? row.par: max;
                paracc += row.par;
                var temp = {
                    datetime: row.datetime,
                    par: row.par,
                    paracc: row.paracc
                }
                if(skip-- <= 0){
                    data.push(temp);
                    skip = 5;
                }
            })
            var avgPar = paracc / rows.length;
            res.json({
                min: min,
                max: max,
                avg: avgPar,
                current: paracc,
                data: data
            });
        }
    )
});


router.get('/gets/date/csv', function (req, res) {
    var qstr = req.query;
    if (qstr.date == undefined) {
        res.json({
            "status": "query error"
        })
    }
    // console.log(json);
    logger.GetLoggerByDate(qstr.date).then(rows => {
        let keys = Object.keys(rows[0]);
        res.csv(
            rows, {
                fields: keys
            });
    });
});





router.get('/finds/short', function (req, res) {
    res.json(logger.GetShortLogger());
});

router.get('/finds/sparks', function (req, res) {
    res.json(logger.GetSparkLogger());
});

router.get('/finds/loggers/months', function (req, res) {
    if (req.query.my == undefined) {
        res.json({
            "status": "invalid request format"
        });
        return;
    }
});
module.exports = router;