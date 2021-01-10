import { Entity, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';

@Entity()
export class User extends ManagedEntity {
  @Column({ length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  userName: string;
}
