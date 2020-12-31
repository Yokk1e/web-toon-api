import { Entity, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
}
@Entity()
export class User extends ManagedEntity {
  @Column({ length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  userName: string;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column({ type: 'tinyint', precision: 2 })
  age: number;
}
