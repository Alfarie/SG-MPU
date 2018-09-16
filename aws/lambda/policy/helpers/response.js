const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});


module.exports.success = body => buildResponse(200, body);

module.exports.badRequest = body => buildResponse(400, body);

module.exports.notFound = body => buildResponse(404, body);

module.exports.failure = body => buildResponse(500, body);