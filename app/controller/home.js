'use strict';

const Controller = require('egg').Controller;
const ejs = require('ejs');
const fs = require('fs');
const path = require('path')

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const env = process.env.NODE_ENV;
    if (env === 'development') {
      const reply = await this.app.curl('http://127.0.0.1:3000/public/index.html', {
        dataType: 'text',
        method: 'GET'
      });
      const html = await ejs.render(reply.data);
      
      ctx.body = html;
    } else {
      const reply = fs.readFileSync(path.resolve(__dirname, '../../public/index.html'));
      ctx.body = reply.toString();
    }
  }
  async helloworld() {
    const { ctx } = this;
    ctx.body = 'helloworld';
  }
  async getHomeArticle() {
    const { ctx } = this;
    const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
   
    let article = [];
    const replyData = {
      status: 0,
      message: '',
      data: article
    }
    try{
      article = await await ctx.service.database.getAllArticle(pageIndex,perPageNum);
      replyData.data = article;
      if(article.length==0){
        replyData.status = 404;
        replyData.message = '数据库未找到此条数据'
      }
    }catch(e){
      replyData.status = 1001;
      replyData.message = '服务器繁忙，请稍后访问'
    }
    
    //article[comment_num] = await this.ctx.service.database.getArticleCommentCountById(articleId);
    
    //article.comment_num = 1;
    ctx.body = replyData;

  }
}

module.exports = HomeController;
