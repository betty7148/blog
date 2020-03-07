'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/helloworld',controller.home.helloworld);
  //文章
  router.get("/home/article",controller.home.getHomeArticle);
  router.get("/home/article/:id",controller.article.getArticleById);
  router.post("/back/article/postArticle",controller.article.postArticle);
  router.get("/home/article/category/:categoryName",controller.article.getArticleByCategory);
  router.get("/back/article",controller.article.getAllArticle);
  router.post("/back/article/editArticle/:id",controller.article.editArticle);
  router.get("/home/article/getArticleCount/:categoryName",controller.article.getArticleCount);
  router.get("/user/article/acount/getAllArticleCount",controller.article.getAllArticleCount);
 
  

  //文章中---表情的增加与获取
  router.get("/home/article/getBiaoQing/:articleid",controller.article.getBiaoQingByArticleId);
  router.post("/home/article/postBiaoQing/:id",controller.article.postBiaoQing);
  
  //评论
  router.post("/home/comment/postComment/:id",controller.comment.addComment);
  router.get("/home/comment/getCommentList/:id",controller.comment.getCommentList);
  router.get("/home/comment/getCommentCount/:id",controller.comment.getCommentCount);
  router.get("/home/getLatestComt",controller.comment.getLatestComt);
  router.get("/back/comment/getCommentList",controller.backcomment.getCommentList);
  router.get("/back/comment/getCommentCount",controller.backcomment.getCommentCount);
  router.delete("/admin/comment/deleteComment/:id",controller.backcomment.deleteComment);
  //评论中---zan notzan
  router.post("/home/comment/postZan/:articleId",controller.comment.updateZan);
  router.post("/home/comment/postNotZan/:articleId",controller.comment.updateNotZan);

  //category
  router.get("/home/getCategoryList",controller.category.getCategoryList);

  //文章中---图片上传与删除
  router.post("/home/article/uploadImg",controller.article.uploadImg);
  router.get("/home/article/removeImg",controller.article.removeImg);
  
};
