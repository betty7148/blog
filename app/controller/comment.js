'use strict';

const Controller = require('egg').Controller;
const ejs = require('ejs');

class CommentController extends Controller {
  /**
   * 向哪个文章新增一条评论
   */
  async addComment() {
    const article_id = this.ctx.params.id;
    const newComment = this.ctx.request.body;
    const { ctx } = this;
    // 根据id查询用户信息
    // ctx.body= newComment;
    let result = await this.ctx.service.database.addArticleCommentById(article_id, newComment);
    ctx.body = result;
  }
  /**
   * 获取哪个文章所有评论的列表，获取的列表按照时间降序排列
   * 传入的参数包括分页的index,每页的数量,新增了几个评论，导致获取评论时，index向后加多少
   */
  async getCommentList() {
    const { ctx } = this;
    const article_id = this.ctx.params.id;
    const pageIndex = Number.parseInt(this.ctx.query.pageIndex);
    const perPageNum = Number.parseInt(this.ctx.query.perPageNum);
    const flag = Number.parseInt(this.ctx.query.flag);
    // 根据id查询用户信息
    let commentlist = await this.ctx.service.database.getArticleCommentListById(article_id, pageIndex, perPageNum, flag);
    ctx.body = commentlist;
  }
  /**
   * 获取哪个文章所有评论的总数
   */
  async getCommentCount() {
    const { ctx } = this;
    const article_id = this.ctx.params.id;
    let num = await this.ctx.service.database.getArticleCommentCountById(article_id);
    ctx.body = num;
  }

  async getLatestComt() {
    const { ctx } = this;
    const perNum = this.ctx.query.perNum;
    let latestComtList = await this.ctx.service.database.getLatestComt(perNum);
    ctx.body = latestComtList;
  }

  /**
   * 哪个文章的哪条评论 将赞数更改为什么
   */
  async updateZan() {
    const { ctx } = this;
    const articleId = this.ctx.params.articleId;
    const commentId = this.ctx.query.commentId;
    const zan = this.ctx.request.body.comment_zan;
    const zanlist = this.ctx.service.database.updateZan(articleId, commentId, zan);
    ctx.body = zanlist;
  }
  /**
   * 哪个文章的哪条评论 将不赞数更改为什么
   */
  async updateNotZan() {
    const { ctx } = this;
    const articleId = this.ctx.params.articleId;
    const commentId = this.ctx.query.commentId;
    const notzan = this.ctx.request.body.comment_notzan;
    const notzanlist = this.ctx.service.database.updateNotZan(articleId, commentId, notzan);
    ctx.body = notzanlist;
  }
}

module.exports = CommentController;
