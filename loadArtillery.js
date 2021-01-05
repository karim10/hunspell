module.exports = {
    setJSONBody: setJSONBody,
};

function setJSONBody(requestParams, context, ee, next) {
    console.log(requestParams);
    return next();
}
