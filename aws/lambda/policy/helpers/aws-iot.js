/*
  Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except
  in compliance with the License. A copy of the License is located at

      http://aws.amazon.com/apache2.0/

  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

var AWS = require('aws-sdk')

module.exports.attachPrincipalPolicy = (policyName, principal) => {
  const iot = new AWS.Iot();
  const params = { policyName, principal };
  return iot.attachPrincipalPolicy(params).promise();
};

module.exports.createPolicy = (policyDocument, policyName) => {
  const iot = new AWS.Iot();
  const params = { policyDocument, policyName };
  return iot.createPolicy(params).promise();
};
