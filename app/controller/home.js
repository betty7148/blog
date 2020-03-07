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
    ctx.body = await ctx.service.database.getAllArticle(pageIndex,perPageNum);
  }
}

module.exports = HomeController;
