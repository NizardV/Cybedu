const express = require('express');
const authenticate = require('../middleware/authenticate');
const { getArticles, getArticleById } = require('../services/articleService');
const { getQuizzes, getQuizById, sanitizeQuiz, evaluateQuiz } = require('../services/quizService');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [quizzes, articles] = await Promise.all([getQuizzes(), getArticles()]);
    const articleMap = new Map(articles.map((article) => [article.id, article]));

    const payload = quizzes.map((quiz) => {
      const sanitized = sanitizeQuiz(quiz);
      const article = articleMap.get(quiz.articleId);
      return {
        ...sanitized,
        article: article
          ? {
              id: article.id,
              title: article.title,
              description: article.description,
            }
          : null,
      };
    });
    console.log("Endpoint quizzes's call")

    return res.json(payload);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const quizId = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(quizId)) {
      return res.status(400).json({ message: 'Quiz id must be a number' });
    }

    const quiz = await getQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const sanitized = sanitizeQuiz(quiz);
    const article = quiz.articleId ? await getArticleById(quiz.articleId) : null;

    return res.json({
      ...sanitized,
      article,
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/:id/submit', authenticate, async (req, res, next) => {
  try {
    const quizId = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(quizId)) {
      return res.status(400).json({ message: 'Quiz id must be a number' });
    }

    const quiz = await getQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers } = req.body || {};
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers must be provided as an object keyed by question id' });
    }

    const evaluation = evaluateQuiz(quiz, answers);
    const article = quiz.articleId ? await getArticleById(quiz.articleId) : null;

    return res.json({
      ...evaluation,
      article,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
