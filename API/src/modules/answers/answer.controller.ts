import type { NextFunction, Request, Response } from 'express';
import { AnswerService } from './answer.service.js';

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export class AnswerController {
  constructor(private readonly answerService = new AnswerService()) {}

  public list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const answers = await this.answerService.findAll();
      res.json(answers);
    } catch (error) {
      next(error);
    }
  };

  public listByQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const questionId = toNumber(req.params.questionId);
      if (questionId === undefined) {
        res.status(400).json({ message: 'Invalid question id' });
        return;
      }

      const answers = await this.answerService.findByQuestion(questionId);
      res.json(answers);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid answer id' });
        return;
      }

      const answer = await this.answerService.findById(id);
      if (!answer) {
        res.status(404).json({ message: 'Answer not found' });
        return;
      }

      res.json(answer);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text, isCorrect, questionId } = req.body as {
        text?: string;
        isCorrect?: boolean;
        questionId?: unknown;
      };

      if (!text) {
        res.status(400).json({ message: 'Answer text is required' });
        return;
      }

      const parsedQuestionId = toNumber(questionId);
      if (parsedQuestionId === undefined) {
        res.status(400).json({ message: 'questionId must be a number' });
        return;
      }

      const answer = await this.answerService.create({
        text,
        isCorrect,
        questionId: parsedQuestionId
      });

      res.status(201).json(answer);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid answer id' });
        return;
      }

      const { text, isCorrect, questionId } = req.body as {
        text?: string;
        isCorrect?: boolean;
        questionId?: unknown;
      };

      const parsedQuestionId = questionId !== undefined ? toNumber(questionId) : undefined;
      if (questionId !== undefined && parsedQuestionId === undefined) {
        res.status(400).json({ message: 'questionId must be a number' });
        return;
      }

      const updated = await this.answerService.update(id, {
        text,
        isCorrect,
        questionId: parsedQuestionId
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
        res.status(400).json({ message: 'Invalid answer id' });
        return;
      }

      await this.answerService.remove(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
