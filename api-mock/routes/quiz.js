const express = require('express');
const path = require('path');
const { readJson } = require('../services/jsonDb');

const router = express.Router();
const QUIZ_FILE = path.join(__dirname, '..', 'db', 'quiz.json');

router.get('/', async (req, res, next) => {
  try {
    const quizzes = await readJson(QUIZ_FILE, []);
    return res.json(quizzes);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const quizId = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(quizId)) {
      return res.status(400).json({ message: 'Quiz id must be a number' });
    }

    const quizzes = await readJson(QUIZ_FILE, []);
    const quiz = quizzes.find((item) => item.id === quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    return res.json(quiz);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
