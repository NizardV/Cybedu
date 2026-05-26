import type { NextFunction, Request, Response } from 'express';
import { UserQuizService } from './userQuiz.service.js';

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const toDate = (value: unknown) => {
  if (value === null || value === undefined) {
    return undefined;
  }

  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export class UserQuizController {
  constructor(private readonly userQuizService = new UserQuizService()) {}

  public list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const attempts = await this.userQuizService.findAll();
      res.json(attempts);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid attempt id' });
        return;
      }

      const attempt = await this.userQuizService.findById(id);
      if (!attempt) {
        res.status(404).json({ message: 'Attempt not found' });
        return;
      }

      res.json(attempt);
    } catch (error) {
      next(error);
    }
  };

  public listByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = toNumber(req.params.userId);
      if (userId === undefined) {
        res.status(400).json({ message: 'Invalid user id' });
        return;
      }

      const attempts = await this.userQuizService.findByUser(userId);
      res.json(attempts);
    } catch (error) {
      next(error);
    }
  };

  public listByQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const quizId = toNumber(req.params.quizId);
      if (quizId === undefined) {
        res.status(400).json({ message: 'Invalid quiz id' });
        return;
      }

      const attempts = await this.userQuizService.findByQuiz(quizId);
      res.json(attempts);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, quizId, score, completedAt } = req.body as {
        userId?: unknown;
        quizId?: unknown;
        score?: unknown;
        completedAt?: unknown;
      };

      const parsedUserId = toNumber(userId);
      const parsedQuizId = toNumber(quizId);

      if (parsedUserId === undefined || parsedQuizId === undefined) {
        res.status(400).json({ message: 'userId and quizId must be numbers' });
        return;
      }

      const parsedScore = score !== undefined ? toNumber(score) : undefined;
      if (score !== undefined && parsedScore === undefined) {
        res.status(400).json({ message: 'score must be a number' });
        return;
      }

      const parsedCompletedAt = toDate(completedAt);
      if (completedAt !== undefined && parsedCompletedAt === undefined) {
        res.status(400).json({ message: 'completedAt must be a valid date' });
        return;
      }

      const attempt = await this.userQuizService.create({
        userId: parsedUserId,
        quizId: parsedQuizId,
        score: parsedScore,
        completedAt: parsedCompletedAt
      });

      res.status(201).json(attempt);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid attempt id' });
        return;
      }

      const { userId, quizId, score, completedAt } = req.body as {
        userId?: unknown;
        quizId?: unknown;
        score?: unknown;
        completedAt?: unknown;
      };

      const parsedUserId = userId !== undefined ? toNumber(userId) : undefined;
      if (userId !== undefined && parsedUserId === undefined) {
        res.status(400).json({ message: 'userId must be a number' });
        return;
      }

      const parsedQuizId = quizId !== undefined ? toNumber(quizId) : undefined;
      if (quizId !== undefined && parsedQuizId === undefined) {
        res.status(400).json({ message: 'quizId must be a number' });
        return;
      }

      const parsedScore = score !== undefined ? toNumber(score) : undefined;
      if (score !== undefined && parsedScore === undefined) {
        res.status(400).json({ message: 'score must be a number' });
        return;
      }

      const parsedCompletedAt = completedAt !== undefined ? toDate(completedAt) : undefined;
      if (completedAt !== undefined && parsedCompletedAt === undefined) {
        res.status(400).json({ message: 'completedAt must be a valid date' });
        return;
      }

      const updated = await this.userQuizService.update(id, {
        userId: parsedUserId,
        quizId: parsedQuizId,
        score: parsedScore,
        completedAt: parsedCompletedAt
      });

      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid attempt id' });
        return;
      }

      await this.userQuizService.remove(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
