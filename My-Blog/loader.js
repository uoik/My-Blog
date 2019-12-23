var fs = require('fs');

var globalConfig = require('./config');

var paths = new Map();
var files = fs.readdirSync(__dirname + '/' + globalConfig['web_path']);

for (const file of files) {
    var temp = require(__dirname + '/' + globalConfig['web_path'] + '/' + file);
    if(temp.path){
        for (const [k, v] of temp.path) {
            if(paths.get(k) == null){
                paths.set(k, v);
            } else {
                throw new Error('url：' + k + '异常');
            }
        }
    }
}

module.exports.paths = paths;