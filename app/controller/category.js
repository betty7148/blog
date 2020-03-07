'use strict';

const Controller = require('egg').Controller;
const ejs = require('ejs');

class CategoryController extends Controller {
  /**
   * 获取哪个文章所有评论的列表，获取的列表按照时间降序排列
   * 传入的参数包括分页的index,每页的数量,新增了几个评论，导致获取评论时，index向后加多少
   */
  async getCategoryList() {
    const { ctx } = this;
    // const article_id = this.ctx.params.id;
    // const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    // const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
    // const flag = Number.parseInt(this.ctx.query.flag);
    // 根据id查询用户信息
    let categorylist = await this.ctx.service.database.getCategoryList();
    ctx.body = categorylist;
  }

}

module.exports = CategoryController;
