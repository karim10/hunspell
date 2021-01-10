const JsonBody = require('./body.json')

function setJSONBody(requestParams, context, ee, next) {
    requestParams.headers = {
        'Content-Type': 'application/json',
    };

    requestParams.body = JSON.stringify(JsonBody);
    return next();
}

module.exports = {
    setJSONBody: setJSONBody,
};
