import type { NextFunction, Request, Response } from 'express';
import { DownloadService } from './download.service.js';

export class DownloadController {
  constructor(private readonly downloadService = new DownloadService()) {}

  public getTextFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileName = (req.query.file as string) ?? 'sample.txt';
      await this.downloadService.download(res, fileName);
    } catch (error) {
      next(error);
    }
  };
}
