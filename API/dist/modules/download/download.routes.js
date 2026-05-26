import { Router } from 'express';
import { DownloadController } from './download.controller.js';
const router = Router();
const controller = new DownloadController();
router.get('/text', controller.getTextFile);
export const downloadRouter = router;
