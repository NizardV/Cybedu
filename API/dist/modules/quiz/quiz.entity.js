var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, } from "typeorm";
import { Article } from "../articles/article.entity.js";
import { Question } from "../questions/question.entity.js";
import { UserQuiz } from "../user_quiz/userQuiz.entity.js";
let Quiz = class Quiz {
    id;
    title;
    article;
    questions;
    userQuizzes;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Quiz.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    ManyToOne(() => Article, (article) => article.quizzes, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], Quiz.prototype, "article", void 0);
__decorate([
    OneToMany(() => Question, (q) => q.quiz, { cascade: true }),
    __metadata("design:type", Object)
], Quiz.prototype, "questions", void 0);
__decorate([
    OneToMany(() => UserQuiz, (uq) => uq.quiz),
    __metadata("design:type", Object)
], Quiz.prototype, "userQuizzes", void 0);
Quiz = __decorate([
    Entity()
], Quiz);
export { Quiz };
