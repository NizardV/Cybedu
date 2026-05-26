import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "../users/user.entity.js";
import { Quiz } from "../quiz/quiz.entity.js";
import { UserAnswer } from "../user_answers/userAnswser.entity.js";

@Entity()
export class UserQuiz {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.userQuizzes, {
    onDelete: "CASCADE",
  })
  user?: Relation<User>;

  @ManyToOne(() => Quiz, (quiz) => quiz.userQuizzes, {
    onDelete: "CASCADE",
  })
  quiz?: Relation<Quiz>;

  @Column({ type: "float", nullable: true })
  score?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  completedAt?: Date;

  @OneToMany(() => UserAnswer, (ua) => ua.userQuiz, { cascade: true })
  userAnswers?: Relation<UserAnswer[]>;
}
