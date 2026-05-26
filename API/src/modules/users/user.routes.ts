import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = Router();
const controller = new UserController();

router.get('/', authenticate, controller.list);
router.get('/:id', authenticate, controller.getOne);
router.post('/', controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

export const userRouter = router;
