import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import type { Relation } from "typeorm";
import { Role } from "../roles/role.entity.js";
import { UserQuiz } from "../user_quiz/userQuiz.entity.js";
import { UserAnswer } from "../user_answers/userAnswser.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email?: string;

  @Column({ type: 'varchar', length: 255 })
  password?: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: "user_roles",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "role_id" },
  })
  roles?: Relation<Role[]>;

  @OneToMany(() => UserQuiz, (uq) => uq.user)
  userQuizzes?: Relation<UserQuiz[]>;

  @OneToMany(() => UserAnswer, (ua) => ua.user)
  userAnswers?: Relation<UserAnswer[]>;
}
