import { AppDataSource } from '../../database/data-source.js';
import { Role } from './role.entity.js';
export class RoleService {
    get repository() {
        return AppDataSource.getRepository(Role);
    }
    findAll() {
        return this.repository.find();
    }
    findById(id) {
        return this.repository.findOneBy({ id });
    }
    findByName(name) {
        return this.repository.findOneBy({ name });
    }
    async create(payload) {
        const role = this.repository.create(payload);
        return this.repository.save(role);
    }
    async update(id, payload) {
        const role = await this.repository.findOneByOrFail({ id });
        if (payload.name) {
            role.name = payload.name;
        }
        return this.repository.save(role);
    }
    async remove(id) {
        const role = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(role);
    }
}
