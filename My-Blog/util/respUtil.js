module.exports = function respUtil(status, msg, data) {
    return JSON.stringify({status, msg, data});
}

