const express = require('express');
const { getArticles, getArticleById } = require('../services/articleService');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const articles = await getArticles();
    console.info("Endpoint Articles call")
    return res.json(articles);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const articleId = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(articleId)) {
      return res.status(400).json({ message: 'Article id must be a number' });
    }
    const article = await getArticleById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.json(article);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
