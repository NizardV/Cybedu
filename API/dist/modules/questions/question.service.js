import { AppDataSource } from '../../database/data-source.js';
import { Question } from './question.entity.js';
export class QuestionService {
    get repository() {
        return AppDataSource.getRepository(Question);
    }
    get defaultRelations() {
        return {
            quiz: true,
            answers: true
        };
    }
    findAll() {
        return this.repository.find({
            relations: this.defaultRelations
        });
    }
    findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: this.defaultRelations
        });
    }
    async findByQuiz(quizId) {
        return this.repository.find({
            where: { quiz: { id: quizId } },
            relations: this.defaultRelations
        });
    }
    async create(payload) {
        const question = this.repository.create({
            text: payload.text,
            quiz: { id: payload.quizId },
            answers: payload.answers?.map((answer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect ?? false
            }))
        });
        return this.repository.save(question);
    }
    async update(id, payload) {
        const question = await this.repository.findOneByOrFail({ id });
        if (payload.text) {
            question.text = payload.text;
        }
        if (payload.quizId) {
            question.quiz = { id: payload.quizId };
        }
        if (payload.answers) {
            question.answers = payload.answers.map((answer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect ?? false
            }));
        }
        return this.repository.save(question);
    }
    async remove(id) {
        const question = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(question);
    }
}
