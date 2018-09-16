var dynamodb = require('./helpers/dynamodb');
var response = require('./helpers/response');
const USER_NOT_FOUND = 'User not found.';

exports.handler = async (event, context, callback) => {
    const { queryStringParameters } = event;
    var from = queryStringParameters.from;
    var to = queryStringParameters.to;
    var mid = queryStringParameters.mid;
    if(from == undefined || to == undefined){
        callback(null, response.failure({ status: false, error: 'Query string must contain from and to.' }));
    }
    const params = {
        TableName: 'SG_LOG_SENSORS',
        Key: {
            mid: mid,
        },
        KeyConditionExpression: "mid = :mid and #ts between :from and :to",
        ProjectionExpression: "payload, #ts",
        ExpressionAttributeNames:{
            "#ts": "timestamp"
        },
        ExpressionAttributeValues: {
            ":mid": mid,
            ":from": parseInt(from),
            ":to": parseInt(to)
        }
    };
    try {          
        const result = await dynamodb.call('query', params);
        console.log(result)    
        if (result) {
            callback(null, response.success(result));
        } else {
            callback(null, response.notFound({ status: false, error: 'NO DATA'}));
        }
    } catch (e) {
        console.log(e);
        callback(null, response.failure({ status: false, error: e }));
    }
};