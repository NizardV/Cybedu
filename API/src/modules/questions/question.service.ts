import type { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { Question } from './question.entity.js';
import { Quiz } from '../quiz/quiz.entity.js';

type AnswerInput = {
  text: string;
  isCorrect?: boolean;
};

export type CreateQuestionDto = {
  text: string;
  quizId: number;
  answers?: AnswerInput[];
};

export type UpdateQuestionDto = Partial<CreateQuestionDto>;

export class QuestionService {
  private get repository(): Repository<Question> {
    return AppDataSource.getRepository(Question);
  }

  private get defaultRelations() {
    return {
      quiz: true,
      answers: true
    } as const;
  }

  public findAll() {
    return this.repository.find({
      relations: this.defaultRelations
    });
  }

  public findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: this.defaultRelations
    });
  }

  public async findByQuiz(quizId: number) {
    return this.repository.find({
      where: { quiz: { id: quizId } },
      relations: this.defaultRelations
    });
  }

  public async create(payload: CreateQuestionDto) {
    const question = this.repository.create({
      text: payload.text,
      quiz: { id: payload.quizId } as Quiz,
      answers: payload.answers?.map((answer) => ({
        text: answer.text,
        isCorrect: answer.isCorrect ?? false
      }))
    });

    return this.repository.save(question);
  }

  public async update(id: number, payload: UpdateQuestionDto) {
    const question = await this.repository.findOneByOrFail({ id });

    if (payload.text) {
      question.text = payload.text;
    }

    if (payload.quizId) {
      question.quiz = { id: payload.quizId } as Quiz;
    }

    if (payload.answers) {
      question.answers = payload.answers.map((answer) => ({
        text: answer.text,
        isCorrect: answer.isCorrect ?? false
      }));
    }

    return this.repository.save(question);
  }

  public async remove(id: number) {
    const question = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(question);
  }
}
