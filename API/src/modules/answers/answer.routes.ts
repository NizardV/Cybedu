import { Router } from 'express';
import { AnswerController } from './answer.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = Router();
const controller = new AnswerController();

router.get('/', controller.list);
router.get('/question/:questionId', controller.listByQuestion);
router.get('/:id', controller.getOne);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

export const answerRouter = router;
