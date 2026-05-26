var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity.js";
import { UserQuiz } from "../user_quiz/userQuiz.entity.js";
import { Question } from "../questions/question.entity.js";
import { Answer } from "../answers/answer.entity.js";
let UserAnswer = class UserAnswer {
    id;
    user;
    userQuiz;
    question;
    answer;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserAnswer.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (u) => u.userAnswers, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], UserAnswer.prototype, "user", void 0);
__decorate([
    ManyToOne(() => UserQuiz, (uq) => uq.userAnswers, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], UserAnswer.prototype, "userQuiz", void 0);
__decorate([
    ManyToOne(() => Question, (q) => q.userAnswers, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], UserAnswer.prototype, "question", void 0);
__decorate([
    ManyToOne(() => Answer, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], UserAnswer.prototype, "answer", void 0);
UserAnswer = __decorate([
    Entity()
], UserAnswer);
export { UserAnswer };
