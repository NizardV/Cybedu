import type { NextFunction, Request, Response } from 'express';
import { RoleService } from './role.service.js';

const parseId = (value: string | undefined) => {
  const id = Number(value);
  return Number.isFinite(id) ? id : undefined;
};

export class RoleController {
  constructor(private readonly roleService = new RoleService()) {}

  public list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await this.roleService.findAll();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid role id' });
        return;
      }

      const role = await this.roleService.findById(id);
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
        return;
      }

      res.json(role);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as { name?: string };

      if (!name) {
        res.status(400).json({ message: 'Role name is required' });
        return;
      }

      const role = await this.roleService.create({ name });
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid role id' });
        return;
      }

      const { name } = req.body as { name?: string };

      if (!name) {
        res.status(400).json({ message: 'Role name is required' });
        return;
      }

      const updated = await this.roleService.update(id, { name });
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id);
      if (id === undefined) {
        res.status(400).json({ message: 'Invalid role id' });
        return;
      }

      await this.roleService.remove(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
