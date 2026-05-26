import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import type { Relation } from "typeorm";
import { Quiz } from "../quiz/quiz.entity.js";
import { Answer } from "../answers/answer.entity.js";
import { UserAnswer } from "../user_answers/userAnswser.entity.js";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "text" })
  text?: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: "CASCADE",
  })
  quiz?: Relation<Quiz>;

  @OneToMany(() => Answer, (a) => a.question, { cascade: true })
  answers?: Relation<Answer[]>;

  @OneToMany(() => UserAnswer, (ua) => ua.question)
  userAnswers?: Relation<UserAnswer[]>;
}
