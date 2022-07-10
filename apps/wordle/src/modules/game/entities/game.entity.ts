import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word_id: number;

  @ManyToOne(() => Dictionary, (word) => word.game)
  @JoinColumn({ name: 'word_id' })
  word: Dictionary;

  @Column({ nullable: false })
  user_id: number;

  @Column()
  attempts: number;

  @Column()
  win: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
