import type { NextFunction, Request, Response } from 'express';
import { QuestionService } from './question.service.js';

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

type IncomingAnswer = {
  text?: string;
  isCorrect?: boolean;
};

export class QuestionController {
  constructor(private readonly questionService = new QuestionService()) {}

  public list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const questions = await this.questionService.findAll();
      res.json(questions);
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

      const questions = await this.questionService.findByQuiz(quizId);
      res.json(questions);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid question id' });
        return;
      }

      const question = await this.questionService.findById(id);
      if (!question) {
        res.status(404).json({ message: 'Question not found' });
        return;
      }

      res.json(question);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text, quizId, answers } = req.body as {
        text?: string;
        quizId?: unknown;
        answers?: IncomingAnswer[];
      };

      if (!text) {
        res.status(400).json({ message: 'Question text is required' });
        return;
      }

      const parsedQuizId = toNumber(quizId);
      if (parsedQuizId === undefined) {
        res.status(400).json({ message: 'quizId must be a number' });
        return;
      }

      const normalizedAnswers = answers?.map((answer, index) => {
        if (!answer?.text) {
          throw new Error(`Answer #${index + 1} is missing text`);
        }

        return {
          text: answer.text,
          isCorrect: Boolean(answer.isCorrect)
        };
      });

      const question = await this.questionService.create({
        text,
        quizId: parsedQuizId,
        answers: normalizedAnswers
      });

      res.status(201).json(question);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Answer')) {
        res.status(400).json({ message: error.message });
        return;
      }

      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid question id' });
        return;
      }

      const { text, quizId, answers } = req.body as {
        text?: string;
        quizId?: unknown;
        answers?: IncomingAnswer[];
      };

      const parsedQuizId = quizId !== undefined ? toNumber(quizId) : undefined;
      if (quizId !== undefined && parsedQuizId === undefined) {
        res.status(400).json({ message: 'quizId must be a number' });
        return;
      }

      const normalizedAnswers = answers?.map((answer, index) => {
        if (!answer?.text) {
          throw new Error(`Answer #${index + 1} is missing text`);
        }

        return {
          text: answer.text,
          isCorrect: Boolean(answer.isCorrect)
        };
      });

      const updated = await this.questionService.update(id, {
        text,
        quizId: parsedQuizId,
        answers: normalizedAnswers
      });

      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Answer')) {
        res.status(400).json({ message: error.message });
        return;
      }

      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid question id' });
        return;
      }

      await this.questionService.remove(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
