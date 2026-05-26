const express = require('express');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const quizRoutes = require('./routes/quizzes');
const quizStaticRoutes = require('./routes/quiz');
const downloadRoutes = require('./routes/download');
const leaderboardRoutes = require('./routes/leaderboard');
const requestLogger = require('./middleware/requestLogger');
const openApiSpec = require('./docs/openapi.json');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.set('trust proxy', true);
app.use(requestLogger);

app.get('/', (req, res) => {
  console.log(req.headers)
  res.json({ message: 'Quiz API ready' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get('/docs.json', (req, res) => {
  res.json(openApiSpec);
});

app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/dl', downloadRoutes);
app.use('/quiz', quizStaticRoutes);
app.use('/quizzes', quizRoutes);
app.use('/leaderboard', leaderboardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use((error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error' });
});
// , '0.0.0.0'
app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Quiz API listening on port ${PORT}`);
});
