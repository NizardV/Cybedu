import { DataSource } from 'typeorm';
import { env, isProduction } from '../config/env.js';
import { User } from '../modules/users/user.entity.js';
import { Role } from '../modules/roles/role.entity.js';
import { Article } from '../modules/articles/article.entity.js';
import { Quiz } from '../modules/quiz/quiz.entity.js';
import { Question } from '../modules/questions/question.entity.js';
import { Answer } from '../modules/answers/answer.entity.js';
import { UserQuiz } from '../modules/user_quiz/userQuiz.entity.js';
import { UserAnswer } from '../modules/user_answers/userAnswser.entity.js';
import { RevokedToken } from '../modules/auth/revoked-token.entity.js';
const migrations = isProduction ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'];
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    synchronize: !isProduction,
    logging: !isProduction,
    entities: [User, Role, Article, Quiz, Question, Answer, UserQuiz, UserAnswer, RevokedToken],
    migrations
});
