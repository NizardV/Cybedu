import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import type { Relation } from "typeorm";
import { Article } from "../articles/article.entity.js";
import { Question } from "../questions/question.entity.js";
import { UserQuiz } from "../user_quiz/userQuiz.entity.js";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @ManyToOne(() => Article, (article) => article.quizzes, {
    onDelete: "CASCADE",
  })
  article?: Relation<Article>;

  @OneToMany(() => Question, (q) => q.quiz, { cascade: true })
  questions?: Relation<Question[]>;

  @OneToMany(() => UserQuiz, (uq) => uq.quiz)
  userQuizzes?: Relation<UserQuiz[]>;
}
