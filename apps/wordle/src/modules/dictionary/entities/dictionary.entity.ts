import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Dictionary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  word: string;

  @Column({ nullable: false })
  source: string;

  @Column({ default: 'es' })
  lang: string;

  @OneToMany(() => Game, (game) => game.word)
  game: Game[];
}
