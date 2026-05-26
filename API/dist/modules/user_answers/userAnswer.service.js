import { AppDataSource } from '../../database/data-source.js';
import { UserAnswer } from './userAnswser.entity.js';
export class UserAnswerService {
    get repository() {
        return AppDataSource.getRepository(UserAnswer);
    }
    get defaultRelations() {
        return {
            user: true,
            userQuiz: true,
            question: true,
            answer: true
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
    findByUserQuiz(userQuizId) {
        return this.repository.find({
            where: { userQuiz: { id: userQuizId } },
            relations: this.defaultRelations
        });
    }
    async create(payload) {
        const userAnswer = this.repository.create({
            user: { id: payload.userId },
            userQuiz: { id: payload.userQuizId },
            question: { id: payload.questionId },
            answer: { id: payload.answerId }
        });
        return this.repository.save(userAnswer);
    }
    async update(id, payload) {
        const userAnswer = await this.repository.findOneByOrFail({ id });
        if (payload.userId !== undefined) {
            userAnswer.user = { id: payload.userId };
        }
        if (payload.userQuizId !== undefined) {
            userAnswer.userQuiz = { id: payload.userQuizId };
        }
        if (payload.questionId !== undefined) {
            userAnswer.question = { id: payload.questionId };
        }
        if (payload.answerId !== undefined) {
            userAnswer.answer = { id: payload.answerId };
        }
        return this.repository.save(userAnswer);
    }
    async remove(id) {
        const userAnswer = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(userAnswer);
    }
}
