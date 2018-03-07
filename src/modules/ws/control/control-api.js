var express = require('express');
var router = express.Router();
var control = require('../../models/control');
var SendCommand = require('../../serial/command_dispatcher').SendCommand

router.get('/', function(req,res){
    res.json(control);
});

router.post('/', function(req,res){
    let control = req.body.control;
    let ch = req.body.ch;
    control.forEach(d=>{
        SendCommand(d,ch);
    })
    res.json({msg: 'successfull'})
});

module.exports = router;