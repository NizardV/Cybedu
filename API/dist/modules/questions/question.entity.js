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
import { Quiz } from "../quiz/quiz.entity.js";
import { Answer } from "../answers/answer.entity.js";
import { UserAnswer } from "../user_answers/userAnswser.entity.js";
let Question = class Question {
    id;
    text;
    quiz;
    answers;
    userAnswers;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    ManyToOne(() => Quiz, (quiz) => quiz.questions, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], Question.prototype, "quiz", void 0);
__decorate([
    OneToMany(() => Answer, (a) => a.question, { cascade: true }),
    __metadata("design:type", Object)
], Question.prototype, "answers", void 0);
__decorate([
    OneToMany(() => UserAnswer, (ua) => ua.question),
    __metadata("design:type", Object)
], Question.prototype, "userAnswers", void 0);
Question = __decorate([
    Entity()
], Question);
export { Question };
