'use strict';
const Service = require('egg').Service;

class ToolsService extends Service {
  /**
   * 获取文件上传目录
   * @param {*} filename
   */
  async getUploadFile(filename) {
    // 1、获取当前日期     20180920
    let day = sd.format(new Date(), 'YYYYMMDD');
    // 2、创建图片保存的路径
    let dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir); // 不存在就创建目录
    let date = Date.now(); /* 毫秒数*/
    // 返回图片保存的路径
    let uploadDir = path.join(dir, date + path.extname(filename));
    // app\public\admin\upload\20190914\1536895331444.png
    return {
      uploadDir,
      saveDir: this.ctx.origin + uploadDir.slice(3).replace(/\\/g, '/'),
    };
  }
}
module.exports = ToolsService;
