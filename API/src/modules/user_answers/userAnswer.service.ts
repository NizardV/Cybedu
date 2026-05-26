import type { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { UserAnswer } from './userAnswser.entity.js';
import { User } from '../users/user.entity.js';
import { UserQuiz } from '../user_quiz/userQuiz.entity.js';
import { Question } from '../questions/question.entity.js';
import { Answer } from '../answers/answer.entity.js';

export type CreateUserAnswerDto = {
  userId: number;
  userQuizId: number;
  questionId: number;
  answerId: number;
};

export type UpdateUserAnswerDto = Partial<CreateUserAnswerDto>;

export class UserAnswerService {
  private get repository(): Repository<UserAnswer> {
    return AppDataSource.getRepository(UserAnswer);
  }

  private get defaultRelations() {
    return {
      user: true,
      userQuiz: true,
      question: true,
      answer: true
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

  public findByUserQuiz(userQuizId: number) {
    return this.repository.find({
      where: { userQuiz: { id: userQuizId } },
      relations: this.defaultRelations
    });
  }

  public async create(payload: CreateUserAnswerDto) {
    const userAnswer = this.repository.create({
      user: { id: payload.userId } as User,
      userQuiz: { id: payload.userQuizId } as UserQuiz,
      question: { id: payload.questionId } as Question,
      answer: { id: payload.answerId } as Answer
    });

    return this.repository.save(userAnswer);
  }

  public async update(id: number, payload: UpdateUserAnswerDto) {
    const userAnswer = await this.repository.findOneByOrFail({ id });

    if (payload.userId !== undefined) {
      userAnswer.user = { id: payload.userId } as User;
    }

    if (payload.userQuizId !== undefined) {
      userAnswer.userQuiz = { id: payload.userQuizId } as UserQuiz;
    }

    if (payload.questionId !== undefined) {
      userAnswer.question = { id: payload.questionId } as Question;
    }

    if (payload.answerId !== undefined) {
      userAnswer.answer = { id: payload.answerId } as Answer;
    }

    return this.repository.save(userAnswer);
  }

  public async remove(id: number) {
    const userAnswer = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(userAnswer);
  }
}
