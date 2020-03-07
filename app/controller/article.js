'use strict';

const Controller = require('egg').Controller;
const ejs = require('ejs');
const path = require('path');
const fs = require('fs')
const pump = require('pump');

// const OSS = require('ali-oss')
// let client = new OSS({
//         region: 'oss-cn-najing',
//         accessKeyId: 'youid',
//         accessKeySecret: 'yoursecret',
//         bucket: 'yourbucket',
//         secure:true //    secure：配合region使用。如果指定secure为true，则使用 HTTPS 访问,不配置，调用下面get方法，则看到为htttp开头
// });

class ArticleController extends Controller {
    
  async getArticleById() {
    const articleId = this.ctx.params.id;
    const { ctx } = this; 
    // 根据id查询用户信息
    let article = await this.ctx.service.database.getArticleById(articleId);
    ctx.body = article;
  }
  async getArticleByCategory() {
    const categoryName = this.ctx.params.categoryName;
    const { ctx } = this; 
    const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
    // 根据id查询用户信息
    let articlelist = await this.ctx.service.database.getArticleByCategory(categoryName,pageIndex,perPageNum);
    ctx.body = articlelist;
  }
  async getArticleCount(){
    const categoryName = this.ctx.params.categoryName;
    const { ctx } = this; 
    // const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    // const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
    // // 根据id查询用户信息
    let articlelist = await this.ctx.service.database.getArticleCountByCategory(categoryName);
    ctx.body = articlelist;
  }
  async getAllArticleCount(){
    const { ctx } = this; 
    let articlelist = await this.ctx.service.database.getArticleCount();
    ctx.body = articlelist;
  }
  async getAllArticle() {
    const { ctx } = this; 
    // 根据id查询用户信息
    const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
    let articlelist = await this.ctx.service.database.getAllArticleAllParams(pageIndex,perPageNum);
    ctx.body = articlelist;
  }

  async getBiaoQingByArticleId(){
    const articleId = this.ctx.params.articleid;
    const { ctx } = this; 
    // 根据id查询用户信息
    let biaoqing = await this.ctx.service.database.getBiaoQingByArticleId(articleId);
    ctx.body = biaoqing;
  }
  async uploadImg() {
    this.ctx.body = {
      // path:path,
      isOk:true,
      // filename:path.extname(stream.filename).toLocaleLowerCase(),
      // fields: parts.field
    }
    // const { ctx } = this; 
    let parts = this.ctx.multipart({ autoFields: true });
    let stream, img_list = []; // 图片访问地址集合
    
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      
      // 文件名为：时间戳+随机字符串+.文件后缀
      let filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
      // 上传图片的目录
      let target = 'public/image/' + filename;
      img_list.push('public/image/' + filename);
      let writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
    }
    console.log(parts.field) // 表单其他数据，可以根据需要处理

    // res.send({isOk:true,url:[resPath]}) //返回图片路径

    this.ctx.body = {
      isOk:true,
      url: [img_list],
      // fields: parts.field
    }
  }

  async removeImg(){
    const { ctx } = this; 
    var img_name=this.ctx.query.img;
    ctx.body = await ctx.service.database.getAllArticle();
    // fs.rmdir(img_name,(err) => {
    //   if (err) {
    //     this.ctx.body=err;
    //   } else {
    //     this.ctx.body='ok';
    //   }
    // });
    // let result = await client.delete(url);

  }
  async postArticle(){
    let art_body=this.ctx.request.body;
    const { ctx } = this;
    // 根据id查询用户信息
    // ctx.body= newComment;
    let commentlist = await this.ctx.service.database.addArticle(art_body);
    ctx.body = commentlist;
  }
  async editArticle(){
    let art_body=this.ctx.request.body;
    let articleid=this.ctx.params.id;
    const { ctx } = this;
    // 根据id查询用户信息
    // ctx.body= newComment;
    let editresult = await this.ctx.service.database.updateArticle(articleid,art_body);
    ctx.body = editresult;
  }
  async postBiaoQing() {
    const { ctx } = this;
    const id = this.ctx.params.id;
    const req_body = this.ctx.request.body;
    const update = this.ctx.service.database.updateBiaoQing(id, req_body);
    ctx.body = req_body;
  }
}

module.exports = ArticleController;
