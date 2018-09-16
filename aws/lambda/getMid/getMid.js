var dynamodb = require('./helpers/dynamodb');
var response = require('./helpers/response');
const USER_NOT_FOUND = 'User not found.';

exports.handler = async (event, context, callback) => {
    const { pathParameters } = event;
    // callback(null, response.success(pathParameters));
    let identityId = pathParameters.identityid;
    const params = {
        TableName: 'Plantlab_User_Mid',
        ProjectionExpression: "mid",
        FilterExpression: "identityId = :identityId",
        ExpressionAttributeValues: {
            ":identityId": identityId 
        }
    };
    try {          
        const result = await dynamodb.call('scan', params);
        console.log(result)    
        if (result.Items ) {
            callback(null, response.success({ items: result.Items, identityId: identityId}));
        } else {
            callback(null, response.notFound({ status: false, error: USER_NOT_FOUND, id: identityId }));
        }
    } catch (e) {
        console.log(e);
        callback(null, response.failure({ status: false, error: e }));
    }
};