import type { NextFunction, Request, Response } from 'express';
import { QuizService } from './quiz.service.js';

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseId = (value: unknown) => toNumber(value);

type IncomingAnswer = {
  text?: string;
  isCorrect?: boolean;
};

type IncomingQuestion = {
  text?: string;
  answers?: IncomingAnswer[];
};

const normalizeQuestions = (questions?: IncomingQuestion[]) => {
  if (!questions) {
    return undefined;
  }

  return questions.map((question, index) => {
    if (!question?.text) {
      throw new Error(`Question #${index + 1} is missing text`);
    }

    return {
      text: question.text,
      answers: question.answers?.map((answer, answerIndex) => {
        if (!answer?.text) {
          throw new Error(`Answer #${answerIndex + 1} for question #${index + 1} is missing text`);
        }

        return {
          text: answer.text,
          isCorrect: Boolean(answer.isCorrect)
        };
      })
    };
  });
};

export class QuizController {
  constructor(private readonly quizService = new QuizService()) {}

  public list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const quizzes = await this.quizService.findAll();
      res.json(quizzes);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid quiz id' });
        return;
      }

      const quiz = await this.quizService.findById(id);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }

      res.json(quiz);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, articleId, questions } = req.body as {
        title?: string;
        articleId?: unknown;
        questions?: IncomingQuestion[];
      };

      if (!title) {
        res.status(400).json({ message: 'Quiz title is required' });
        return;
      }

      const parsedArticleId = parseId(articleId);
      if (parsedArticleId === undefined) {
        res.status(400).json({ message: 'articleId must be a number' });
        return;
      }

      const normalizedQuestions = normalizeQuestions(questions);

      const quiz = await this.quizService.create({
        title,
        articleId: parsedArticleId,
        questions: normalizedQuestions
      });

      res.status(201).json(quiz);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Question')) {
        res.status(400).json({ message: error.message });
        return;
      }

      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid quiz id' });
        return;
      }

      const { title, articleId, questions } = req.body as {
        title?: string;
        articleId?: unknown;
        questions?: IncomingQuestion[];
      };

      const parsedArticleId = articleId !== undefined ? parseId(articleId) : undefined;
      if (articleId !== undefined && parsedArticleId === undefined) {
        res.status(400).json({ message: 'articleId must be a number' });
        return;
      }

      const normalizedQuestions = normalizeQuestions(questions);

      const updated = await this.quizService.update(id, {
        title,
        articleId: parsedArticleId,
        questions: normalizedQuestions
      });

      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Question')) {
        res.status(400).json({ message: error.message });
        return;
      }

      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid quiz id' });
        return;
      }

      await this.quizService.remove(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
