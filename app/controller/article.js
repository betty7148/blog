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
    let article = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: article
    }
    try{
      article = await this.ctx.service.database.getArticleById(articleId);
      replyData.data = article;
      if(article.length==0){
        replyData.status = 404;
        replyData.message = '数据库未找到此条数据'
      }
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
  }
  async getArticleByCategory() {
    const categoryName = this.ctx.params.categoryName;
    const { ctx } = this; 
    const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
    let articlelist = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: articlelist
    }
    try{
      articlelist = await this.ctx.service.database.getArticleByCategory(categoryName,pageIndex,perPageNum);
      replyData.data = articlelist;
      if(articlelist.length==0){
        replyData.status = 404;
        replyData.message = '数据库未找到此条数据'
      }
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;

  }
  async getArtCountByCategory(){
    const categoryName = this.ctx.params.categoryName;
    const { ctx } = this; 
    let articlelist = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: articlelist
    }
    try{
      articlelist =  await this.ctx.service.database.getArticleCountByCategory(categoryName);
      replyData.data = articlelist;
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
  }
  async getAllArticleCount(){
    const { ctx } = this; 
    let articlelist = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: articlelist
    }
    try{
      articlelist =  await this.ctx.service.database.getArticleCount();
      replyData.data = articlelist;
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
    
  }
  async getAllArticle() {
    const { ctx } = this; 
    // 根据id查询用户信息
    const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
  
    let article = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: article
    }
    try{
      article = await this.ctx.service.database.getAllArticleAllParams(pageIndex,perPageNum);
      replyData.data = article;
      if(article.length==0){
        replyData.status = 404;
        replyData.message = '数据库未找到此条数据'
      }
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
  }

  async getBiaoQingByArticleId(){
    const articleId = this.ctx.params.articleid;
    const { ctx } = this; 


    let biaoqing = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: biaoqing
    }
    try{
      biaoqing = await this.ctx.service.database.getBiaoQingByArticleId(articleId);
      replyData.data = biaoqing;
      if(biaoqing.length==0){
        replyData.status = 404;
        replyData.message = '数据库未找到此条数据'
      }
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
    
  }
  async uploadImg() {
    
    // const { ctx } = this; 
    let parts = this.ctx.multipart({ autoFields: true });
    let stream, img_list = []; // 图片访问地址集合
    
    const replyData={
      status:0,
      message:'上传成功',
      data:{
        isOk:true,
        url: [img_list],
        // fields: parts.field
      }
    }
    try{
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
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    
    console.log(parts.field) // 表单其他数据，可以根据需要处理
    this.ctx.body = replyData;
    // res.send({isOk:true,url:[resPath]}) //返回图片路径
  }

  async removeImg(){
    const { ctx } = this; 
    var img_name=this.ctx.query.img;

    let article = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: article
    }
    try{
      article = await ctx.service.database.getAllArticle();
      replyData.data = article;
      
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
     
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
    let article = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: article
    }
    try{
      article = await this.ctx.service.database.addArticle(art_body);
      replyData.data = article;
      if(article.length==0){
        replyData.status = 404;
        replyData.message = '数据库未找到此条数据'
      }
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
     
  }
  async editArticle(){
    let art_body=this.ctx.request.body;
    let articleid=this.ctx.params.id;
    const { ctx } = this;
    // 根据id查询用户信息
    // ctx.body= newComment;
    let result = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: result
    }
    try{
      result = await this.ctx.service.database.updateArticle(articleid,art_body);
      replyData.data = result;
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
    
  }
  async postBiaoQing() {
    const { ctx } = this;
    const id = this.ctx.params.id;
    const req_body = this.ctx.request.body;
    let result = [];
    const replyData = {
      status: 0,
      message: '获取信息成功',
      data: result
    }
    try{
      result = await this.ctx.service.database.updateBiaoQing(id, req_body);
      replyData.data = result;
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    ctx.body = replyData;
 
  }
}

module.exports = ArticleController;
