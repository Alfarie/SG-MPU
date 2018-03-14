var express = require('express');
var router = express.Router();
var setting = require('../../models/setting');
var SendDateTime = require('../../serial/command_dispatcher').SendDateTime
var sensors = require('../../models/sensors');
router.get('/', function(req,res){
    res.json(setting);
});

router.post('/datetime', function(req,res){
    SendDateTime(req.body);
    res.json({msg: 'success'})
});

router.post('/activity', function(req,res){
    
    res.json({msg: 'success'});
});

router.post('/network', function(req,res){

    res.json({msg: 'success'})
});

module.exports = router;