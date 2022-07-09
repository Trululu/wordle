import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

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
}
