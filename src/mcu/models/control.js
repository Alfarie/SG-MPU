var fs = require('fs');
var strbf = fs.readFileSync(__dirname + '/control.json').toString();

const channel1 = JSON.parse(strbf);
const channel2 = JSON.parse(strbf);
const channel3 = JSON.parse(strbf);
const channel4 = JSON.parse(strbf);

var control = [
    channel1, channel2, channel3, channel4
]

module.exports = {
    control
}