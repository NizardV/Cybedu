import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
const router = Router();
const controller = new AuthController();
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', authenticate, controller.logout);
export const authRouter = router;
