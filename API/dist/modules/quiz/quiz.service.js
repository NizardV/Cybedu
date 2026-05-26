import { AppDataSource } from '../../database/data-source.js';
import { Quiz } from './quiz.entity.js';
export class QuizService {
    get repository() {
        return AppDataSource.getRepository(Quiz);
    }
    get defaultRelations() {
        return {
            article: true,
            questions: {
                answers: true
            }
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
    async create(payload) {
        const quiz = this.repository.create({
            title: payload.title,
            article: { id: payload.articleId },
            questions: payload.questions?.map((question) => ({
                text: question.text,
                answers: question.answers?.map((answer) => ({
                    text: answer.text,
                    isCorrect: answer.isCorrect ?? false
                }))
            }))
        });
        return this.repository.save(quiz);
    }
    async update(id, payload) {
        const quiz = await this.repository.findOneByOrFail({ id });
        if (payload.title) {
            quiz.title = payload.title;
        }
        if (payload.articleId) {
            quiz.article = { id: payload.articleId };
        }
        if (payload.questions) {
            quiz.questions = payload.questions.map((question) => ({
                text: question.text,
                answers: question.answers?.map((answer) => ({
                    text: answer.text,
                    isCorrect: answer.isCorrect ?? false
                }))
            }));
        }
        return this.repository.save(quiz);
    }
    async remove(id) {
        const quiz = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(quiz);
    }
}
