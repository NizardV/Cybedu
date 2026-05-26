import { AppDataSource } from "../../database/data-source.js";
import { Article } from "./article.entity.js";
export class ArticleService {
    get repository() {
        return AppDataSource.getRepository(Article);
    }
    findAll() {
        return this.repository.find();
    }
    findById(id) {
        return this.repository.findOneBy({ id });
    }
    async create(payload) {
        const article = this.repository.create(payload);
        return this.repository.save(article);
    }
    async update(id, payload) {
        const article = await this.repository.findOneByOrFail({ id });
        if (payload.title !== undefined) {
            article.title = payload.title;
        }
        if (payload.content !== undefined) {
            article.content = payload.content;
        }
        return this.repository.save(article);
    }
    async remove(id) {
        const article = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(article);
    }
}
