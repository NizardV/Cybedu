import type { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../../database/data-source.js';
import { User } from './user.entity.js';
import { env } from '../../config/env.js';

type CreateUserInput = {
  email: string;
  password: string;
};

type UpdateUserInput = Partial<CreateUserInput>;

export class UserService {
  private get repository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }

  private readonly saltRounds = env.auth.bcryptSaltRounds;

  private hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  public findAll() {
    return this.repository.find();
  }

  public findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  public findByEmail(email: string) {
    return this.repository.findOne({
      where: { email }
    });
  }

  public async create(payload: CreateUserInput) {
    const hashedPassword = await this.hashPassword(payload.password);
    const user = this.repository.create({ ...payload, password: hashedPassword });
    return this.repository.save(user);
  }

  public async update(id: number, payload: UpdateUserInput) {
    const user = await this.repository.findOneByOrFail({ id });
    if (payload.email !== undefined) {
      user.email = payload.email;
    }
    if (payload.password !== undefined) {
      user.password = await this.hashPassword(payload.password);
    }
    return this.repository.save(user);
  }

  public async remove(id: number) {
    const user = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(user);
  }
}
