import type { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { Quiz } from './quiz.entity.js';
import { Article } from '../articles/article.entity.js';

type AnswerInput = {
  text: string;
  isCorrect?: boolean;
};

type QuestionInput = {
  text: string;
  answers?: AnswerInput[];
};

export type CreateQuizDto = {
  title: string;
  articleId: number;
  questions?: QuestionInput[];
};

export type UpdateQuizDto = Partial<CreateQuizDto>;

export class QuizService {
  private get repository(): Repository<Quiz> {
    return AppDataSource.getRepository(Quiz);
  }

  private get defaultRelations() {
    return {
      article: true,
      questions: {
        answers: true
      }
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

  public async create(payload: CreateQuizDto) {
    const quiz = this.repository.create({
      title: payload.title,
      article: { id: payload.articleId } as Article,
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

  public async update(id: number, payload: UpdateQuizDto) {
    const quiz = await this.repository.findOneByOrFail({ id });

    if (payload.title) {
      quiz.title = payload.title;
    }

    if (payload.articleId) {
      quiz.article = { id: payload.articleId } as Article;
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

  public async remove(id: number) {
    const quiz = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(quiz);
  }
}
