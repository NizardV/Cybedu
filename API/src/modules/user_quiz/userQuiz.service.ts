import type { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { UserQuiz } from './userQuiz.entity.js';
import { User } from '../users/user.entity.js';
import { Quiz } from '../quiz/quiz.entity.js';

export type CreateUserQuizDto = {
  userId: number;
  quizId: number;
  score?: number;
  completedAt?: Date;
};

export type UpdateUserQuizDto = Partial<CreateUserQuizDto>;

export class UserQuizService {
  private get repository(): Repository<UserQuiz> {
    return AppDataSource.getRepository(UserQuiz);
  }

  private get defaultRelations() {
    return {
      user: true,
      quiz: true,
      userAnswers: {
        question: true,
        answer: true
      }
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

  public findByUser(userId: number) {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: this.defaultRelations
    });
  }

  public findByQuiz(quizId: number) {
    return this.repository.find({
      where: { quiz: { id: quizId } },
      relations: this.defaultRelations
    });
  }

  public async create(payload: CreateUserQuizDto) {
    const userQuiz = this.repository.create({
      user: { id: payload.userId } as User,
      quiz: { id: payload.quizId } as Quiz,
      score: payload.score,
      completedAt: payload.completedAt
    });

    return this.repository.save(userQuiz);
  }

  public async update(id: number, payload: UpdateUserQuizDto) {
    const userQuiz = await this.repository.findOneByOrFail({ id });

    if (payload.userId !== undefined) {
      userQuiz.user = { id: payload.userId } as User;
    }

    if (payload.quizId !== undefined) {
      userQuiz.quiz = { id: payload.quizId } as Quiz;
    }

    if (payload.score !== undefined) {
      userQuiz.score = payload.score;
    }

    if (payload.completedAt !== undefined) {
      userQuiz.completedAt = payload.completedAt;
    }

    return this.repository.save(userQuiz);
  }

  public async remove(id: number) {
    const userQuiz = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(userQuiz);
  }
}
