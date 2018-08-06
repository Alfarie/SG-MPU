var jwt = require('jsonwebtoken');
var secret = 'ThisIsSecretMessageIntelAgro'
var expiresIn = 3600;

function sign(payload){
    var tokenId = jwt.sign(payload, secret , {
        expiresIn: expiresIn
    });
    return tokenId;
}

function verify(tokenId){
    return new Promise( (resolve, reject)=>{
        jwt.verify(tokenId, secret, function(err, decoded) {
            if(err){
                reject(err);
            }
            else{
                resolve(decoded);
            }
        })
    })
    
}

module.exports = {
    sign,
    verify,
    expiresIn
}