import type { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { Role } from './role.entity.js';

export type CreateRoleDto = {
  name: string;
};

export type UpdateRoleDto = Partial<CreateRoleDto>;

export class RoleService {
  private get repository(): Repository<Role> {
    return AppDataSource.getRepository(Role);
  }

  public findAll() {
    return this.repository.find();
  }

  public findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  public findByName(name: string) {
    return this.repository.findOneBy({ name });
  }

  public async create(payload: CreateRoleDto) {
    const role = this.repository.create(payload);
    return this.repository.save(role);
  }

  public async update(id: number, payload: UpdateRoleDto) {
    const role = await this.repository.findOneByOrFail({ id });

    if (payload.name) {
      role.name = payload.name;
    }

    return this.repository.save(role);
  }

  public async remove(id: number) {
    const role = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(role);
  }
}
