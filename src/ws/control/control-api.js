var express = require('express');
var router = express.Router();
var GetControl   = require('../../mcu/mcu').GetControl;
var SendCommand  = require('../../mcu/mcu').SendCommand;

router.get('/', function(req,res){
    console.log('[Info] Control API: Request');
    var control = GetControl();
    res.json(control);
});

router.post('/', function(req,res){
    console.log(req.body);
    SendCommand(req.body.control);
    res.json({msg: 'successfull'})
});

module.exports = router;