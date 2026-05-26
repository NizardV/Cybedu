import type { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { Answer } from './answer.entity.js';
import { Question } from '../questions/question.entity.js';

export type CreateAnswerDto = {
  text: string;
  isCorrect?: boolean;
  questionId: number;
};

export type UpdateAnswerDto = Partial<CreateAnswerDto>;

export class AnswerService {
  private get repository(): Repository<Answer> {
    return AppDataSource.getRepository(Answer);
  }

  private get defaultRelations() {
    return {
      question: true
    } as const;
  }

  public findAll() {
    return this.repository.find({ relations: this.defaultRelations });
  }

  public findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: this.defaultRelations
    });
  }

  public findByQuestion(questionId: number) {
    return this.repository.find({
      where: { question: { id: questionId } },
      relations: this.defaultRelations
    });
  }

  public async create(payload: CreateAnswerDto) {
    const answer = this.repository.create({
      text: payload.text,
      isCorrect: payload.isCorrect ?? false,
      question: { id: payload.questionId } as Question
    });

    return this.repository.save(answer);
  }

  public async update(id: number, payload: UpdateAnswerDto) {
    const answer = await this.repository.findOneByOrFail({ id });

    if (payload.text !== undefined) {
      answer.text = payload.text;
    }

    if (payload.isCorrect !== undefined) {
      answer.isCorrect = payload.isCorrect;
    }

    if (payload.questionId !== undefined) {
      answer.question = { id: payload.questionId } as Question;
    }

    return this.repository.save(answer);
  }

  public async remove(id: number) {
    const answer = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(answer);
  }
}
