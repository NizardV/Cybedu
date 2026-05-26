var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Role } from "../roles/role.entity.js";
import { UserQuiz } from "../user_quiz/userQuiz.entity.js";
import { UserAnswer } from "../user_answers/userAnswser.entity.js";
let User = class User {
    id;
    email;
    password;
    roles;
    userQuizzes;
    userAnswers;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    ManyToMany(() => Role, { eager: true }),
    JoinTable({
        name: "user_roles",
        joinColumn: { name: "user_id" },
        inverseJoinColumn: { name: "role_id" },
    }),
    __metadata("design:type", Object)
], User.prototype, "roles", void 0);
__decorate([
    OneToMany(() => UserQuiz, (uq) => uq.user),
    __metadata("design:type", Object)
], User.prototype, "userQuizzes", void 0);
__decorate([
    OneToMany(() => UserAnswer, (ua) => ua.user),
    __metadata("design:type", Object)
], User.prototype, "userAnswers", void 0);
User = __decorate([
    Entity()
], User);
export { User };
