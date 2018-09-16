
var interface = require('../args/config.js').interface;
console.log(interface);
module.exports.mac = null;

function getMac() {
    return new Promise((resolve, reject) => {
        require('getmac').getMac({ iface: interface }, function (err, macAddress) {
            if (err) throw err
            mac = macAddress.split(":").join('')
            resolve(macAddress.split(":").join(''));
        });
    })
}

async function init(){
    module.exports.mac = await getMac();
}

module.exports.getmac = async function(){
    return await getMac();
}

init();