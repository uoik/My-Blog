var fs = require('fs');

var fils = fs.readFileSync(__dirname + '/server.conf').toString();

var filsArr = fils.split('\n');

var globalConfig = {};

for (const item of filsArr) {
    globalConfig[item.split('=')[0].trim()] = item.split('=')[1].trim();
}

module.exports = globalConfig;