'use strict';
const Service = require('egg').Service;

class ArticleService extends Service {
  async getArticleById(id) {
    // 根据id查询用户信息
    let sql = "select * from article AS ta1 LEFT JOIN biaoqing ta2 ON ta1.id=ta2.id where ta1.id=" + id;
    // return await this.app.mysql.get('article', { id: id });
    const resArr = await this.app.mysql.query(sql);
    // 这里没有阻塞住，我看看原因
    for (let i = 0, len = resArr.length; i < len; i++) {
      const item = resArr[i];
      item.hot_num = item.love_num + item.happy_num + item.yun_num + item.sad_num + item.angry_num;
      item.comment_num = await this.getArticleCommentCountById(item.id); // 异步处理要用 asyn
    }
    // resArr.forEach(async item => {
    //   item.hot_num=item.love_num+item.happy_num+item.yun_num+item.sad_num+item.angry_num;
    //   item.comment_num = await this.getArticleCommentCountById(item.id); // 异步处理要用 async/await 变成同步调用
    // });

    // forEach 内部还有自己的函数实现，因此你在这里用 async/await 依旧不能将异步变成同步。改为for循环就好
    //不是吧 我记得在哪里看到过 是因为forEach是一步的
    // 不是，你在 foreach 中使用 async/await 并不是在 getArticleById 同一级调用，所以你阻塞不住。类似于
    return resArr;
  }
  async getBiaoQingByArticleId(id) {
    // 根据id查询用户信息
    return await this.app.mysql.get('biaoqing', { id: id });
  }
  async getAllArticle(pageIndex, perPageNum, ) {
    const index = perPageNum * pageIndex;
    let sql = "select * from article AS ta1 LEFT JOIN biaoqing ta2 ON ta1.id=ta2.id order by ta2.love_num desc" + " limit " + index + " , " + perPageNum;
    const resArr = await this.app.mysql.query(sql);
    /*for (let i = 0, len = resArr.length; i < len; i++) {
      const item = resArr[i];
      item.hot_num=item.love_num+item.happy_num+item.yun_num+item.sad_num+item.angry_num;
      item.comment_num = await this.getArticleCommentCountById(item.id); // 异步处理要用 asyn
    }
    */
   var self = this;
    const res = resArr.map((item) => {
      return new Promise(async (resolve, reject) => {
        item.hot_num = item.love_num + item.happy_num + item.yun_num + item.sad_num + item.angry_num;
        item.comment_num = await self.getArticleCommentCountById(item.id); // 异步处理要用 asyn
        //console.log(item);
        resolve(item);
      })
    })
    const returnRes = await Promise.all(res);
    //console.log(returnRes)
    return returnRes;
  }
  async getArticleByCategory(categoryName, pageIndex, perPageNum) {
    let index = perPageNum * pageIndex;
    categoryName = categoryName + "";
    // let sql = "select ta1.*,ta2.* from article AS ta1 LEFT JOIN biaoqing ta2 ON ta1.id=ta2.id (where ta1.category="+categoryName +")";
    // let sql = 'select * from article where category = ? limit  ? , ?',[categoryName,index,perPageNum];
    // ('update comment set comment_notzan = ? where articleid = ? and id = ?', [notzan, articleId, commentId]);

    const resArr = await this.app.mysql.query('select ta1.*,ta2.* from article AS ta1 LEFT JOIN biaoqing ta2 ON ta1.id=ta2.id where ta1.category = ? limit  ? , ?', [categoryName, index, perPageNum]);
    var self = this;
    //console.log(resArr);
    //console.log("-----------------------------------------------------------")
    const res = resArr.map((item) => {
      return new Promise(async (resolve, reject) => {
        item.hot_num = item.love_num + item.happy_num + item.yun_num + item.sad_num + item.angry_num;
        item.comment_num = await self.getArticleCommentCountById(item.id); // 异步处理要用 asyn
        //console.log(item);
        resolve(item);
      })
    })
    /*for (let i = 0, len = resArr.length; i < len; i++) {
      const item = resArr[i];
      item.hot_num=item.love_num+item.happy_num+item.yun_num+item.sad_num+item.angry_num;
      item.comment_num = await this.getArticleCommentCountById(item.id); // 异步处理要用 asyn
    }*/
    //console.log("------------------执行到这里了吗？-------------")
    //console.log(res);
    const returnRes = await Promise.all(res);
    //console.log(returnRes)
    return returnRes;
    /*.then(data=>{
      console.log("是否能执行到这里呢？？？？？？？？？？？？？？？？？？")
      return data;
    });*/

    //return resArr;
  }

  async getAllArticleAllParams(pageIndex, perPageNum) {
    const index = perPageNum * pageIndex;
    let sql = "select ta1.*,ta2.* from article AS ta1 LEFT JOIN biaoqing ta2 ON ta1.id=ta2.id " + " limit " + index + " , " + perPageNum;
    const resArr = await this.app.mysql.query(sql);
    for (let i = 0, len = resArr.length; i < len; i++) {
      const item = resArr[i];
      item.hot_num = item.love_num + item.happy_num + item.yun_num + item.sad_num + item.angry_num;
      item.comment_num = await this.getArticleCommentCountById(item.id); // 异步处理要用 asyn
    }
    /*resArr.forEach(async (item)=>{
      // console.log(item.id);
      item.hot_num=item.love_num+item.happy_num+item.yun_num+item.sad_num+item.angry_num;
      item.comment_num= await this.getArticleCommentCountById(item.id);
    })*/
    return resArr;
  }

  async getArticleCommentListById(articleid, pageIndex, perPageNum, flag) {
    const index = perPageNum * pageIndex + flag;
    var sql = "select * from comment  where articleid=" + articleid + " order by comment_time desc" + " limit " + index + " , " + perPageNum;
    return await this.app.mysql.query(sql);
  }

  async getArticleCommentCountById(articleid) {
    var sql = "select count(1) from comment  where articleid=" + articleid;
    // sql 查询出来的是对象，而不是数字
    const data = await this.app.mysql.query(sql);
    //console.log(articleid,222);
    //console.log(data);
    //console.log(data[0]['count(1)']);
    return data[0]['count(1)'] ? data[0]['count(1)'] : 0;
  }
  async getLatestComt(perNum) {
    var sql = "select comment_name,comment_time,comment_content,comment.id,title from comment,article where  comment.articleid = article.id order by comment_time desc" + " limit 0 , " + perNum;
    return await this.app.mysql.query(sql);
  }
  async addArticleCommentById(articleid, newComment) {
    // return newComment;
    return await this.app.mysql.insert('comment', {
      articleid: articleid,
      comment_name: newComment.comment_name,
      comment_content: newComment.comment_content,
      comment_zan: newComment.comment_zan,
      comment_notzan: newComment.comment_notzan,
      comment_time: newComment.comment_time,
      reply_name: newComment.reply_name
    })
  }
  async deleteComment(id) {
    const result = await this.app.mysql.delete('comment', { id: id });
    return result;
  }
  async updateZan(articleId, commentId, zan) {
    return await this.app.mysql.query('update comment set comment_zan = ? where articleid = ? and id = ?', [zan, articleId, commentId]);
  }
  async updateNotZan(articleId, commentId, notzan) {
    return await this.app.mysql.query('update comment set comment_notzan = ? where articleid = ? and id = ?', [notzan, articleId, commentId]);
  }

  async getCategoryList() {
    let sql = "select * from category";
    return await this.app.mysql.query(sql);
  }

  async addArticle(art_body) {
    const sql = "select count(1) from article  ";

    const data = await this.app.mysql.query(sql);
    const id = data[0]['count(1)'] + 1;

    const result = await this.app.mysql.insert('article', {
      id: id,
      category: art_body.art_category,
      title: art_body.art_title,
      author: art_body.art_author,
      zhaiyao: art_body.art_zhaiyao,
      content: art_body.art_content,
      time: art_body.art_time,
      img_src: art_body.art_img
    })
    this.addBiaoQing(id);
    return result;
    // select @@identity  
  }

  async addBiaoQing(id) {
    // return await this.app.mysql.query('update biaoqing set love_num = ?  where articleid = ? and id = ?', [zan, articleId, commentId]);
    return await this.app.mysql.insert('biaoqing', {
      id: id,
      love_num: 0,
      happy_num: 0,//需要修改的数据
      yun_num: 0,
      sad_num: 0,
      angry_num: 0
    });
  }
  async updateBiaoQing(id, biaoqing) {
    // return await this.app.mysql.query('update biaoqing set love_num = ?  where articleid = ? and id = ?', [zan, articleId, commentId]);

    return await this.app.mysql.update('biaoqing', {
      love_num: biaoqing.love_num,
      happy_num: biaoqing.happy_num,//需要修改的数据
      yun_num: biaoqing.yun_num,
      sad_num: biaoqing.sad_num,
      angry_num: biaoqing.angry_num
    }, {
        where: {
          id: id
        } //修改查询条件
      });
  }
  async updateArticle(id, article) {
    // return await this.app.mysql.query('update biaoqing set love_num = ?  where articleid = ? and id = ?', [zan, articleId, commentId]);

    return await this.app.mysql.update('article', {
      category: article.art_category,
      title: article.art_title,//需要修改的数据
      zhaiyao: article.art_zhaiyao,
      content: article.art_content,
      time: article.art_time
    }, {
        where: {
          id: id
        } //修改查询条件
      });
  }
  async getArticleCommentList(pageIndex, perPageNum, flag) {
    const index = perPageNum * pageIndex + flag;
    var sql = "select comment.*,title from comment,article where  comment.articleid = article.id order by comment_time desc" + " limit " + index + " , " + perPageNum;

    // var sql = "select * from comment  "  + " order by comment_time desc" + " limit " + index + " , " + perPageNum;
    return await this.app.mysql.query(sql);
  }
  async getArticleCommentCount() {
    var sql = "select count(1) from comment  ";
    return await this.app.mysql.query(sql);
  }
  async getArticleCount() {
    var sql = "select count(1) from article";
    return await this.app.mysql.query(sql);
  }

  async getArticleCountByCategory(category) {
    // var sql = "select count(1) from article where catrgory="+category;
    const data = await this.app.mysql.query("select count(1) from article where category= ?", [category]);
    return data[0]['count(1)'] ? data[0]['count(1)'] : 0;
  }
}
module.exports = ArticleService;