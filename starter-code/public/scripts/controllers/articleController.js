'use strict';
var app = app || {};

(function(module) {
  const articleController = {};

  // COMMENT: What is this function doing? Where is it called?
  // Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (put your response in a comment here)
  // articleView.index() takes context as a parameter and gives articles to articleView.index
  // for rendering to the DOM. It is called by page() in routes.js and it calls articleView.index()
  // est 5min act 10min
  articleController.index = (ctx) => app.articleView.index(ctx.articles);

  // REVIEW: Middleware for grabbing one article by ID:
  articleController.loadById = (ctx, next) => {
    let articleData = article => {
      ctx.articles = article;
      next();
    };

    // COMMENT: What is this function doing? Where is it called?
    // Does it call any other functions, and if so, in what file(s) do those function(s) live?
    // (put your response in a comment here)
    findWhere() runs a search query in the database by pulling the articles with matching values. It is called here and
    later on this page. It defined in article.js. It calls $.get().
    // est 5min act 5min
    app.Article.findWhere('article_id', ctx.params.article_id, articleData);
  };

  // REVIEW: Middleware for loading up articles by a certain author:
  articleController.loadByAuthor = (ctx, next) => {
    let authorData = articlesByAuthor => {
      ctx.articles = articlesByAuthor;
      next();
    };

    app.Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // REVIEW: Middleware for grabbing all articles with a certain category:
  articleController.loadByCategory = (ctx, next) => {
    let categoryData = articlesInCategory => {
      ctx.articles = articlesInCategory;
      next();
    };

    app.Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // REVIEW: Middleware for grabbing ALL articles:
  articleController.loadAll = (ctx, next) => {
    let articleData =  () => {
      ctx.articles = app.Article.all;
      next();
    };

    if (app.Article.all.length) {
      ctx.articles = app.Article.all;
      next();
    } else {
      app.Article.fetchAll(articleData);
    }
  };

  module.articleController = articleController;
})(app);
