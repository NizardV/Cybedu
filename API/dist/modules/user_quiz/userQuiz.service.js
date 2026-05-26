import { AppDataSource } from '../../database/data-source.js';
import { UserQuiz } from './userQuiz.entity.js';
export class UserQuizService {
    get repository() {
        return AppDataSource.getRepository(UserQuiz);
    }
    get defaultRelations() {
        return {
            user: true,
            quiz: true,
            userAnswers: {
                question: true,
                answer: true
            }
        };
    }
    findAll() {
        return this.repository.find({ relations: this.defaultRelations });
    }
    findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: this.defaultRelations
        });
    }
    findByUser(userId) {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: this.defaultRelations
        });
    }
    findByQuiz(quizId) {
        return this.repository.find({
            where: { quiz: { id: quizId } },
            relations: this.defaultRelations
        });
    }
    async create(payload) {
        const userQuiz = this.repository.create({
            user: { id: payload.userId },
            quiz: { id: payload.quizId },
            score: payload.score,
            completedAt: payload.completedAt
        });
        return this.repository.save(userQuiz);
    }
    async update(id, payload) {
        const userQuiz = await this.repository.findOneByOrFail({ id });
        if (payload.userId !== undefined) {
            userQuiz.user = { id: payload.userId };
        }
        if (payload.quizId !== undefined) {
            userQuiz.quiz = { id: payload.quizId };
        }
        if (payload.score !== undefined) {
            userQuiz.score = payload.score;
        }
        if (payload.completedAt !== undefined) {
            userQuiz.completedAt = payload.completedAt;
        }
        return this.repository.save(userQuiz);
    }
    async remove(id) {
        const userQuiz = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(userQuiz);
    }
}
