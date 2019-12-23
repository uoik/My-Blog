var svgCaptcha = require('svg-captcha')

var respUtil = require('../util/respUtil')

var path = new Map();

/**
 * 获取验证码
 * @param {*} req 
 * @param {*} res 
 */
function getSvgCaptcha(req, res){
    var captcha = svgCaptcha.create({'fontSize': 50, 'width': 100, 'height': 32})
    res.writeHead(200);
    res.write(respUtil('success', '查询成功', captcha))
    res.end();
}
path.set('/getSvgCaptcha', getSvgCaptcha);

module.exports.path = path;
