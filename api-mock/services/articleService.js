const path = require('path');
const { readJson } = require('./jsonDb');

const ARTICLES_FILE = path.join(__dirname, '..', 'db', 'articles.json');

async function getArticles() {
  return readJson(ARTICLES_FILE, []);
}

async function getArticleById(id) {
  const articles = await getArticles();
  return articles.find((article) => article.id === id);
}

module.exports = {
  getArticles,
  getArticleById,
};
