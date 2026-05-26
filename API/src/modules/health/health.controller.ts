import type { Request, Response } from 'express';

export class HealthController {
  public status = (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  };
}
