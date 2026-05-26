import { AppDataSource } from '../../database/data-source.js';
import { Answer } from './answer.entity.js';
export class AnswerService {
    get repository() {
        return AppDataSource.getRepository(Answer);
    }
    get defaultRelations() {
        return {
            question: true
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
    findByQuestion(questionId) {
        return this.repository.find({
            where: { question: { id: questionId } },
            relations: this.defaultRelations
        });
    }
    async create(payload) {
        const answer = this.repository.create({
            text: payload.text,
            isCorrect: payload.isCorrect ?? false,
            question: { id: payload.questionId }
        });
        return this.repository.save(answer);
    }
    async update(id, payload) {
        const answer = await this.repository.findOneByOrFail({ id });
        if (payload.text !== undefined) {
            answer.text = payload.text;
        }
        if (payload.isCorrect !== undefined) {
            answer.isCorrect = payload.isCorrect;
        }
        if (payload.questionId !== undefined) {
            answer.question = { id: payload.questionId };
        }
        return this.repository.save(answer);
    }
    async remove(id) {
        const answer = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(answer);
    }
}
