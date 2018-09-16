var dynamodb = require('./helpers/dynamodb');
var response = require('./helpers/response');

exports.handler = async (event, context, callback) => {
    var mid = event.mid;
    var connection = event.connection;
    const params = {
        TableName: 'SG_UPDATE_DEVICE',
        Key: {
            mid: mid,
        },
        UpdateExpression: "set connectionStatus = :connection",
        ExpressionAttributeValues: {
            ":connection": connection,
        },
        ReturnValues: "UPDATED_NEW"
    };
    try {
        const result = await dynamodb.call('update', params);
        console.log(result);
    } catch (e) {
        console.log(e);
        callback(null, response.failure({ status: false, error: e }));
    }
};
