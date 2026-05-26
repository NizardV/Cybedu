import { ArticleService } from './article.service.js';
const toNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};
export class ArticleController {
    articleService;
    constructor(articleService = new ArticleService()) {
        this.articleService = articleService;
    }
    list = async (_req, res, next) => {
        try {
            const articles = await this.articleService.findAll();
            res.json(articles);
        }
        catch (error) {
            next(error);
        }
    };
    getOne = async (req, res, next) => {
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
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        try {
            const { title, content } = req.body;
            if (!title || !content) {
                res.status(400).json({ message: 'Le titre et le contenu sont requis pour créer un article.' });
                return;
            }
            const created = await this.articleService.create({ title, content });
            res.status(201).json(created);
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid article id' });
                return;
            }
            const { title, content } = req.body;
            if (title === undefined && content === undefined) {
                res.status(400).json({ message: 'Nothing to update' });
                return;
            }
            const updated = await this.articleService.update(id, { title, content });
            res.json(updated);
        }
        catch (error) {
            next(error);
        }
    };
    remove = async (req, res, next) => {
        try {
            const id = toNumber(req.params.id);
            if (id === undefined) {
                res.status(400).json({ message: 'Invalid article id' });
                return;
            }
            await this.articleService.remove(id);
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    };
}
