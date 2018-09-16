var transmiter = require('./aws-transmiter');
var reciever = require('./aws-reciever');

transmiter.Init();

module.exports = {
    transmiter,
    reciever
}