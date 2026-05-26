import type { NextFunction, Request, Response } from 'express';
import type { Role } from '../modules/roles/role.entity.js';

type RequestWithUser = Request & {
  user?: {
    roles?: Role[];
  };
};

export const isAdmin = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const roles = req.user?.roles ?? [];
  const hasAdminRole = roles.some((role) => role?.name === 'admin');

  if (!hasAdminRole) {
    res.status(403).json({ message: 'Access denied' });
    return;
  }

  next();
};
