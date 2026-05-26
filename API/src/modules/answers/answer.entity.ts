import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { Question } from '../questions/question.entity.js';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  text?: string;

  @Column({ type: 'boolean', default: false })
  isCorrect?: boolean;

  @ManyToOne(() => Question, (q) => q.answers, {
    onDelete: 'CASCADE'
  })
  question?: Relation<Question>;
}
