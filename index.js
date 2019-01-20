const microToLambda = require('@orikami/micro-to-lambda');
const index = require('./handler');
module.exports.exe = microToLambda(index);
