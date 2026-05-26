import { Router } from 'express';
import { ArticleController } from './article.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = Router();
const controller = new ArticleController();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

export const articleRouter = router;
