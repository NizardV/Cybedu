import { Router } from 'express';
import { UserAnswerController } from './userAnswer.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = Router();
const controller = new UserAnswerController();

router.get('/', authenticate, controller.list);
router.get('/attempt/:userQuizId', authenticate, controller.listByAttempt);
router.get('/:id', authenticate, controller.getOne);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

export const userAnswerRouter = router;
