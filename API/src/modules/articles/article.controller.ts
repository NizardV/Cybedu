import type { NextFunction, Request, Response } from 'express';
import { ArticleService } from './article.service.js';

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export class ArticleController {
  constructor(private readonly articleService = new ArticleService()) {}

  public list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await this.articleService.findAll();
      res.json(articles);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid article id' });
        return;
      }

      const article = await this.articleService.findById(id);
      if (!article) {
        res.status(404).json({ message: 'Article not found' });
        return;
      }

      res.json(article);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Vérification "is-admin" : on suppose que l'utilisateur authentifié est attaché à req.user
      const user = (req as unknown as { user?: { isAdmin?: boolean } }).user;
      if (!user || !user.isAdmin) {
        res.status(403).json({ message: 'Accès refusé : privilèges administrateur requis.' });
        return;
      }

      const { title, content } = req.body as { title?: string; content?: string };
      if (!title || !content) {
        res.status(400).json({ message: 'Le titre et le contenu sont requis pour créer un article.' });
        return;
      }

      const created = await this.articleService.create({ title, content });
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid article id' });
        return;
      }

      const { title, content } = req.body as { title?: string; content?: string };
      if (title === undefined && content === undefined) {
        res.status(400).json({ message: 'Nothing to update' });
        return;
      }

      const updated = await this.articleService.update(id, { title, content });
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = toNumber(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid article id' });
        return;
      }

      await this.articleService.remove(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
