import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity.js';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @OneToMany(() => Quiz, (quiz) => quiz.article, { cascade: true })
  quizzes?: Relation<Quiz[]>;
}
