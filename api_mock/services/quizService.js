const path = require('path');
const { readJson } = require('./jsonDb');

const QUIZZES_FILE = path.join(__dirname, '..', '..', 'db', 'quiz.json');

async function getQuizzes() {
  return readJson(QUIZZES_FILE, []);
}

async function getQuizById(id) {
  const quizzes = await getQuizzes();
  return quizzes.find((quiz) => quiz.id === id);
}

module.exports = {
  getQuizzes,
  getQuizById
};
