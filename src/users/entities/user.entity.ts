import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  @Transform(({ value }) => value.toNumber(), { toPlainOnly: true })
  id: number;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    default: null,
  })
  password: string;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'bigint',
    default: new Date().getTime(),
  })
  createdAt: number;

  @Column({
    name: 'updatedAt',
    type: 'bigint',
    nullable: true,
  })
  @Exclude()
  updatedAt?: number;

  @Column({
    name: 'deletedAt',
    type: 'bigint',
    nullable: true,
  })
  @Exclude()
  deletedAt?: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
