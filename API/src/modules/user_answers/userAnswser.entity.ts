import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";
import { User } from "../users/user.entity.js";
import { UserQuiz } from "../user_quiz/userQuiz.entity.js";
import { Question } from "../questions/question.entity.js";
import { Answer } from "../answers/answer.entity.js";

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (u) => u.userAnswers, {
    onDelete: "CASCADE",
  })
  user?: Relation<User>;

  @ManyToOne(() => UserQuiz, (uq) => uq.userAnswers, {
    onDelete: "CASCADE",
  })
  userQuiz?: Relation<UserQuiz>;

  @ManyToOne(() => Question, (q) => q.userAnswers, {
    onDelete: "CASCADE",
  })
  question?: Relation<Question>;

  @ManyToOne(() => Answer, {
    onDelete: "CASCADE",
  })
  answer?: Relation<Answer>;
}
