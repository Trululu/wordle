import { genSaltSync, hash } from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, genSaltSync());
  }
}
