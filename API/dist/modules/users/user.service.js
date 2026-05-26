import bcrypt from 'bcrypt';
import { AppDataSource } from '../../database/data-source.js';
import { User } from './user.entity.js';
import { env } from '../../config/env.js';
export class UserService {
    get repository() {
        return AppDataSource.getRepository(User);
    }
    saltRounds = env.auth.bcryptSaltRounds;
    hashPassword(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    findAll() {
        return this.repository.find();
    }
    findById(id) {
        return this.repository.findOneBy({ id });
    }
    findByEmail(email) {
        return this.repository.findOne({
            where: { email }
        });
    }
    async create(payload) {
        const hashedPassword = await this.hashPassword(payload.password);
        const user = this.repository.create({ ...payload, password: hashedPassword });
        return this.repository.save(user);
    }
    async update(id, payload) {
        const user = await this.repository.findOneByOrFail({ id });
        if (payload.email !== undefined) {
            user.email = payload.email;
        }
        if (payload.password !== undefined) {
            user.password = await this.hashPassword(payload.password);
        }
        return this.repository.save(user);
    }
    async remove(id) {
        const user = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(user);
    }
}
