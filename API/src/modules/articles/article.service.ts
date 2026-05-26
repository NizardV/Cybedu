import type { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source.js";
import { Article } from "./article.entity.js";

export class ArticleService {
    private get repository(): Repository<Article> {
        return AppDataSource.getRepository(Article);
    }

    public findAll(){
        return this.repository.find()
    }

    public findById(id: number) {
        return this.repository.findOneBy({ id });
    }
    
    public async create(payload: Pick<Article, 'title' | 'content'>){
        const article = this.repository.create(payload);
        return this.repository.save(article);
    }

    public async update(id: number, payload: Partial<Pick<Article, 'title' | 'content'>>) {
        const article = await this.repository.findOneByOrFail({ id });
        if (payload.title !== undefined) {
            article.title = payload.title;
        }
        if (payload.content !== undefined) {
            article.content = payload.content;
        }
        return this.repository.save(article);
    }

    public async remove(id: number) {
        const article = await this.repository.findOneByOrFail({ id });
        return this.repository.remove(article);
    }
}
