var path = new Map();
var everyDayDao = require('../dao/everyDayDao');
var respUtil = require('../util/respUtil');

// 将每日一句的数据插入到数据库中
function insertEveryDay (req, res) {
    req.on('data', (data) => {
        var params = JSON.parse(data.toString());
        everyDayDao.insertEveryDay(params.content, params.from, (result) => {
            res.writeHead(200);
            res.write(respUtil('success', '添加成功', null));
            res.end();
        })
    })
}
path.set('/insertEveryDay', insertEveryDay)

// 获取每日一句的最后一条数据
function queryEveryDay(req, res) {
    everyDayDao.queryEveryDay((result) => {
        res.writeHead(200, {'content-type':'text/html; charset=utf-8'});
        res.write(respUtil('success', '查询成功', result[0]));
        res.end();
    })
}
path.set('/queryEveryDay', queryEveryDay)

module.exports.path = path;