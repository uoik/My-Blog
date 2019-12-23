var tagsDao = require('../dao/tagsDao');

var respUtil = require('../util/respUtil');

var path = new Map();

function queryAllTags(req, res){
    tagsDao.queryAllTags((result) => {
        res.writeHead(200);
        res.write(respUtil('success', '查询成功', result));
        res.end();
    })
}
path.set('/queryAllTags', queryAllTags);

module.exports.path = path;